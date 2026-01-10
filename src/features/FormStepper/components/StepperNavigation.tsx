import { Button } from "@/shared/components/ui/button"
import { useAuthentication } from "@/shared/hooks/useAuthentication"
import { useRedirectAfterLogin } from "@/shared/hooks/useRedirectAfterLogin"
import { useStepperStore } from "@/shared/hooks/useStepperStore"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { initiateGoogleLogin } from "@/shared/services/googleOAuth"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import { useNavigate} from "react-router-dom"

interface Props {
  onPrevClick?:()=>void,
  onNextClick?:()=>void
}

export function StepperNavigation({onNextClick,onPrevClick}:Props){

  const t = useTranslations()

  const {isAuthenticated} = useAuthentication()
  const {setRedirectUrl} = useRedirectAfterLogin()
  const navigate = useNavigate()

  const {currentStep,maxStep} = useStepperStore()

  const handleFinishForm = ()=>{
    if(isAuthenticated){
       navigate('/results',{replace:true})
    } else {
      setRedirectUrl('/results')
      initiateGoogleLogin()
    }
  }

  return <>
    <div className="flex items-center justify-between gap-2.5">
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
      onClick={handleFinishForm}
      >
        {t.buttons.getPrediction}

      </Button>
      }
    </div>

  </>
}
