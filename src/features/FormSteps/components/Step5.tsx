/**
 * Step 5: Conditional Additional Information
 *
 * This step collects additional information based on the user's relationship
 * with the property (selected in Step 4). The fields shown depend on whether
 * the user is selling, buying, or acting as an agent.
 *
 * Conditional Logic:
 * - If "sells": Shows property_status and selling_motives
 * - If "buys": Shows buying_motives
 * - If "agent": Shows no additional conditional fields
 * - Always shows: willing_price (for all users)
 *
 * Key Changes Made:
 * - Implemented conditional rendering using useWatch from React Hook Form
 * - Moved conditional fields from Step 4 to proper separation
 * - Added comprehensive motive options for sellers and buyers
 * - Integrated with translation system for all enum values
 * - Used BoxRadioInputControlled for consistent UI
 *
 * Technical Implementation:
 * - useWatch monitors 'relation_with_property' from previous step
 * - Conditional rendering ensures only relevant fields are shown
 * - Form validation adapts based on visible fields
 */
import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { useWatch } from "react-hook-form"

export function Step5(){
  // Get translation function for internationalization
  const t = useTranslations()

  // Get form handling functions from custom hook
  // control: React Hook Form controller for controlled components
  // register: Function to register uncontrolled inputs
  // handleSubmit: Form submission handler with validation
  // errors: Form validation errors
  const {handleSubmit,control,register,formState:{errors}} = useFormPrediction('step5')

  // Watch the relation_with_property field from Step 4 to determine which fields to show
  // useWatch allows real-time monitoring of form values without re-rendering the entire form
  const relationWithProperty = useWatch({ control, name: 'relation_with_property' })

  return <>
    <StepWrapper handleContinue={handleSubmit}>
      {/* Conditional fields for property sellers */}
      {relationWithProperty === "sells" && (
        <>
          {/* Current property status - affects pricing strategy */}
          <InputWrapper
            labelHeading={t.form.property_status.label}
            error={errors.property_status?.message}
          >
            <BoxRadioInputControlled
              name="property_status"
              control={control}
              options={["unoccupied", "rented", "inhabitates it"]}
              optionsTranslation={t.enums.propertyStatuses}
            />
          </InputWrapper>

          {/* Selling motivations - helps understand market positioning */}
          <InputWrapper
            labelHeading={t.form.selling_motives.label}
            error={errors.selling_motives?.message}
          >
            <BoxRadioInputControlled
              name="selling_motives"
              control={control}
              options={[
                "house change",
                "settle a debt",
                "business opportunity",
                "browsing offers",
                "investment for studies or travel",
                "Change city or live in the countryside",
                "I don't want to keep renting",
                "property division"
              ]}
              optionsTranslation={t.enums.sellingMotives}
            />
          </InputWrapper>
        </>
      )}

      {/* Conditional fields for property buyers */}
      {relationWithProperty === "buys" && (
        <InputWrapper
          labelHeading={t.form.buying_motives.label}
          error={errors.buying_motives?.message}
        >
          <BoxRadioInputControlled
            name="buying_motives"
            control={control}
            options={[
              "proximity to work and schools",
              "investment opportunity",
              "affordability and financing options",
              "interest in newer home",
              "bigger house",
              "desire for a move-in ready home"
            ]}
            optionsTranslation={t.enums.buyingMotives}
          />
        </InputWrapper>
      )}

      {/* Willing price - required for all users regardless of relationship */}
      <InputWrapper
        labelHeading={t.form.willing_price.label}
        error={errors.willing_price?.message}
      >
        <Input
          type="number"
          placeholder="e.g., 300000000"
          {...register('willing_price',{valueAsNumber:true})}
        />
      </InputWrapper>

    </StepWrapper>
  </>
}
