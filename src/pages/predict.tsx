import FormStepper from "@/features/FormStepper";
import { Step1 } from "@/features/FormSteps/components/Step1";
import { Button } from "@/shared/components/ui/button";
import { StepperContent, StepperPanel } from "@/shared/components/ui/stepper";
import { useStepperStore } from "@/shared/hooks/useStepperStore";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { CornerLeftUp} from "lucide-react";
import { Link } from "react-router-dom";


export default function Predict(){

  const t = useTranslations()

  const {maxStep,currentStep} = useStepperStore()

  const steps = Array.from({length:maxStep},(_,i)=>i+1)

  return <section className=' px-5'>
  <FormStepper className="py-5" onValueChange={()=>{}} steps={steps} value={currentStep}>
  <Link to='/' >
    <Button variant={'outline'} size='sm' >
      <CornerLeftUp className='size-4'/>
      {t.buttons.out}
    </Button>
  </Link>

    {/* Stepper Content */}

    <StepperPanel className="text-sm">
      {steps.map((step) => (
        <StepperContent className="w-full flex items-center justify-center" key={step} value={step}>
            {step===1 && <Step1/>}
        </StepperContent>
      ))}
    </StepperPanel>



      </FormStepper>
  </section>
}
