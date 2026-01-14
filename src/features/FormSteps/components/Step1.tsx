import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { PROPERTY_TYPES } from "@/config"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { InputLocation } from "./InputLocation"

export function Step1(){
  const t = useTranslations()

  const {handleSubmit,setValue,control,formState:{errors}} = useFormPrediction('step1')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

    {/*City*/}
      {/*<InputWrapper
    labelHeading={t.form.city.label}
    error={errors.city?.message}
    >
      
      <ComboboxControlled
      name="city"
      control={control}
      options={CITIES}
      notFound={t.form.city.notFound}
      label={t.form.city.label}
      />
      </InputWrapper>*/}

    <InputWrapper
    labelHeading={t.form.location.label}
    error={''}
    >
      <InputLocation
      setValue={setValue}
      cityError={errors.city?.message || errors.latitude?.message || errors.longitude?.message}
      /> 
    </InputWrapper>


    {/*Property Type*/}
    <InputWrapper
    labelHeading={t.form.property_type.label}
    error={errors.property_type?.message}
      >
      <BoxRadioInputControlled
      name="property_type"
      control={control}
      options={PROPERTY_TYPES}
      optionsTranslation={t.enums.propertyTypes}
      />
    </InputWrapper>

        
  </StepWrapper>
  </>
}
