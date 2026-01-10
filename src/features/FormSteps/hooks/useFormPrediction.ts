import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type PredictionSchemaMask } from "@/shared/types/PredictionSchema"
import { usePredictionSchema } from "@/shared/hooks/usePredictionSchema"
import { useFormPersist } from "./useFormPersist"

const predictionFormSteps: Record<string, Partial<PredictionSchemaMask>> = {
  step1: {
    city: true,
    property_type: true,
    latitude: true,
    longitude: true
  },
  step2: {
    area: true,
    built_area: true,
    rooms: true,
    bathrooms: true,
    parking_spots: true
  },
  step3: {
    strata: true,
    antiquity: true,
    has_sauna_jacuzzi_or_turkish_bath: true,
    has_pool: true,
    is_in_construction: true
  },
  step4: {
    relation_with_property: true
  },
  step5: {
    // Campos condicionales basados en relation_with_property
    property_status: true,
    selling_motives: true,
    buying_motives: true,
    willing_price: true
  }
};
type Steps = 'step1'|'step2'|'step3'|'step4'|'step5'


export function useFormPrediction(step:Steps){
  
  const stepSchema = usePredictionSchema(predictionFormSteps[step])

  const formUtils = useFormPersist(
    useForm({
    mode:'onBlur',
    resolver:zodResolver(stepSchema as any)
  })
  )
  
  return formUtils
}
