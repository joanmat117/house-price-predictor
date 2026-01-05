import { z } from 'zod';
import { CITIES, PROPERTY_TYPE } from '@/config';

const CitiesValues = CITIES.map(city=>city.value)

export function createPredictionSchema(translations: any) {
  const t = translations; // Alias para claridad
  
  return z.object({
    city: z.enum(CitiesValues, {error: t.validations.city.invalid}),
    
    property_type: z.enum(PROPERTY_TYPE, {error: t.validations.property_type.required}),

    strata: z.number()
      .int(t.validations.strata.integer)
      .min(1, t.validations.strata.min)
      .max(6, t.validations.strata.max),

    area: z.number()
      .min(30.0, t.validations.area.min)
      .max(10000.0, t.validations.area.max),

    built_area: z.number()
      .min(30.0, t.validations.built_area.min)
      .max(5000.0, t.validations.built_area.max),
      
    rooms: z.number()
      .int(t.validations.rooms.integer)
      .min(1, t.validations.rooms.min)
      .max(9, t.validations.rooms.max),

    bathrooms: z.number()
      .int(t.validations.bathrooms.integer)
      .min(1, t.validations.bathrooms.min)
      .max(9, t.validations.bathrooms.max),

    parking_spots: z.number()
      .int(t.validations.parking_spots.integer)
      .min(0, t.validations.parking_spots.min)
      .max(9, t.validations.parking_spots.max),

    has_sauna_jacuzzi_or_turkish_bath: z.boolean().default(false),
    has_pool: z.boolean().default(false),

    antiquity: z.number()
      .int(t.validations.antiquity.integer)
      .min(1, t.validations.antiquity.min)
      .max(5, t.validations.antiquity.max),

    latitude: z.number()
      .min(6.0, t.validations.latitude.out_of_range)
      .max(6.5, t.validations.latitude.out_of_range),

    longitude: z.number()
      .min(-75.6, t.validations.longitude.out_of_range)
      .max(-75.3, t.validations.longitude.out_of_range),
  });
}
// export type PredictionFormData = z.infer<typeof PredictionSchema>;
