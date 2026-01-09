import FormStepper from "@/features/FormStepper";
import { StepperHeader } from "@/features/FormStepper/components/StepperHeader";
import { Step1 } from "@/features/FormSteps/components/Step1";
import { Step2 } from "@/features/FormSteps/components/Step2";
import { Step3 } from "@/features/FormSteps/components/Step3";
import { Step4 } from "@/features/FormSteps/components/Step4";
import { Step5 } from "@/features/FormSteps/components/Step5";
import { StepperContent, StepperPanel } from "@/shared/components/ui/stepper";
import { useStepperStore } from "@/shared/hooks/useStepperStore";


export default function Predict(){

  const {maxStep,currentStep} = useStepperStore()

  const steps = Array.from({length:maxStep},(_,i)=>i+1)

  return <section className=' px-5'>
  <FormStepper className="py-5" onValueChange={()=>{}} steps={steps} value={currentStep}>
 
    <StepperHeader/>

    {/* Stepper Content */}

    <StepperPanel className="text-sm">
      {steps.map((step) => (
        <StepperContent className="w-full flex items-center justify-center" key={step} value={step}>
            {step===1 && <Step1/>}
            {step===2 && <Step2/>}
            {step===3 && <Step3/>}
            {step===4 && <Step4/>}
            {step===5 && <Step5/>}
        </StepperContent>
      ))}
    </StepperPanel>



      </FormStepper>
  </section>
}
