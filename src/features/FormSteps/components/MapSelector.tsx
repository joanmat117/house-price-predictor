import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle, Marker, useMapEvents, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Solucionar iconos rotos en React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
// =========== TIPOS ===========
export type Position = [number, number]; // [lat, lng]
export type BoundingBox = [Position, Position]; // [[sw_lat, sw_lng], [ne_lat, ne_lng]]

export interface MapSelectorProps {
  /** Bounding box inicial para resaltar un área */
  initialBbox?: BoundingBox | null;
  
  /** Posición inicial del PIN */
  initialPin: Position ;
  
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
 * Component to recenter map when pin position changes
 */
const MapRecenter: React.FC<{ center: Position }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom(), {
      animate: true,
      duration: 0.8
    });
  }, [center[0], center[1], map]);
  
  return null;
};

// =========== COMPONENTE PRINCIPAL ===========

/**
 * Componente selector de mapa con bounding box y PIN arrastrable
 */
export const MapSelector: React.FC<MapSelectorProps> = ({
  initialBbox = null,
  initialPin,
  onPinChange = () => {},
  mapStyle = { height: '200px', width: '100%', borderRadius: '100px' },
  zoom = 2,
  center = [20, 0],
  className = '',
  draggable = true,
  clickToPlace = true,
}) => {
  const [bbox, setBbox] = useState<BoundingBox | null>(initialBbox);


  useEffect(() => {
    setBbox(initialBbox);
  }, [initialBbox]);

  /**
   * Maneja la colocación de un nuevo PIN
   */
  const handlePinPlaced = useCallback((position: Position) => {
    onPinChange(position);
  }, [onPinChange]);

  /**
   * Maneja el arrastre del marcador
   */
  const handleMarkerDragEnd = useCallback((event: L.DragEndEvent) => {
    const marker = event.target;
    const position = marker.getLatLng();
    const newPosition: Position = [position.lat, position.lng];
    
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
        maxBounds={bbox || undefined}
        maxBoundsViscosity={1.0}
        minZoom={11}
      >
        {/* Capa base del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          noWrap={true}
        />
        
        {/* Recenter map when position changes */}
        <MapRecenter center={initialPin} />
        
        {/* Bounding box si existe */}
        {bbox && (
          <Rectangle
            bounds={bbox}
            pathOptions={{
              color: getBboxColor(),
              weight: 3,
              fillOpacity: 0,
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
          position={initialPin as Position}
          draggable={draggable}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
        >
          <Popup>
            <div className="flex flex-col gap-1">
              <div className="rounded-full font-bold py-1 px-2 bg-black text-white">Lat: <code>{initialPin[0].toFixed(6)}</code></div>
              <div  className="rounded-full font-bold py-1 px-2 bg-black text-white">Lng: <code>{initialPin[1].toFixed(6)}</code></div>
            </div>
          </Popup>
        </Marker>
        
        {/* Componentes auxiliares */}
        <MapClickHandler onPinPlaced={handlePinPlaced} enabled={clickToPlace} />
        </MapContainer>
      
          </div>
  );
};

