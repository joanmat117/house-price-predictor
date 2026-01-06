import FormStepper from "@/features/FormStepper";
import { Button } from "@/shared/components/ui/button";
import { StepperContent, StepperPanel } from "@/shared/components/ui/stepper";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { CornerLeftUp} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const steps = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Predict(){

  const t = useTranslations()

  const [currentStep,setCurrentStep] = useState<number>(1)

  return <section className=' px-5'>
  <FormStepper className="py-5" onValueChange={setCurrentStep} steps={steps} value={currentStep}>
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
          Step {step} content
        </StepperContent>
      ))}
    </StepperPanel>



      </FormStepper>
  </section>
}
