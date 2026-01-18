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

  /**
   * Strip common location prefixes that might cause search issues
   * Based on OpenStreetMap naming conventions and common Colombian landmarks
   * Includes both Spanish and English prefixes
   */
  private stripCommonPrefixes(query: string): string {
    const prefixes = [
      // Commercial (Spanish)
      'centro comercial ',
      'centro ',
      'edificio ',
      'torre ',
      'plaza ',
      // Commercial (English)
      'shopping center ',
      'shopping centre ',
      'mall ',
      'center ',
      'centre ',
      'building ',
      'tower ',
      
      // Roads/Streets (Spanish)
      'calle ',
      'carrera ',
      'avenida ',
      'diagonal ',
      'transversal ',
      'circular ',
      'autopista ',
      'vía ',
      'via ',
      // Roads/Streets (English)
      'street ',
      'avenue ',
      'road ',
      'highway ',
      
      // Transportation (Spanish)
      'estación ',
      'estacion ',
      'metro ',
      'metrocable ',
      'tranvía ',
      'tranvia ',
      'terminal ',
      'parada ',
      'aeropuerto ',
      // Transportation (English)
      'station ',
      'tram ',
      'tramway ',
      'stop ',
      'airport ',
      
      // Recreation/Sports (Spanish)
      'parque ',
      'estadio ',
      'polideportivo ',
      // Recreation/Sports (English)
      'park ',
      'stadium ',
      'sports center ',
      'sports centre ',
      
      // Education (Spanish)
      'universidad ',
      'colegio ',
      'escuela ',
      // Education (English)
      'university ',
      'college ',
      'school ',
      
      // Healthcare (Spanish)
      'hospital ',
      'clínica ',
      'clinica ',
      // Healthcare (English)
      'clinic ',
      
      // Religious/Cultural (Spanish)
      'iglesia ',
      'catedral ',
      'museo ',
      'biblioteca ',
      'teatro ',
      // Religious/Cultural (English)
      'church ',
      'cathedral ',
      'museum ',
      'library ',
      'theater ',
      'theatre ',
      
      // Hospitality (Spanish)
      'hotel ',
      'restaurante ',
      // Hospitality (English)
      'restaurant ',
    ];
    
    const lowerQuery = query.toLowerCase();
    for (const prefix of prefixes) {
      if (lowerQuery.startsWith(prefix)) {
        const stripped = query.substring(prefix.length);
        console.log(`Stripped prefix "${prefix.trim()}" from query`);
        return stripped;
      }
    }
    
    return query;
  }

  async searchLocation(params: {
    city: string;
    query: string;
    state?: string;
    language?: string;
  }): Promise<GeocodingResponse> {
    const { city, query, state = 'Antioquia', language = 'es' } = params;
    
    const simplifiedQuery = this.stripCommonPrefixes(query);
    const hasPrefix = simplifiedQuery !== query;

    // Strategy 1: Try exact query with all details (always try original first)
    let response = await this.tryQuery(
      `${query}, ${city}, ${state}, Colombia`,
      language,
      city
    );

    let allResults = [...response.results];

    // Strategy 2: If has prefix, ALSO try simplified version and combine results
    if (hasPrefix) {
      console.log(`Also trying simplified "${simplifiedQuery}" for additional results`);
      const simplifiedResponse = await this.tryQuery(
        `${simplifiedQuery}, ${city}, ${state}, Colombia`,
        language,
        city
      );

      // Add simplified results that aren't duplicates
      const existingNames = new Set(allResults.map(r => r.name));
      const newResults = simplifiedResponse.results.filter(r => !existingNames.has(r.name));
      allResults = [...allResults, ...newResults];
      
      if (allResults.length > 0) {
        console.log(`Combined results: ${response.results.length} original + ${newResults.length} simplified`);
        return { results: allResults, provider: 'opencage' };
      }
    } else if (allResults.length > 0) {
      console.log('Strategy 1 (full query) succeeded');
      return response;
    }

    // Strategy 3: Try without state
    const queryToUse = hasPrefix ? simplifiedQuery : query;
    response = await this.tryQuery(
      `${queryToUse}, ${city}, Colombia`,
      language,
      city
    );

    if (response.results.length > 0) {
      console.log('Strategy 3 (without state) succeeded');
      return response;
    }

    // Strategy 4: Last resort - try city first order
    response = await this.tryQuery(
      `${city} ${queryToUse}`,
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
