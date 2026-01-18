import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "LOCATION";

type PersistedLocation = {
  name: string;
  confidence: number;
};

export function usePersistedLocation() {
  const [persistedLocation, setPersistedLocation] = useState<PersistedLocation | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPersistedLocation(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading persisted location:", error);
      setPersistedLocation(null);
    }
  }, []);

  const persistLocation = useCallback((name: string, confidence: number) => {
    try {
      const locationData: PersistedLocation = { name, confidence };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locationData));
      setPersistedLocation(locationData);
    } catch (error) {
      console.error("Error persisting location:", error);
    }
  }, []);

  const deleteLocation = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPersistedLocation(null);
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  }, []);

  return {
    persistedLocation,
    persistLocation,
    deleteLocation,
  };
}
