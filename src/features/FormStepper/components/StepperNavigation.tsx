import { Button } from "@/shared/components/ui/button"
import { useStepperStore } from "@/shared/hooks/useStepperStore"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useAuthentication } from "@/shared/hooks/useAuthentication"
import { ArrowBigLeft, ArrowBigRight, Calculator} from "lucide-react"

interface Props {
  onPrevClick?:()=>void,
  onNextClick?:()=>void
}

export function StepperNavigation({onNextClick,onPrevClick}:Props){

  const t = useTranslations()
  const { isAuthenticated } = useAuthentication()

  const {currentStep,maxStep} = useStepperStore()

  return <>
    <div className={`flex items-start my-5 ${currentStep > 1?'justify-between':'justify-center'} gap-2.5`}>
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
      <div className="flex flex-col items-end gap-1">
      <Button
      variant='default'
      className="rounded-full w-full max-w-[300px]"
      onClick={onNextClick? ()=>onNextClick() : undefined}
      >
        {t.buttons.getPrediction}
        <Calculator className="size-4"/>

      </Button>
      {!isAuthenticated && <span 
        className='text-xs text-muted-foreground'
        >
        {t.buttons.requireGoogle}
      </span>}
      </div>
      }
    </div>

  </>
}
