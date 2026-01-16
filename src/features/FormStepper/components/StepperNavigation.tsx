import { Button } from "@/shared/components/ui/button"
import { useStepperStore } from "@/shared/hooks/useStepperStore"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { ArrowBigLeft, ArrowBigRight, Calculator} from "lucide-react"

interface Props {
  onPrevClick?:()=>void,
  onNextClick?:()=>void
}

export function StepperNavigation({onNextClick,onPrevClick}:Props){

  const t = useTranslations()

  const {currentStep,maxStep} = useStepperStore()

  return <>
    <div className={`flex items-center my-5 ${currentStep > 1?'justify-between':'justify-center'} gap-2.5`}>
      {currentStep > 1 && <Button variant="outline" className="rounded-full" onClick={onPrevClick?()=>onPrevClick():undefined} disabled={currentStep === 1}>
          <ArrowBigLeft className="size-4"/>
        {t.buttons.previous}
      </Button>
      }
      {currentStep !== maxStep?
      <Button
        variant="default"
        className={`rounded-full ${currentStep === 1 && 'w-full max-w-md mt-4'}`}
        onClick={onNextClick ? ()=>onNextClick() : undefined}
        disabled={currentStep === maxStep}
      >
        {t.buttons.next}
        <ArrowBigRight className="size-4" />
      </Button>:
      <Button
      variant='default'
      className="rounded-full"
      onClick={onNextClick? ()=>onNextClick() : undefined}
      >
        {t.buttons.getPrediction}
        <Calculator className="size-4"/>

      </Button>
      }
    </div>

  </>
}
