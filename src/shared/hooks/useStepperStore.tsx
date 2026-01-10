import { StepperStore as useStore } from "@/shared/contexts/StepperStore";
import { useResultHandler } from "./useResultHandler";

export function useStepperStore(){
  const {maxStep,currentStep,goStep,goPrevStep,goNextStep} = useStore()
  const {handleResult} = useResultHandler()

  const goNextStepCustom = ()=>{
    if(currentStep === maxStep){
      console.log('Manejando con result handler')
      handleResult()
    } else {
      console.log('Llendo al siguiente step')
      goNextStep()
    }
  }
  console.log(currentStep)
  return {
    maxStep,
    currentStep,
    goNextStep:goNextStepCustom,
    goPrevStep,
    goStep
  }
}
