import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// =========== TIPOS ===========
export type Position = [number, number]; // [lat, lng]
export type BoundingBox = [Position, Position]; // [[sw_lat, sw_lng], [ne_lat, ne_lng]]

export interface MapSelectorProps {
  /** Bounding box inicial para resaltar un área */
  initialBbox?: BoundingBox | null;
  
  /** Posición inicial del centro */
  initialPin: Position;
  
  /** Callback cuando el centro del mapa cambia */
  onPinChange?: (position: Position) => void;
  
  /** Estilos CSS para el contenedor del mapa */
  mapStyle?: React.CSSProperties;
  
  /** Nivel de zoom inicial */
  zoom?: number;
  
  /** Centro inicial del mapa */
  center?: Position;
  
  /** Clases CSS adicionales */
  className?: string;
}

// =========== COMPONENTES INTERNOS ===========

/**
 * Tracks map center and fires callback on move end, handles click to center
 */
const MapCenterTracker: React.FC<{ onCenterChange: (position: Position) => void; bounds?: BoundingBox | null }> = ({ onCenterChange, bounds }) => {
  const map = useMap();
  
  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;
      
      // Validate within bounds if provided
      if (bounds) {
        const [[swLat, swLng], [neLat, neLng]] = bounds;
        if (lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng) {
          onCenterChange([lat, lng]);
        }
      } else {
        onCenterChange([lat, lng]);
      }
    },
    click: (e) => {
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom(), {
        animate: true,
        duration: 0.5
      });
    },
  });
  
  return null;
};

/**
 * Sets initial map view
 */
const MapInitializer: React.FC<{ center: Position; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, { animate: false });
  }, []);
  
  return null;
};

// =========== COMPONENTE PRINCIPAL ===========

/**
 * Map selector with CSS-centered pin that tracks map center
 */
export const MapSelector: React.FC<MapSelectorProps> = ({
  initialBbox = null,
  initialPin,
  onPinChange = () => {},
  mapStyle = { height: '200px', width: '100%', borderRadius: '100px' },
  zoom = 2,
  center = [20, 0],
  className = '',
}) => {
  const [bbox, setBbox] = useState<BoundingBox | null>(initialBbox);

  useEffect(() => {
    setBbox(initialBbox);
  }, [initialBbox]);

  const handleCenterChange = useCallback((position: Position) => {
    onPinChange(position);
  }, [onPinChange]);

  const getBboxColor = useCallback((): string => {
    if (!bbox) return '#3388ff';
    
    const [sw, ne] = bbox;
    const area = Math.abs((ne[0] - sw[0]) * (ne[1] - sw[1]));
    
    if (area > 100) return '#ff4444';
    if (area > 10) return '#ffaa00';
    return '#00aa44';
  }, [bbox]);

  return (
    <div className={`map-selector-container relative ${className}`}>
      {/* CSS Centered Pin */}
      <div 
        className="absolute left-1/2 top-1/2 z-[1000] pointer-events-none"
        style={{ transform: 'translate(-50%, -100%)' }}
      >
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" 
            fill="#3b82f6"
          />
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      </div>
      
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          noWrap={true}
        />
        
        <MapInitializer center={initialPin} zoom={zoom} />
        <MapCenterTracker onCenterChange={handleCenterChange} bounds={bbox} />
        
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
          />
        )}
      </MapContainer>
    </div>
  );
};
