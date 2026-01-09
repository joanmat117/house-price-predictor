/**
 * Step 3: Property Features and Characteristics
 *
 * This step collects detailed property features and characteristics that affect pricing:
 * - Socioeconomic stratum (1-6 scale)
 * - Property age (antiquity in years)
 * - Luxury amenities (sauna/jacuzzi/Turkish bath, pool)
 * - Construction status
 *
 * Key Changes Made:
 * - Added strata field as a dropdown (previously missing, causing validation errors)
 * - Implemented all boolean fields using BoxRadioInputControlled with Yes/No options
 * - Added proper form validation and error handling
 * - Integrated with translation system for internationalization
 * - Used React Hook Form for form state management
 */
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { ComboboxControlled } from "./ComboboxControlled"

export function Step3(){
  // Get translation function for internationalization
  const t = useTranslations()

  // Get form handling functions from custom hook
  // control: React Hook Form controller for controlled components
  // register: Function to register uncontrolled inputs
  // handleSubmit: Form submission handler with validation
  // errors: Form validation errors
  const {handleSubmit,control,register,formState:{errors}} = useFormPrediction('step3')

  return <>
    <StepWrapper handleContinue={handleSubmit}>
      {/* Socioeconomic stratum selection - key factor in Colombian real estate pricing */}
      <InputWrapper
        labelHeading={t.form.strata.label}
        error={errors.strata?.message}
      >
        <ComboboxControlled
          name="strata"
          control={control}
          options={["1", "2", "3", "4", "5", "6"]}
          label={t.form.strata.label}
          notFound="Strata not found"
        />
      </InputWrapper>

      {/* Property age input - affects depreciation calculations */}
      <InputWrapper
        labelHeading={t.form.antiquity.label}
        error={errors.antiquity?.message}
      >
        <Input
          type="number"
          min={1}
          max={5}
          placeholder="e.g., 2"
          {...register('antiquity',{valueAsNumber:true})}
        />
      </InputWrapper>

      {/* Luxury amenity: Sauna, Jacuzzi, or Turkish bath */}
      <InputWrapper
        labelHeading={t.form.has_sauna_jacuzzi_or_turkish_bath.label}
        error={errors.has_sauna_jacuzzi_or_turkish_bath?.message}
      >
        <BoxRadioInputControlled
          name="has_sauna_jacuzzi_or_turkish_bath"
          control={control}
          options={["true", "false"]}
          optionsTranslation={{"true": t.buttons.yes, "false": t.buttons.no}}
          valueType="boolean" // Converts string to boolean for backend
        />
      </InputWrapper>

      {/* Pool amenity - significant value adder */}
      <InputWrapper
        labelHeading={t.form.has_pool.label}
        error={errors.has_pool?.message}
      >
        <BoxRadioInputControlled
          name="has_pool"
          control={control}
          options={["true", "false"]}
          optionsTranslation={{"true": t.buttons.yes, "false": t.buttons.no}}
          valueType="boolean"
        />
      </InputWrapper>

      {/* Construction status - affects valuation methodology */}
      <InputWrapper
        labelHeading={t.form.is_in_construction.label}
        error={errors.is_in_construction?.message}
      >
        <BoxRadioInputControlled
          name="is_in_construction"
          control={control}
          options={["true", "false"]}
          optionsTranslation={{"true": t.buttons.yes, "false": t.buttons.no}}
          valueType="boolean"
        />
      </InputWrapper>

    </StepWrapper>
  </>
}
