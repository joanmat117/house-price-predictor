import { LATITUDE, LONGITUDE } from "@/config";
import type { OpenCageQueryResponse } from "../types/OpenCageQueryResponse";

export async function searchPlaceByQuery(query: string): Promise<OpenCageQueryResponse> {
  const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  //Redundant
  const cleanedQuery = query.trim().replace(/,?\s*Colombia$/i, '');
  
  const params = new URLSearchParams({
    q: cleanedQuery,
    key: API_KEY,
    language: 'es',           
    countrycode: 'CO',        
    limit: '1',               
    no_annotations: '1',
    bounds: `${LONGITUDE.min},${LATITUDE.min},${LONGITUDE.max},${LATITUDE.max}`
  });
  // Format: bounds=lon_min,lat_min,lon_max,lat_max
  
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?${params.toString()}`
    );
    const data = await res.json();
    return data;
  } catch(e: any) {
    console.error('Error searching on geocode by query: ', e);
    throw new Error('Error finding site');
  }
}
