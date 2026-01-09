import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"

export function Step3(){

  const {handleSubmit} = useFormPrediction('step3')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

   </StepWrapper>
  </>
}
