import { StepperNavigation } from "@/features/FormStepper/components/StepperNavigation";
import { useStepperStore } from "@/shared/hooks/useStepperStore";
import type { ReactNode } from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

export function StepWrapper({
  children,
  handleContinue
}:{
  children?:ReactNode,
    handleContinue:UseFormHandleSubmit<any, any> //function handleSubmit of react-hook-forms
}){
  
  const {goPrevStep,goNextStep} = useStepperStore()

  return <section className="animate-fade-in w-full">

  {children}
  <StepperNavigation
    onPrevClick={goPrevStep}
    onNextClick={()=>{
        (handleContinue(
          //Case correct fields
          ()=>{
          goNextStep() 
          },
          //Case invalid fields
          ()=>{
          }
        ))()
      }}
  />
  </section>
}
