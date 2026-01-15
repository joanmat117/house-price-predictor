import { useState } from "react";
import { searchPlaceByQuery } from "../services/openCageService";
import type { OpenCageQueryResponse } from "../types/OpenCageQueryResponse";
import { useTranslations } from "./useTranslations";

type LocationDataHook = {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  boundingbox: [string, string, string, string];
};

export interface LocationQueryParams {
  address?: string;      
  city?: string;        
  department?: string;   
  postalCode?: string;
  rawQuery?: string;
}

function buildFormattedQuery(params: LocationQueryParams): string {
  if (params.rawQuery) return params.rawQuery;
  
  const parts: string[] = [];
  
  if (params.address) parts.push(params.address);
  
  if (params.city) parts.push(params.city);
  
  if (params.department && params.department !== params.city) {
    parts.push(params.department);
  }
  
  if (params.postalCode) parts.push(params.postalCode);
  
  return parts.join(", ");
}

const getLocationDataStored = (): LocationDataHook | undefined => {
  const stored = localStorage.getItem('LOCATION_DATA');
  return stored ? JSON.parse(stored) : undefined;
}

function extractFirstResult(apiResponse: OpenCageQueryResponse): LocationDataHook {
  const results = apiResponse.results;
  
  if (!results || results.length === 0) {
    throw new Error('No hay resultados disponibles');
  }
  
  const firstResult = results[0];
  const name = firstResult.formatted;
  
  // El formato es: [south, north, west, east]
  const boundingbox: [string, string, string, string] = [
    firstResult.bounds?.southwest.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.northeast.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.southwest.lng.toString() || firstResult.geometry.lng.toString(),
    firstResult.bounds?.northeast.lng.toString() || firstResult.geometry.lng.toString()
  ];
  
  const city = firstResult.components.city || 
               firstResult.components.town || 
               firstResult.components.village || 
               firstResult.components.municipality ||  
               firstResult.components.county || 
               '';
  
  return {
    name,
    latitude: firstResult.geometry.lat,
    longitude: firstResult.geometry.lng,
    city,
    boundingbox
  };
}

interface Props {}

export function useSearchLocation({}: Props = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LocationDataHook | undefined>(getLocationDataStored());
  const [error, setError] = useState<string | undefined>(undefined);
  const t = useTranslations();

  const fetchLocation = async (query: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      const response = await searchPlaceByQuery(query.trim());
      if (!response.results || response.results.length === 0) {
        throw new Error(t.form.location.notFound);
      }

      const extractedData = extractFirstResult(response);
      setData(extractedData);
      
    } catch (e: any) {
      console.error('Error during fetching location: ', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocationStructured = async (params: LocationQueryParams) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      const formattedQuery = buildFormattedQuery(params);
      
      const response = await searchPlaceByQuery(formattedQuery);
      
      if (!response.results || response.results.length === 0) {
        throw new Error(t.form.location.notFound);
      }

      const extractedData = extractFirstResult(response);
      setData(extractedData);
      
    } catch (e: any) {
      console.error('Error during fetching location: ', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchLocation,           
    fetchLocationStructured  
  };
}
