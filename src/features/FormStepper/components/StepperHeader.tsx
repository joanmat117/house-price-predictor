import { Button } from "@/shared/components/ui/button";
import { useStepperStore } from "@/shared/hooks/useStepperStore";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { CornerLeftUp } from "lucide-react";
import { Link } from "react-router-dom";

export function StepperHeader(){

  const {currentStep} = useStepperStore()
  const t = useTranslations()

  return <header className='m-0 mb-4 flex flex-col gap-2'>
   <Link to='/' >
    <Button variant={'outline'} size='sm' >
      <CornerLeftUp className='size-4'/>
      {t.buttons.out}
    </Button>
  </Link>

  <h1 className="flex-1 text-center text-2xl font-extrabold" >
    {currentStep===1 && t.steps.step1.title}
    {currentStep===2 && t.steps.step2.title}
    {currentStep===3 && t.steps.step3.title}
    {currentStep===4 && t.steps.step4.title}
    {currentStep===5 && t.steps.step5.title}
  </h1>

  </header>
}
