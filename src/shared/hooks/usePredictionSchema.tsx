import type { Mask } from "node_modules/zod/v4/core/util.d.cts";
import { createPredictionSchema } from "../schemas/PredictionSchema";
import { useTranslations } from "./useTranslations";

type Props = Mask<"city" | "property_type" | "strata" | "area" | "built_area" | "rooms" | "bathrooms" | "parking_spots" | "has_sauna_jacuzzi_or_turkish_bath" | "has_pool" | "antiquity" | "latitude" | "longitude">

export function usePredictionSchema(Properties:Partial<Props>){
  const t = useTranslations()

  const schema = createPredictionSchema(t)

  return schema.pick(Properties)

}
