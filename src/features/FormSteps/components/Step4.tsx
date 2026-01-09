import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"

export function Step4(){

  const {handleSubmit} = useFormPrediction('step4')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

   </StepWrapper>
  </>
}
