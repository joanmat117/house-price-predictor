import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' //Is not installed
import { type PredictionSchemaMask } from "@/shared/types/PredictionSchemaMask"
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
    has_sauna_jacuzzi_or_turkish_bath: true,
    has_pool: true,
    antiquity: true
  },
  step4: {
    property_status: true,
    time_for_sale: true
  },
  step5: {
    relation_with_property: true
  }
}

type Steps = keyof typeof predictionFormSteps


export function useFormPrediction(step:Steps){
  
  const stepSchema = usePredictionSchema(predictionFormSteps[step])

  const formUtils = useForm({
    mode:'onBlur',
    resolver:zodResolver(stepSchema)
  })
  
  useFormPersist({
    watch:formUtils.watch,
    reset:formUtils.reset
  })
  
  return formUtils
}
