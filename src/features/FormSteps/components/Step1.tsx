import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { StepWrapper } from "./StepWrapper"
import { InputWrapper } from "./InputWrapper"
import { PROPERTY_TYPES } from "@/config"
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
      <div className="animate-pulse-fade-in transition-300">

    <MapSelector
    onPinChange={([lat,lon])=>{
      // Validate coordinates are within bounds
      if (lat >= 6.115763 && lat <= 6.342470 && lon >= -75.685063 && lon <= -75.4885) {
        setValue('latitude',lat)
        setValue('longitude',lon)
      } else {
        console.warn('Coordinates outside allowed bounds:', {lat, lon});
      }
    }}
    initialBbox={[
    [6.115763, -75.685063], // Southwest corner
    [6.342470, -75.4885]    // Northeast corner (extended 500m east)
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
    </div>
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
