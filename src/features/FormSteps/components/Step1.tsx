import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { PROPERTY_TYPES } from "@/config"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { InputLocation } from "./InputLocation"

export function Step1(){
  const t = useTranslations()

  const {handleSubmit,setValue,watch,control,formState:{errors}} = useFormPrediction('step1')

  const city = watch('city')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

    
      <InputWrapper
    error={errors.latitude?.message || errors.longitude?.message}
    >
      <InputLocation
      setValue={setValue} 
      city={city}
      control={control}
      errors={errors}
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
