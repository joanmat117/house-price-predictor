import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { PROPERTY_TYPES } from "@/config"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { InputLocation } from "./InputLocation"
import { MapSelector } from "./MapSelector"

export function Step1(){
  const t = useTranslations()

  const {handleSubmit,setValue,watch,control,formState:{errors}} = useFormPrediction('step1')

  const [city,latitude,longitude] = watch(['city','latitude','longitude'],'latitude')

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

    {latitude && longitude && 
    <MapSelector
    onPinChange={([lat,lon])=>{
      setValue('latitude',lat)
      setValue('longitude',lon)
    }}
    initialPin={[latitude,longitude]}
    zoom={17}
    center={[latitude,longitude]}

    />
    }


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
