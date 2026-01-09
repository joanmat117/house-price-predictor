import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { useWatch } from "react-hook-form"

export function Step5(){

  const t = useTranslations()

  const {handleSubmit,control,register,formState:{errors}} = useFormPrediction('step5')

  const relationWithProperty = useWatch({ control, name: 'relation_with_property' })

  return <>
  <StepWrapper handleContinue={handleSubmit}>

      {relationWithProperty === "sells" && (
        <>
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
