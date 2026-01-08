import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { useState } from "react"
import { InputWrapper } from "./InputWrapper"
import { CITIES, PROPERTY_TYPES } from "@/config"
import { ComboboxControlled } from "./ComboboxControlled"

export function Step1(){
  const [canContinue,setCanContinue] = useState<boolean>(false)
  const t = useTranslations()

  const {handleSubmit,watch,control,formState:{errors}} = useFormPrediction('step1')

  console.log(watch())
  const continueFn = ()=>{
    
    const fn = handleSubmit(()=>{
      console.log('Good form')
      setCanContinue(true)
    },()=>{
        console.log('Bad form')
      setCanContinue(false)
    })

    fn()

    return canContinue
  }

  return <>
  <StepWrapper
  continueFn={continueFn}
  stepTitle={t.steps.step1.title}
  >
    <InputWrapper
    labelHeading={t.form.city.label}
    error={errors.city?.message}
    >
      
      <ComboboxControlled
      name="city"
      control={control}
      options={CITIES}
      notFound={t.form.city.notFound}
      optionsTranslation={t.enums.cities}
      label={t.form.city.label}
      />
      </InputWrapper>

    <InputWrapper
    labelHeading={t.form.property_type.label}
    error={errors.property_type?.message}
      >
      <ComboboxControlled
      name="property_type"
      control={control}
      options={PROPERTY_TYPES}
      notFound={t.form.property_type.notFound}
      optionsTranslation={t.enums.propertyTypes}
      label={t.form.property_type.label}
      />
    </InputWrapper>
    
  </StepWrapper>
  </>
}
