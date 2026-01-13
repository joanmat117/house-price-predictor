import { useState } from "react";
import { searchPlaceByQuery } from "../services/openCageService";
import type { OpenCageQueryResponse} from "../types/OpenCageQueryResponse";

type LocationDataHook = {
  name: string;
  latitude: number;
  longitude: number;
  boundingbox: [string, string, string, string];
};

function extractFirstResult(apiResponse: OpenCageQueryResponse): LocationDataHook {
  const results = apiResponse.results;
  
  if (!results || results.length === 0) {
    throw new Error('No hay resultados disponibles');
  }
  
  const firstResult = results[0];
  
  const name = firstResult.formatted;
  
  // El formato es: [south, north, west, east] - igual que Nominatim
  const boundingbox: [string, string, string, string] = [
    firstResult.bounds?.southwest.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.northeast.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.southwest.lng.toString() || firstResult.geometry.lng.toString(),
    firstResult.bounds?.northeast.lng.toString() || firstResult.geometry.lng.toString()
  ];
  
  return {
    name,
    latitude: firstResult.geometry.lat,
    longitude: firstResult.geometry.lng,
    boundingbox
  };
}

export function useSearchLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LocationDataHook | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchLocation = async (query: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      const response = await searchPlaceByQuery(query.trim());
      
      if (!response.results || response.results.length === 0) {
        throw new Error('Location not found');
      }

      const extractedData = extractFirstResult(response);
      setData(extractedData);
      
    } catch (e: any) {
      console.log('Error during fetching location: ', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchLocation
  };
}
