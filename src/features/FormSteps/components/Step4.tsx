/**
 * Step 4: User Relationship with Property
 *
 * This step determines the user's role in the real estate transaction:
 * - "sells": Property owner/seller
 * - "buys": Property buyer/purchaser
 * - "agent": Real estate professional
 *
 * Key Changes Made:
 * - Simplified from previous version that included conditional fields
 * - Now only collects the relationship type
 * - This selection drives conditional logic in Step 5
 * - Uses BoxRadioInputControlled for consistent UI
 * - Integrated with translation system
 *
 * Purpose: This step's selection determines which additional fields
 * are required in Step 5 (selling motives, buying motives, etc.)
 */
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"

export function Step4(){
  // Get translation function for internationalization
  const t = useTranslations()

  // Get form handling functions from custom hook
  // control: React Hook Form controller for controlled components
  // handleSubmit: Form submission handler with validation
  // errors: Form validation errors
  const {handleSubmit,control,formState:{errors}} = useFormPrediction('step4')

  return <>
    <StepWrapper handleContinue={handleSubmit}>
      {/* User relationship selection - determines conditional fields in Step 5 */}
      <InputWrapper
        labelHeading={t.form.relation_with_property.label}
        error={errors.relation_with_property?.message}
      >
        <BoxRadioInputControlled
          name="relation_with_property"
          control={control}
          options={["sells", "buys", "agent"]}
          optionsTranslation={t.enums.relationsWithProperty}
        />
      </InputWrapper>

    </StepWrapper>
  </>
}
