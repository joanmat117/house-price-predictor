import { StepperNavigation } from "@/features/FormStepper/components/StepperNavigation";
import { useStepperStore } from "@/shared/hooks/useStepperStore";
import type { ReactNode } from "react";

export function StepWrapper({
  children,
  stepTitle,
  continueFn
}:{
  children:ReactNode,
  stepTitle:ReactNode,
    continueFn:()=>boolean //if return true, go next step, else not
}){
  
  const {goPrevStep,goNextStep} = useStepperStore()

  return <section className="">
  <h2 className="text-center text-lg font-bold">
      {stepTitle}
  </h2>

  {children}
  <StepperNavigation
    onPrevClick={goPrevStep}
    onNextClick={()=>{
        const canContinue = continueFn()
        if(canContinue) goNextStep()
      }}
  />
  </section>
}
