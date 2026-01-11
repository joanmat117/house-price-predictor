import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { RELATION_WITH_PROPERTY } from "@/config"

export function Step4(){

  const t = useTranslations()

  const {handleSubmit,control,formState:{errors}} = useFormPrediction('step4')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

      <InputWrapper
      labelHeading={t.form.relation_with_property.label}
      error={errors.relation_with_property?.message}
      >
        <BoxRadioInputControlled
        name="relation_with_property"
        control={control}
        options={RELATION_WITH_PROPERTY}
        optionsTranslation={t.enums.relationsWithProperty}
        />
      </InputWrapper>

   </StepWrapper>
  </>
}
