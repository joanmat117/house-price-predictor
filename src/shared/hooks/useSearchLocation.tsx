import { useState, useEffect } from "react";
import { getGeocodingService } from "../services/geocoding";
import type { GeocodingResult } from "../services/geocoding/types";
import { useTranslations } from "./useTranslations";
import { useLanguage } from "./useLanguage";
import { DEFAULT_DEPARTAMENT } from "@/config";
import { usePersistedLocation } from "./usePersistedLocation";

type LocationDataHook = GeocodingResult;

export function useSearchLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Partial<LocationDataHook> | undefined>(undefined);
  const [alternativeResults, setAlternativeResults] = useState<LocationDataHook[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const t = useTranslations();
  const { language } = useLanguage();
  
  const { persistLocation, deleteLocation, persistedLocation } = usePersistedLocation();

  useEffect(() => {
    if (persistedLocation && !data?.name) {
      setData(prev => ({
        ...prev,
        name: persistedLocation.name,
      }));
    }
  }, [persistedLocation, data?.name]);

  const searchNotableLocation = async (city: string, notableLocation: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);
      setAlternativeResults([]);

      const geocodingService = getGeocodingService();
      
      const response = await geocodingService.searchLocation({
        city,
        query: notableLocation,
        state: DEFAULT_DEPARTAMENT,
        language,
      });
      
      if (!response.results || response.results.length === 0) {
        throw new Error(t.form.location.notFound);
      }

      // Set the first result as primary
      setData(response.results[0]);
      
      // Set all other results as alternatives
      if (response.results.length > 1) {
        setAlternativeResults(response.results.slice(1, 15)); // Up to 14 alternatives
      }
      
      if (response.results[0].name) {
        persistLocation(response.results[0].name, 10); // Default confidence for persistence
      }
      
    } catch (e: any) {
      console.error("Error during fetching notable location: ", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAlternativeResult = (index: number) => {
    if (alternativeResults[index]) {
      const selected = alternativeResults[index];
      setData(selected);
      
      // Remove selected from alternatives and add current data to alternatives
      const newAlternatives = [...alternativeResults];
      newAlternatives.splice(index, 1);
      if (data?.name) {
        newAlternatives.push(data as LocationDataHook);
      }
      setAlternativeResults(newAlternatives);
      
      if (selected.name) {
        persistLocation(selected.name, 10);
      }
    }
  };

  const deletePersistedLocation = () => {
    deleteLocation();
  };

  const clearSearch = () => {
    setData(undefined);
    setAlternativeResults([]);
    setError(undefined);
  };

  return {
    data,
    alternativeResults,
    isLoading,
    error,
    searchNotableLocation,
    selectAlternativeResult,
    persistedLocation,
    deletePersistedLocation,
    clearSearch,
  };
}
