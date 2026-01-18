import { LATITUDE, LONGITUDE } from "@/config";
import type { OpenCageQueryResponse, OpenCageResult } from "../types/OpenCageQueryResponse";
import { normalizeCity } from "../utils/normalizeAddress";

export interface StructuredAddressParams {
  road: string;
  city: string;
  state?: string;
  postcode?: string;
  neighbourhood?: string;
  landmark?: string;
}

/**
 * Searches for a place using OpenCage structured geocoding
 * Returns multiple results for better accuracy
 */
export async function searchPlaceByStructuredQuery(
  params: StructuredAddressParams,
  language: string = 'es'
): Promise<OpenCageQueryResponse> {
  const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  // Build simpler query for landmarks/notable locations
  const queryParts: string[] = [];
  
  if (params.landmark) queryParts.push(params.landmark);
  if (params.neighbourhood) queryParts.push(params.neighbourhood);
  if (params.road) queryParts.push(params.road);
  if (params.city) queryParts.push(normalizeCity(params.city));
  if (params.state) queryParts.push(params.state);
  if (params.postcode) queryParts.push(params.postcode);
  queryParts.push('Colombia');

  const query = queryParts.join(', ');
  console.log('OpenCage query:', query, 'language:', language);

  const searchParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    language: language,
    countrycode: 'CO',
    limit: '10',
    no_annotations: '0',
    // Don't use bounds for landmarks - they might be outside expected coordinates
  });

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?${searchParams.toString()}`
    );
    
    if (!res.ok) {
      throw new Error(`OpenCage API error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('OpenCage response:', data);
    return data;
  } catch (e: any) {
    console.error('Error searching on geocode by query: ', e);
    throw new Error('Error finding site');
  }
}

/**
 * Validates and filters OpenCage results based on quality criteria
 */
export function validateAndFilterResults(
  results: OpenCageResult[],
  expectedCity?: string,
  minConfidence: number = 6
): OpenCageResult[] {
  if (!results || results.length === 0) {
    return [];
  }

  const filtered = results.filter((result) => {
    // Very lenient confidence check - accept almost anything
    if (minConfidence > 1 && result.confidence < minConfidence) {
      console.log('Rejected (low confidence):', result.formatted, 'confidence:', result.confidence);
      return false;
    }

    // Verify it's in Colombia
    if (result.components.country_code !== 'co') {
      console.log('Rejected (not Colombia):', result.formatted);
      return false;
    }

    // Loosely verify city if provided (landmarks might be in different municipalities)
    if (expectedCity) {
      const resultCity = (
        result.components.city ||
        result.components.town ||
        result.components.municipality ||
        result.components.county ||
        result.components.state ||
        ''
      ).toLowerCase();
      
      const normalizedExpected = expectedCity.toLowerCase().replace(/[áä]/g, 'a').replace(/[éë]/g, 'e').replace(/[íï]/g, 'i').replace(/[óö]/g, 'o').replace(/[úü]/g, 'u');
      const normalizedResult = resultCity.replace(/[áä]/g, 'a').replace(/[éë]/g, 'e').replace(/[íï]/g, 'i').replace(/[óö]/g, 'o').replace(/[úü]/g, 'u');
      
      // Accept if city name is anywhere in the result OR if we're in Antioquia (for Valle de Aburrá)
      const cityMatches = normalizedResult.includes(normalizedExpected) || result.components.state?.toLowerCase().includes('antioquia');
      
      if (!cityMatches) {
        console.log('Rejected (city mismatch):', result.formatted, 'expected:', expectedCity, 'got:', resultCity);
        return false;
      }
    }

    console.log('Accepted:', result.formatted, 'confidence:', result.confidence);
    return true;
  });

  // Sort by confidence (highest first)
  return filtered.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Legacy function for backward compatibility - converts to structured query
 * @deprecated Use searchPlaceByStructuredQuery instead
 */
export async function searchPlaceByQuery(query: string): Promise<OpenCageQueryResponse> {
  const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  const params = new URLSearchParams({
    q: query,
    key: API_KEY,
    language: 'es',
    countrycode: 'CO',
    limit: '10',
    no_annotations: '0',
    bounds: `${LONGITUDE.min},${LATITUDE.min},${LONGITUDE.max},${LATITUDE.max}`,
  });

  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?${params.toString()}`
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    console.error('Error searching on geocode by query: ', e);
    throw new Error('Error finding site');
  }
}
