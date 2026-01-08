import { StepperStore as useStore } from "@/shared/contexts/StepperStore";

export function useStepperStore(){
  const {maxStep,currentStep,goStep,goPrevStep,goNextStep} = useStore()

  console.log(currentStep)
  return {
    maxStep,
    currentStep,
    goNextStep,
    goPrevStep,
    goStep
  }
}
