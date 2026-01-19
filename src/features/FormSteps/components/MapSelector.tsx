import React, { useState, useCallback, useEffect, useRef } from 'react';
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
 * Tracks user-initiated movements to prevent feedback loops
 */
const MapCenterTracker: React.FC<{ 
  onCenterChange: (position: Position) => void; 
  bounds?: BoundingBox | null;
  lastUserPosition: React.MutableRefObject<{ center: Position; zoom: number }>;
}> = ({ onCenterChange, bounds, lastUserPosition }) => {
  const map = useMap();
  const isDraggingRef = useRef(false);
  
  useMapEvents({
    dragstart: () => {
      isDraggingRef.current = true;
    },
    dragend: () => {
      // Only update on drag, not zoom
      const center = map.getCenter();
      const lat = center.lat;
      const lng = center.lng;
      const zoom = map.getZoom();
      
      lastUserPosition.current = { center: [lat, lng], zoom };
      
      // Validate within bounds if provided
      if (bounds) {
        const [[swLat, swLng], [neLat, neLng]] = bounds;
        if (lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng) {
          onCenterChange([lat, lng]);
        }
      } else {
        onCenterChange([lat, lng]);
      }
      
      isDraggingRef.current = false;
    },
    zoomend: () => {
      // Track zoom changes without triggering re-center
      if (!isDraggingRef.current) {
        const center = map.getCenter();
        lastUserPosition.current = { 
          center: [center.lat, center.lng], 
          zoom: map.getZoom() 
        };
      }
    },
  });
  
  return null;
};

/**
 * Sets initial map view and handles center updates from props
 * Only animates when center changes significantly from an external source (search)
 */
const MapInitializer: React.FC<{ 
  center: Position; 
  zoom: number;
  lastUserPosition: React.MutableRefObject<{ center: Position; zoom: number }>;
}> = ({ center, zoom, lastUserPosition }) => {
  const map = useMap();
  const isFirstRender = React.useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      // Initial render: set view without animation
      map.setView(center, zoom, { animate: false });
      lastUserPosition.current = { center, zoom };
      isFirstRender.current = false;
      return;
    }
    
    // Check if this is a significant change from last known position
    const [lastLat, lastLng] = lastUserPosition.current.center;
    const threshold = 0.0001; // ~11 meters
    const isSignificantChange = 
      Math.abs(center[0] - lastLat) > threshold || 
      Math.abs(center[1] - lastLng) > threshold;
    
    // Only fly to new center if it's a significant external change (e.g., from search)
    // Don't update zoom - let user control that
    if (isSignificantChange) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 0.8
      });
      lastUserPosition.current = { center, zoom: map.getZoom() };
    }
  }, [center[0], center[1], map, lastUserPosition]);
  
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
  // Shared ref to track the last position from user interaction (drag/zoom/click)
  const lastUserPosition = useRef<{ center: Position; zoom: number }>({
    center: initialPin,
    zoom
  });

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
        
        <MapInitializer center={initialPin} zoom={zoom} lastUserPosition={lastUserPosition} />
        <MapCenterTracker onCenterChange={handleCenterChange} bounds={bbox} lastUserPosition={lastUserPosition} />
        
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
