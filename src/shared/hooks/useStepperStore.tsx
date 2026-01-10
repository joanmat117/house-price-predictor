import { StepperStore as useStore } from "@/shared/contexts/StepperStore";
import { useResultHandler } from "./useResultHandler";

export function useStepperStore(){
  const {maxStep,currentStep,goStep,goPrevStep,goNextStep} = useStore()

  const goNextStepCustom = ()=>{
    if(currentStep === maxStep){
      useResultHandler()
    } else {
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
