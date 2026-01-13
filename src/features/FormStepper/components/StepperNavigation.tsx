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
    <div className="flex items-center my-1 justify-between gap-2.5">
      <Button variant="outline" onClick={onPrevClick?()=>onPrevClick():undefined} disabled={currentStep === 1}>
          <ArrowBigLeft className="size-4"/>
        {t.buttons.previous}
      </Button>
      {currentStep !== maxStep?
      <Button
        variant="outline"
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
