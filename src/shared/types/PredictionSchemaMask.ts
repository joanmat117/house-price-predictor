import type { Mask } from "node_modules/zod/v4/core/util.d.cts"

export type PredictionSchemaMask = Mask<"city" | "property_type" | "strata" | "area" | "built_area" | "rooms" | "bathrooms" | "parking_spots" | "has_sauna_jacuzzi_or_turkish_bath" | "has_pool" | "antiquity" | "latitude" | "longitude">