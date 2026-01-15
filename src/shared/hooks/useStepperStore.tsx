import { StepperStore as useStore } from "@/shared/contexts/StepperStore";
import { useResultHandler } from "./useResultHandler";

export function useStepperStore(){
  const {maxStep,currentStep,goStep,goPrevStep,goNextStep} = useStore()
  const {handleResult} = useResultHandler()

  const goNextStepCustom = ()=>{
    if(currentStep === maxStep){
      handleResult()
    } else {
      goNextStep()
    }
  }
  return {
    maxStep,
    currentStep,
    goNextStep:goNextStepCustom,
    goPrevStep,
    goStep
  }
}
