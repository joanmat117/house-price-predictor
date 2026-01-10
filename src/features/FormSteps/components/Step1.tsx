import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { CITIES, PROPERTY_TYPES } from "@/config"
import { ComboboxControlled } from "./ComboboxControlled"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { ComboboxCordsControlled } from "./ComboboxCordsControlled"

export function Step1(){
  const t = useTranslations()

  const {handleSubmit,control,watch,setValue,formState:{errors}} = useFormPrediction('step1')

  const city = watch('city')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

    {/*City*/}
    <InputWrapper
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

    {/*Town*/}
    <InputWrapper
    labelHeading={t.form.town.label}
    error={errors.latitude?.message || errors.longitude?.message}
    >
      <ComboboxCordsControlled
      label={t.form.town.label}
      city={city}
      notFound={t.form.town.notFound}
      setValue={setValue}
      watch={watch}
      /> 
    </InputWrapper>
    
  </StepWrapper>
  </>
}
