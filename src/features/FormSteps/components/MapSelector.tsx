import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import L, { type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solucionar iconos rotos en React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const customIcon = L.divIcon({
  html: `
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 1200 1200"
      style="filter: drop-shadow(0px 2px 3px rgba(255,255,255,0.6));"
    >
      <path 
        fill="#3388ff" 
        d="M600 0C350.178 0 147.656 202.521 147.656 452.344c0 83.547 16.353 169.837 63.281 232.031L600 1200l389.062-515.625c42.625-56.49 63.281-156.356 63.281-232.031C1052.344 202.521 849.822 0 600 0m0 261.987c105.116 0 190.356 85.241 190.356 190.356C790.356 557.46 705.116 642.7 600 642.7s-190.356-85.24-190.356-190.356S494.884 261.987 600 261.987"
      />
    </svg>
  `,
  className: 'simple-svg-marker',
  iconSize: [32, 32],
  iconAnchor: [36, 32],
  popupAnchor: [0, -32]
});
// =========== TIPOS ===========
export type Position = [number, number]; // [lat, lng]
export type BoundingBox = [Position, Position]; // [[sw_lat, sw_lng], [ne_lat, ne_lng]]

export interface MapSelectorProps {
  /** Bounding box inicial para resaltar un área */
  initialBbox?: BoundingBox | null;
  
  /** Posición inicial del PIN */
  initialPin?: Position | null;
  
  /** Callback cuando el PIN cambia de posición */
  onPinChange?: (position: Position) => void;
  
  /** Callback cuando el bounding box cambia */
  onBboxChange?: (bbox: BoundingBox | null) => void;
  
  /** Estilos CSS para el contenedor del mapa */
  mapStyle?: React.CSSProperties;
  
  /** Nivel de zoom inicial (2 = vista mundo) */
  zoom?: number;
  
  /** Centro inicial del mapa */
  center?: Position;
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Si es true, permite arrastrar el marcador */
  draggable?: boolean;
  
  /** Si es true, permite hacer clic en el mapa para colocar PIN */
  clickToPlace?: boolean;
}

interface MapClickHandlerProps {
  onPinPlaced: (position: Position) => void;
  enabled: boolean;
}

interface BoundsSetterProps {
  bounds: LatLngBoundsExpression;
}

// =========== COMPONENTES INTERNOS ===========

/**
 * Maneja los clics en el mapa para colocar un PIN
 */
const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onPinPlaced, enabled }) => {
  useMapEvents({
    click: (e) => {
      if (enabled) {
        onPinPlaced([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

/**
 * Ajusta la vista del mapa al bounding box proporcionado
 */
const BoundsSetter: React.FC<BoundsSetterProps> = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  
  return null;
};

// =========== COMPONENTE PRINCIPAL ===========

/**
 * Componente selector de mapa con bounding box y PIN arrastrable
 */
export const MapSelector: React.FC<MapSelectorProps> = ({
  initialBbox = null,
  initialPin = null,
  onPinChange = () => {},
  mapStyle = { height: '500px', width: '100%', borderRadius: '10px' },
  zoom = 2,
  center = [20, 0],
  className = '',
  draggable = true,
  clickToPlace = true,
}) => {
  // Estados internos
  const [pinPosition, setPinPosition] = useState<Position>(
    initialPin || [40.7128, -74.0060] // NYC por defecto
  );
  const [bbox, setBbox] = useState<BoundingBox | null>(initialBbox);

  // Sincronizar con props iniciales
  useEffect(() => {
    if (initialPin) {
      setPinPosition(initialPin);
    }
  }, [initialPin]);

  useEffect(() => {
    setBbox(initialBbox);
  }, [initialBbox]);

  /**
   * Maneja la colocación de un nuevo PIN
   */
  const handlePinPlaced = useCallback((position: Position) => {
    setPinPosition(position);
    onPinChange(position);
  }, [onPinChange]);

  /**
   * Maneja el arrastre del marcador
   */
  const handleMarkerDragEnd = useCallback((event: L.DragEndEvent) => {
    const marker = event.target;
    const position = marker.getLatLng();
    const newPosition: Position = [position.lat, position.lng];
    
    setPinPosition(newPosition);
    onPinChange(newPosition);
  }, [onPinChange]);

  /**
   * Obtiene el color del bounding box basado en su tamaño
   */
  const getBboxColor = useCallback((): string => {
    if (!bbox) return '#3388ff';
    
    const [sw, ne] = bbox;
    const area = Math.abs((ne[0] - sw[0]) * (ne[1] - sw[1]));
    
    if (area > 100) return '#ff4444'; // Grande: rojo
    if (area > 10) return '#ffaa00';  // Mediano: naranja
    return '#00aa44';                 // Pequeño: verde
  }, [bbox]);

 
  return (
    <div className={`map-selector-container ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={mapStyle}
        scrollWheelZoom={true}
        className="map-selector"
        worldCopyJump={true} // Permite scroll horizontal infinito
      >
        {/* Capa base del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Bounding box si existe */}
        {bbox && (
          <Rectangle
            bounds={bbox}
            pathOptions={{
              color: getBboxColor(),
              weight: 3,
              fillOpacity: 0.15,
              dashArray: '5, 5',
              className: 'bbox-rectangle'
            }}
            eventHandlers={{
              click: () => {
                console.log('Bounding box clickeado:', bbox);
              }
            }}
          />
        )}
        
        {/* Marcador arrastrable */}
        <Marker
          position={pinPosition}
          draggable={draggable}
          icon={customIcon}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
        >
          <Popup>
            <div className="flex flex-col gap-1">
              <div className="rounded-full font-bold py-1 px-2 bg-black text-white">Lat: <code>{pinPosition[0].toFixed(6)}</code></div>
              <div  className="rounded-full font-bold py-1 px-2 bg-black text-white">Lng: <code>{pinPosition[1].toFixed(6)}</code></div>
            </div>
          </Popup>
        </Marker>
        
        {/* Componentes auxiliares */}
        <MapClickHandler onPinPlaced={handlePinPlaced} enabled={clickToPlace} />
        {bbox && <BoundsSetter bounds={bbox} />}
      </MapContainer>
      
          </div>
  );
};

