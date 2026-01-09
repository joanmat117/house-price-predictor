import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { SliderWithIndicator } from "./SliderWithIndicator"
import { AREA } from "@/config"

export function Step2(){

  const t = useTranslations()

  const {handleSubmit,formState:{errors}} = useFormPrediction('step2')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

      <InputWrapper
      labelHeading={t.form.area.label}
      error={errors.area?.message}
      >
        <SliderWithIndicator
        maxValue={AREA.max}
        min={AREA.min}
        />
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.built_area.label}
      error={errors.built_area?.message}
      >
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.rooms.label}
      error={errors.rooms?.message}
      >
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.bathrooms.label}
      error={errors.bathrooms?.message}
      >
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.parking_spots.label}
      error={errors.parking_spots?.message}
      >
      </InputWrapper>

   </StepWrapper>
  </>
}
