import { z } from 'zod';
import { ANTIQUITY, AREA, BATHROOMS, BUILT_AREA, BUYING_MOTIVES, CITIES, LATITUDE, LONGITUDE, PARKING_SPOTS, PROPERTY_STATUSES, PROPERTY_TYPES, RELATION_WITH_PROPERTY, ROOMS, SELLING_MOTIVES, STRATA, WILLING_PRICE } from '@/config';

export function createPredictionSchema(translations: any) {
  const t = translations
  
  return z.object({
  city: z.enum(CITIES, { message: t.validations.city.invalid }),
  
  property_type: z.enum(PROPERTY_TYPES,{error:t.validations.propertyType.invalid}),
  
  strata: z.coerce.number()
    .min(STRATA.min, { message: t.validations.strata.min })
    .max(STRATA.max, { message: t.validations.strata.max }),
  
  area: z.coerce.number()
    .min(AREA.min, { message: t.validations.area.min })
    .max(AREA.max, { message: t.validations.area.max }),
  
  built_area: z.coerce.number()
    .min(BUILT_AREA.min, { message: t.validations.builtArea.min })
    .max(BUILT_AREA.max, { message: t.validations.builtArea.max }),
  
  rooms: z.coerce.number()
    .min(ROOMS.min, { message: t.validations.rooms.gt })
    .max(ROOMS.max, { message: t.validations.rooms.lt }),
  
  bathrooms: z.coerce.number()
    .min(BATHROOMS.min, { message: t.validations.bathrooms.gt })
    .max(BATHROOMS.max, { message: t.validations.bathrooms.lt }),
  
  parking_spots: z.coerce.number()
    .min(PARKING_SPOTS.min, { message: t.validations.parkingSpots.min })
    .max(PARKING_SPOTS.max, { message: t.validations.parkingSpots.lt }),
  
  has_sauna_jacuzzi_or_turkish_bath: z.boolean({
    error: t.validations.hasSauna.required,
  }),
  
  has_pool: z.boolean({
    error: t.validations.hasPool.required,
  }),
  
  antiquity: z.coerce.number()
    .min(ANTIQUITY.min, { message: t.validations.antiquity.min })
    .max(ANTIQUITY.max, { message: t.validations.antiquity.max }),
  
  latitude: z.coerce.number()
    .min(LATITUDE.min, { message: t.validations.latitude.min })//Min should be 6
    .max(LATITUDE.max, { message: t.validations.latitude.max }),//Max should be 6.5
  
  longitude: z.coerce.number()
    .min(LONGITUDE.min, { message: t.validations.longitude.min })//Min should be -75.6
    .max(LONGITUDE.max, { message: t.validations.longitude.max }),//Max should be -75.3
  
  // Campos de Data Analysis
  relation_with_property: z.enum(RELATION_WITH_PROPERTY, {message: t.validations.relationWithProperty.invalid}).default("agent"),
  
  property_status: z.enum(PROPERTY_STATUSES, {message: t.validations.propertyStatus.invalid}).optional().nullable(),
  
  selling_motives: z.enum(SELLING_MOTIVES, {message: t.validations.sellingMotives.invalid}).optional().nullable(),
  
  buying_motives: z.enum(BUYING_MOTIVES, {message: t.validations.buyingMotives.invalid}).optional().nullable(),
  
  willing_price: z.coerce.number()
    .min(WILLING_PRICE.min, { message: t.validations.willingPrice.min })
    .max(WILLING_PRICE.max, { message: t.validations.willingPrice.max })
    .optional()
    .nullable(),
  
  is_in_construction: z.boolean({
    error: t.validations.isInConstruction.required,
  }).default(false),
})
}




/*
.refine(
  (data) => {
    if (data.relation_with_property === "sells") {
      return data.selling_motives !== null && data.selling_motives !== undefined;
    }
    return true;
  },
  {
    message: t.validations.sellingMotives.required,
    path: ["selling_motives"]
  }
)
.refine(
  (data) => {
    if (data.relation_with_property === "sells") {
      return data.property_status !== null && data.property_status !== undefined;
    }
    return true;
  },
  {
    message: t.validations.propertyStatus.required,
    path: ["property_status"]
  }
)
.refine(
  (data) => {
    if (data.relation_with_property === "buys") {
      return data.buying_motives !== null && data.buying_motives !== undefined;
    }
    return true;
  },
  {
    message: t.validations.buyingMotives.required,
    path: ["buying_motives"]
  }
)
.refine(
  (data) => {
    if (data.relation_with_property === "sells" || data.relation_with_property === "buys" || data.relation_with_property === "agent") {
      return data.willing_price !== null && data.willing_price !== undefined;
    }
    return true;
  },
  {
    message: t.validations.willingPrice.required,
    path: ["willing_price"]
  }
)
*/

/*
export type City = (typeof CITIES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type RelationWithProperty = (typeof RELATION_WITH_PROPERTY)[number];
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type SellingMotive = (typeof SELLING_MOTIVES)[number];
export type BuyingMotive = (typeof BUYING_MOTIVES)[number];
*/
