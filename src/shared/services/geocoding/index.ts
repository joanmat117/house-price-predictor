import { OpenCageGeocodingService } from './openCageProvider';
import type { GeocodingService } from './types';

/**
 * Factory to get the geocoding service
 * Makes it easy to swap providers in the future
 */
export function getGeocodingService(): GeocodingService {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  
  // Easy to swap: just change this to return a different provider
  return new OpenCageGeocodingService(apiKey);
}
