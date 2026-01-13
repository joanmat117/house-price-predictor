import type { OpenCageQueryResponse } from "../types/OpenCageQueryResponse";

export async function searchPlaceByQuery(query: string): Promise<OpenCageQueryResponse> {
  const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
  
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${API_KEY}&language=es`
    );
    const data = await res.json()

    return data;
  } catch(e: any) {
    console.log('Error searching on geocode by query: ', e);
    throw new Error('Error finding site');
  }
}
