import { useState, useEffect } from "react";
import { searchPlaceByQuery } from "../services/openCageService";
import type { OpenCageQueryResponse } from "../types/OpenCageQueryResponse";
import { useTranslations } from "./useTranslations";
import { DEFAULT_DEPARTAMENT } from "@/config";
import { usePersistedLocation } from "./usePersistedLocation";

type LocationDataHook = {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  confidence: number;
  boundingbox: [string, string, string, string];
};

interface StructuredAddressParams {
  city: string;
  typeWay: string;
  town: string;
  number1: string;
  block1?: string;
  block2?: string;
}

function buildOcQueryStructured({
  typeWay,
  town,
  number1,
  block1,
  block2,
  city,
}: StructuredAddressParams): string {
  const parts: string[] = [];

  parts.push(`${typeWay}`);
  parts.push(` ${number1}`);
  if (block1) parts.push(` # ${block1}`);
  if (block2) parts.push(`-${block2}`);
  parts.push(` ${town}`);
  parts.push(` ${city}`);
  parts.push(` ${DEFAULT_DEPARTAMENT}`);

  return parts.filter(Boolean).join("");
}

function extractFirstResult(apiResponse: OpenCageQueryResponse): LocationDataHook {
  const results = apiResponse.results;
  if (!results || results.length === 0) {
    throw new Error("No hay resultados disponibles");
  }
  const firstResult = results[0];
  const name = firstResult.formatted;

  const boundingbox: [string, string, string, string] = [
    firstResult.bounds?.southwest.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.northeast.lat.toString() || firstResult.geometry.lat.toString(),
    firstResult.bounds?.southwest.lng.toString() || firstResult.geometry.lng.toString(),
    firstResult.bounds?.northeast.lng.toString() || firstResult.geometry.lng.toString(),
  ];

  const city =
    firstResult.components.city ||
    firstResult.components.town ||
    firstResult.components.village ||
    firstResult.components.county ||
    "";

  const confidence = firstResult.confidence;

  return {
    name,
    latitude: firstResult.geometry.lat,
    longitude: firstResult.geometry.lng,
    city,
    boundingbox,
    confidence,
  };
}

export function useSearchLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Partial<LocationDataHook> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const t = useTranslations();
  
  const { persistLocation, deleteLocation, persistedLocation } = usePersistedLocation();

  useEffect(() => {
    if (persistedLocation && !data?.name) {
      setData(prev => ({
        ...prev,
        name: persistedLocation.name,
        confidence: persistedLocation.confidence
      }));
    }
  }, [persistedLocation, data?.name]);

  const fetchLocationStructured = async (params: StructuredAddressParams) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      const formattedQuery = buildOcQueryStructured(params);

      const response = await searchPlaceByQuery(formattedQuery);
      if (!response.results || response.results.length === 0) {
        throw new Error(t.form.location.notFound);
      }

      const extractedData = extractFirstResult(response);
      setData(extractedData);
      
      if (extractedData.name) {
        persistLocation(extractedData.name, extractedData.confidence);
      }
      
    } catch (e: any) {
      console.error("Error during fetching location: ", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePersistedLocation = () => {
    deleteLocation();
  };

  return {
    data,
    isLoading,
    error,
    fetchLocationStructured,
    persistedLocation,
    deletePersistedLocation,
  };
}
