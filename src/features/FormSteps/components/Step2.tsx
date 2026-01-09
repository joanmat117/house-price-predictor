import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"

export function Step2(){

  const t = useTranslations()

  const {handleSubmit,formState:{errors}} = useFormPrediction('step2')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

      <InputWrapper
      labelHeading={t.form.area.label}
      error={errors.area?.message}
      >
      </InputWrapper>
   </StepWrapper>
  </>
}
