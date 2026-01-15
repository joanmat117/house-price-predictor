import { Button } from "@/shared/components/ui/button"
import { useStepperStore } from "@/shared/hooks/useStepperStore"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"

interface Props {
  onPrevClick?:()=>void,
  onNextClick?:()=>void
}

export function StepperNavigation({onNextClick,onPrevClick}:Props){

  const t = useTranslations()

  const {currentStep,maxStep} = useStepperStore()

  return <>
    <div className={`flex items-center my-1 ${currentStep > 1?'justify-between':'justify-center'} gap-2.5`}>
      {currentStep > 1 && <Button variant="outline" onClick={onPrevClick?()=>onPrevClick():undefined} disabled={currentStep === 1}>
          <ArrowBigLeft className="size-4"/>
        {t.buttons.previous}
      </Button>
      }
      {currentStep !== maxStep?
      <Button
        variant="default"
        onClick={onNextClick ? ()=>onNextClick() : undefined}
        disabled={currentStep === maxStep}
      >
        {t.buttons.next}
        <ArrowBigRight className="size-4" />
      </Button>:
      <Button
      variant='default'
      onClick={onNextClick? ()=>onNextClick() : undefined}
      >
        {t.buttons.getPrediction}

      </Button>
      }
    </div>

  </>
}
