import { useState } from "react";
import { searchPlaceByQuery } from "../services/openCageService";
import type { OpenCageQueryResponse } from "../types/OpenCageQueryResponse";
import { useTranslations } from "./useTranslations";
import { DEFAULT_DEPARTAMENT } from "@/config";

type LocationDataHook = {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  boundingbox: [string, string, string, string];
};

interface StructuredAddressParams {
  city: string;
  typeWay: string;
  street: string;
  number1: string;
  block1?: string;
  block2?: string;
}

function buildOcQueryStructured({
  typeWay,
  street,
  number1,
  block1,
  block2,
  city,
}: StructuredAddressParams): string {
  const parts: string[] = [];

  parts.push(typeWay);
  parts.push(street);
  parts.push(number1);

  if (block1) parts.push(`# ${block1}`);
  if (block2) parts.push(`- ${block2}`);

  parts.push(city);
  parts.push(DEFAULT_DEPARTAMENT); // siempre por defecto

  return parts.filter(Boolean).join(", ");
}

const getLocationDataStored = (): LocationDataHook | undefined => {
  const stored = localStorage.getItem("LOCATION_DATA");
  return stored ? JSON.parse(stored) : undefined;
};

const setLocationDataStored = (data:LocationDataHook)=>{
  localStorage.setItem('LOCATION_DATA',JSON.stringify(data))
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

  return {
    name,
    latitude: firstResult.geometry.lat,
    longitude: firstResult.geometry.lng,
    city,
    boundingbox,
  };
}

export function useSearchLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<LocationDataHook | undefined>(
    getLocationDataStored()
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const t = useTranslations();


  const removeLocationDataStored = ()=>{
  localStorage.removeItem('LOCATION_DATA')
    setData(undefined)
}

  const fetchLocationStructured = async (params: StructuredAddressParams) => {
    try {
      removeLocationDataStored()
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      const formattedQuery = buildOcQueryStructured(params);

      const response = await searchPlaceByQuery(formattedQuery);
      if (!response.results || response.results.length === 0) {
        throw new Error(t.form.location.notFound);
      }

      const extractedData = extractFirstResult(response);
      setData(()=>{
        setLocationDataStored(extractedData)
        return extractedData
      });
    } catch (e: any) {
      console.error("Error during fetching location: ", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchLocationStructured,
    removeLocationDataStored
  };
}

