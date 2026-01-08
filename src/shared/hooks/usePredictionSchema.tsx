import { createPredictionSchema } from "../schemas/PredictionSchema";
import { useTranslations } from "./useTranslations";
import {type PredictionSchemaMask } from "@/shared/types/PredictionSchema"

export function usePredictionSchema(Properties:Partial<PredictionSchemaMask>){
  const t = useTranslations()

  const schema = createPredictionSchema(t)

  return schema.pick(Properties) 

}
