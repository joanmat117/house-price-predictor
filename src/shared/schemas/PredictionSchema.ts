import { z } from 'zod';
import { BUYING_MOTIVES, CITIES, PROPERTY_STATUSES, PROPERTY_TYPES, RELATION_WITH_PROPERTY, SELLING_MOTIVES } from '@/config';

export function createPredictionSchema(translations: any) {
  const t = translations
  
  return z.object({
  city: z.enum(CITIES, { message: t.validations.city.invalid }),
  
  property_type: z.enum(PROPERTY_TYPES,{error:t.validations.propertyType.invalid}),
  
  strata: z.coerce.number()
    .min(1, { message: t.validations.strata.min })
    .max(6, { message: t.validations.strata.max }),
  
  area: z.coerce.number()
    .min(30, { message: t.validations.area.min })
    .max(10000, { message: t.validations.area.max }),
  
  built_area: z.coerce.number()
    .min(30, { message: t.validations.builtArea.min })
    .max(5000, { message: t.validations.builtArea.max }),
  
  rooms: z.coerce.number()
    .gt(0, { message: t.validations.rooms.gt })
    .lt(10, { message: t.validations.rooms.lt }),
  
  bathrooms: z.coerce.number()
    .gt(0, { message: t.validations.bathrooms.gt })
    .lt(10, { message: t.validations.bathrooms.lt }),
  
  parking_spots: z.coerce.number()
    .min(0, { message: t.validations.parkingSpots.min })
    .lt(10, { message: t.validations.parkingSpots.lt }),
  
  has_sauna_jacuzzi_or_turkish_bath: z.boolean({
    error: t.validations.hasSauna.required,
  }),
  
  has_pool: z.boolean({
    error: t.validations.hasPool.required,
  }),
  
  antiquity: z.coerce.number()
    .min(1, { message: t.validations.antiquity.min })
    .max(5, { message: t.validations.antiquity.max }),
  
  latitude: z.coerce.number()
    .min(6, { message: t.validations.latitude.min })//Min should be 6
    .max(6.5, { message: t.validations.latitude.max }),//Max should be 6.5
  
  longitude: z.coerce.number()
    .min(-75.7, { message: t.validations.longitude.min })//Min should be -75.6
    .max(-75.5, { message: t.validations.longitude.max }),//Max should be -75.3
  
  // Campos de Data Analysis
  relation_with_property: z.enum(RELATION_WITH_PROPERTY, {message: t.validations.relationWithProperty.invalid}).default("agent"),
  
  property_status: z.enum(PROPERTY_STATUSES, {message: t.validations.propertyStatus.invalid}).optional().nullable(),
  
  selling_motives: z.enum(SELLING_MOTIVES, {message: t.validations.sellingMotives.invalid}).optional().nullable(),
  
  buying_motives: z.enum(BUYING_MOTIVES, {message: t.validations.buyingMotives.invalid}).optional().nullable(),
  
  willing_price: z.coerce.number()
    .min(50000000, { message: t.validations.willingPrice.min })
    .max(10000000000000, { message: t.validations.willingPrice.max })
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
