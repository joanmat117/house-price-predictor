import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { LATITUDE, LONGITUDE, PROPERTY_TYPES } from "@/config"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { InputLocation } from "./InputLocation"
import { MapSelector } from "./MapSelector"
import { useState } from "react"

export function Step1(){
  const t = useTranslations()

  const {handleSubmit,setValue,watch,control,formState:{errors}} = useFormPrediction('step1')

  const [city,latitude,longitude] = watch(['city','latitude','longitude'],'latitude')
  const [showMap,setShowMap] = useState(false)

  return <>
  <StepWrapper handleContinue={handleSubmit}>

    
      <InputWrapper
    error={errors.latitude?.message || errors.longitude?.message}
    >
      <InputLocation
      setValue={setValue}
      watch={watch}
      city={city}
      control={control}
      errors={errors}
      showMap={showMap}
      setShowMap={setShowMap}
      /> 
    </InputWrapper>

    {showMap && latitude && longitude && 
    <MapSelector
    onPinChange={([lat,lon])=>{
      setValue('latitude',lat)
      setValue('longitude',lon)
    }}
    initialBbox={[
    [LATITUDE.min, LONGITUDE.min], // Esquina suroeste
    [LATITUDE.max, LONGITUDE.max]  // Esquina noreste
  ]}
    initialPin={[latitude,longitude]}
    zoom={17}
    center={[latitude,longitude]}

          mapStyle={{
            height:'300px',
            overflow:'hidden',
            borderRadius:'20px'
          }}
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
