import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"

export function Step5(){

  const {handleSubmit} = useFormPrediction('step5')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

   </StepWrapper>
  </>
}
