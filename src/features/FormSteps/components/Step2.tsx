/**
 * Step 2: Property Dimensions and Counts
 *
 * This step collects quantitative property measurements and counts:
 * - Total lot area and built area (in square meters)
 * - Number of bedrooms, bathrooms, and parking spots
 *
 * Key Changes Made:
 * - Replaced slider inputs with direct number inputs for area fields
 * - Implemented radio button selection for count fields (1, 2, 3, 4, 5+)
 * - Added "5+" option with expandable numeric input for values ≥ 5
 * - Synchronized radio selections with hidden numeric form fields
 * - Added state management to keep UI and form values in sync
 * - Integrated with form persistence for proper restoration
 *
 * Technical Implementation:
 * - Uses useState for radio button selections
 * - useEffect hooks sync radio state when form values are restored
 * - handleCountSelect manages the radio-to-numeric conversion
 * - renderCountRadios is a reusable component for count fields
 * - Form validation works on the underlying numeric values
 */
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import { useEffect, useState } from "react"

// Radio button options for count fields (rooms, bathrooms, parking)
const COUNT_OPTIONS = ["1", "2", "3", "4", "5+"]

export function Step2(){
  // Get translation function for internationalization
  const t = useTranslations()

  // Get form handling functions from custom hook
  // register: Register uncontrolled inputs
  // setValue: Programmatically set form values
  // watch: Watch form values for reactive updates
  // handleSubmit: Form submission handler
  // errors: Form validation errors
  const {handleSubmit,register,setValue,watch,formState:{errors}} = useFormPrediction('step2')

  // Watch numeric form fields for synchronization with radio buttons
  const roomsValue = watch('rooms')
  const bathroomsValue = watch('bathrooms')
  const parkingValue = watch('parking_spots')

  // Convert numeric values to radio option strings
  const initialOption = (val?: number|null)=>{
    if(!val) return ''
    return val >= 5 ? '5+' : String(val)
  }

  // State for radio button selections (UI representation)
  const [roomsOption,setRoomsOption] = useState<string>(initialOption(roomsValue))
  const [bathroomsOption,setBathroomsOption] = useState<string>(initialOption(bathroomsValue))
  const [parkingOption,setParkingOption] = useState<string>(initialOption(parkingValue))

  // Keep radio options in sync when form values are restored (e.g., from localStorage)
  useEffect(()=>{ setRoomsOption(initialOption(roomsValue)) },[roomsValue])
  useEffect(()=>{ setBathroomsOption(initialOption(bathroomsValue)) },[bathroomsValue])
  useEffect(()=>{ setParkingOption(initialOption(parkingValue)) },[parkingValue])

  // Handle radio button selection and update corresponding numeric field
  const handleCountSelect = (option:string, field:'rooms'|'bathrooms'|'parking_spots', setter:(v:string)=>void)=>{
    setter(option) // Update UI state
    if(option === '5+'){
      setValue(field, 5, {shouldValidate:true}) // Set minimum value for validation
      return
    }
    setValue(field, Number(option), {shouldValidate:true}) // Convert to number
  }

  // Reusable component for rendering count selection radios
  const renderCountRadios = (label:string, field:'rooms'|'bathrooms'|'parking_spots', optionValue:string, setter:(v:string)=>void, errorMsg?:string)=>{
    return (
      <InputWrapper
        labelHeading={label}
        error={errorMsg}
      >
        {/* Radio button options */}
        <div className="flex flex-wrap gap-2">
          {COUNT_OPTIONS.map(opt=>(
            <button
              type="button"
              key={`${field}-${opt}`}
              onClick={()=>handleCountSelect(opt, field, setter)}
              className={`border rounded-md px-3 py-2 text-sm transition ${optionValue===opt ? 'border-primary bg-primary/10' : 'border-input'}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Expandable numeric input when "5+" is selected */}
        {optionValue==='5+' && (
          <div className="mt-3 space-y-1">
            <label className="text-sm text-muted-foreground">{t.form.exact_number_label}</label>
            <Input
              type="number"
              min={5}
              {...register(field, { valueAsNumber:true })}
              onChange={(e)=>{
                const val = Number(e.target.value)
                setValue(field, val, {shouldValidate:true})
              }}
            />
          </div>
        )}
      </InputWrapper>
    )
  }

  return <>
    <StepWrapper handleContinue={handleSubmit}>
      {/* Total lot area input */}
      <InputWrapper
        labelHeading={t.form.area.label}
        error={errors.area?.message}
      >
        <Input
          type="number"
          placeholder="e.g., 100"
          {...register('area',{valueAsNumber:true})}
        />
      </InputWrapper>

      {/* Built/living area input */}
      <InputWrapper
        labelHeading={t.form.built_area.label}
        error={errors.built_area?.message}
      >
        <Input
          type="number"
          placeholder="e.g., 90"
          {...register('built_area',{valueAsNumber:true})}
        />
      </InputWrapper>

      {/* Bedrooms count with radio selection */}
      {renderCountRadios(t.form.rooms.label, 'rooms', roomsOption, setRoomsOption, errors.rooms?.message as string)}

      {/* Bathrooms count with radio selection */}
      {renderCountRadios(t.form.bathrooms.label, 'bathrooms', bathroomsOption, setBathroomsOption, errors.bathrooms?.message as string)}

      {/* Parking spots count with radio selection */}
      {renderCountRadios(t.form.parking_spots.label, 'parking_spots', parkingOption, setParkingOption, errors.parking_spots?.message as string)}

    </StepWrapper>
  </>
}
