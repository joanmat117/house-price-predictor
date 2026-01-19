import React, { useState, useCallback, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useScrollOnMount } from '@/shared/hooks/useScrollOnMount'

export type Position = [number, number]
export type BoundingBox = [Position, Position]

export interface MapSelectorProps {
  initialBbox?: BoundingBox | null
  initialPin: Position
  onPinChange?: (position: Position) => void
  mapStyle?: React.CSSProperties
  zoom?: number
  center?: Position
  className?: string
}

const MapCenterTracker: React.FC<{
  onCenterChange: (position: Position) => void
  bounds?: BoundingBox | null
  lastUserPosition: React.MutableRefObject<{ center: Position; zoom: number }>
}> = ({ onCenterChange, bounds, lastUserPosition }) => {
  const map = useMap()
  const isDraggingRef = useRef(false)

  const updateCenterPosition = useCallback(() => {
    const center = map.getCenter()
    const lat = center.lat
    const lng = center.lng
    const zoom = map.getZoom()
    const newPos: Position = [lat, lng]

    lastUserPosition.current = { center: newPos, zoom }

    if (bounds) {
      const [[swLat, swLng], [neLat, neLng]] = bounds
      if (lat < swLat || lat > neLat || lng < swLng || lng > neLng) {
        return
      }
    }

    onCenterChange(newPos)
  }, [map, bounds, lastUserPosition, onCenterChange])

  useMapEvents({
    dragstart: () => {
      isDraggingRef.current = true
    },
    dragend: () => {
      updateCenterPosition()
      isDraggingRef.current = false
    },
    zoomend: () => {
      if (!isDraggingRef.current) {
        updateCenterPosition()
      }
    },
    click: (e) => {
      const { lat, lng } = e.latlng
      const currentZoom = map.getZoom()

      if (bounds) {
        const [[swLat, swLng], [neLat, neLng]] = bounds
        if (lat < swLat || lat > neLat || lng < swLng || lng > neLng) {
          return
        }
      }

      map.flyTo([lat, lng], currentZoom, {
        animate: true,
        duration: 0.5
      })

      lastUserPosition.current = { center: [lat, lng], zoom: currentZoom }
      onCenterChange([lat, lng])
    }
  })

  return null
}

const MapInitializer: React.FC<{
  center: Position
  zoom: number
  lastUserPosition: React.MutableRefObject<{ center: Position; zoom: number }>
}> = ({ center, zoom, lastUserPosition }) => {
  const map = useMap()
  const isFirstRender = React.useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      map.setView(center, zoom, { animate: false })
      lastUserPosition.current = { center, zoom }
      isFirstRender.current = false
      return
    }

    const [lastLat, lastLng] = lastUserPosition.current.center
    const threshold = 0.0001
    const isSignificantChange =
      Math.abs(center[0] - lastLat) > threshold ||
      Math.abs(center[1] - lastLng) > threshold

    if (isSignificantChange) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
        duration: 0.8
      })
      lastUserPosition.current = { center, zoom: map.getZoom() }
    }
  }, [center[0], center[1], map, lastUserPosition])

  return null
}

export const MapSelector: React.FC<MapSelectorProps> = ({
  initialBbox = null,
  initialPin,
  onPinChange = () => {},
  mapStyle = { height: '200px', width: '100%', borderRadius: '100px' },
  zoom = 2,
  center = [20, 0],
  className = ''
}) => {
  const [bbox, setBbox] = useState<BoundingBox | null>(initialBbox)
  const lastUserPosition = useRef<{ center: Position; zoom: number }>({
    center: initialPin,
    zoom
  })

  const scrollRef = useScrollOnMount()

  useEffect(() => {
    setBbox(initialBbox)
  }, [initialBbox])

  const handleCenterChange = useCallback((position: Position) => {
    onPinChange(position)
  }, [onPinChange])

  const getBboxColor = useCallback((): string => {
    if (!bbox) return '#3388ff'

    const [sw, ne] = bbox
    const area = Math.abs((ne[0] - sw[0]) * (ne[1] - sw[1]))

    if (area > 100) return '#ff4444'
    if (area > 10) return '#ffaa00'
    return '#00aa44'
  }, [bbox])

  return (
    <div ref={scrollRef} className={`map-selector-container relative ${className}`}>
      <div
        className="absolute left-1/2 top-1/2 z-[1000] pointer-events-none"
        style={{ transform: 'translate(-50%, -100%)' }}
      >
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z"
            fill="#3b82f6"
          />
          <circle cx="16" cy="16" r="6" fill="white" />
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
  )
}
