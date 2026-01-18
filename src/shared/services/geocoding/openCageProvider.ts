import type { GeocodingService, GeocodingResponse, GeocodingResult } from './types';
import type { OpenCageQueryResponse } from '@/shared/types/OpenCageQueryResponse';
import { LATITUDE, LONGITUDE } from '@/config';

/**
 * OpenCage implementation of geocoding service
 * Uses multiple query strategies to find the best match
 */
export class OpenCageGeocodingService implements GeocodingService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Check if coordinates are within expected bounds for the city
   */
  private isWithinBounds(lat: number, lng: number, city: string): boolean {
    // For Medellin and Valle de Aburrá region
    if (city.toLowerCase().includes('medellin')) {
      const inBounds = lat >= LATITUDE.min && 
                      lat <= LATITUDE.max && 
                      lng >= LONGITUDE.min && 
                      lng <= LONGITUDE.max;
      
      if (!inBounds) {
        console.log(`Rejected: Outside Medellin bounds - Lat: ${lat}, Lng: ${lng}`);
      }
      return inBounds;
    }
    
    // For other cities, accept any result in Colombia
    return true;
  }

  async searchLocation(params: {
    city: string;
    query: string;
    state?: string;
    language?: string;
  }): Promise<GeocodingResponse> {
    const { city, query, state = 'Antioquia', language = 'es' } = params;

    // Strategy 1: Try exact query with all details
    let response = await this.tryQuery(
      `${query}, ${city}, ${state}, Colombia`,
      language,
      city
    );

    if (response.results.length > 0) {
      console.log('Strategy 1 (full query) succeeded');
      return response;
    }

    // Strategy 2: Try without state
    response = await this.tryQuery(
      `${query}, ${city}, Colombia`,
      language,
      city
    );

    if (response.results.length > 0) {
      console.log('Strategy 2 (without state) succeeded');
      return response;
    }

    // Strategy 3: Try just query and country (but still filter by city)
    response = await this.tryQuery(
      `${query}, Colombia`,
      language,
      city
    );

    if (response.results.length > 0) {
      console.log('Strategy 3 (query + country) succeeded');
      return response;
    }

    // Strategy 4: Try query with city in a different order
    response = await this.tryQuery(
      `${city} ${query}`,
      language,
      city
    );

    if (response.results.length > 0) {
      console.log('Strategy 4 (city first) succeeded');
      return response;
    }

    console.log('All query strategies failed');
    return { results: [], provider: 'opencage' };
  }

  private async tryQuery(query: string, language: string, city: string): Promise<GeocodingResponse> {
    console.log('Trying query:', query);

    const searchParams = new URLSearchParams({
      q: query,
      key: this.apiKey,
      language: language,
      countrycode: 'CO',
      limit: '10',
      no_annotations: '1',
    });

    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?${searchParams.toString()}`
      );

      if (!res.ok) {
        console.error('OpenCage API error:', res.status);
        return { results: [], provider: 'opencage' };
      }

      const data: OpenCageQueryResponse = await res.json();

      if (!data.results || data.results.length === 0) {
        return { results: [], provider: 'opencage' };
      }

      // Convert OpenCage results to generic format with validation
      const results: GeocodingResult[] = data.results
        .filter(result => {
          // Basic filtering - must be in Colombia
          if (result.components.country_code !== 'co') {
            return false;
          }
          
          // Validate coordinates are within expected bounds for the city
          if (!this.isWithinBounds(result.geometry.lat, result.geometry.lng, city)) {
            return false;
          }
          
          return true;
        })
        .map(result => ({
          name: result.formatted,
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
          city: result.components.city ||
                result.components.town ||
                result.components.municipality ||
                result.components.county ||
                result.components.state ||
                '',
          boundingbox: [
            result.bounds?.southwest.lat.toString() || result.geometry.lat.toString(),
            result.bounds?.northeast.lat.toString() || result.geometry.lat.toString(),
            result.bounds?.southwest.lng.toString() || result.geometry.lng.toString(),
            result.bounds?.northeast.lng.toString() || result.geometry.lng.toString(),
          ] as [string, string, string, string],
        }));

      console.log(`Found ${results.length} valid results within bounds`);
      return { results, provider: 'opencage' };
    } catch (e: any) {
      console.error('Error in tryQuery:', e);
      return { results: [], provider: 'opencage' };
    }
  }
}
