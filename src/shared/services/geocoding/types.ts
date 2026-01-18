/**
 * API-agnostic geocoding types
 */

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  boundingbox: [string, string, string, string];
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  provider?: string;
}

export interface GeocodingService {
  searchLocation(params: {
    city: string;
    query: string;
    state?: string;
    language?: string;
  }): Promise<GeocodingResponse>;
}
