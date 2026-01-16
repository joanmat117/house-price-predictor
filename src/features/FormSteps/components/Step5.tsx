import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { useWatch } from "react-hook-form"
import { BUYING_MOTIVES, PROPERTY_STATUSES, SELLING_MOTIVES } from "@/config"
import { NumberInputControlled } from "./NumberInputControlled"

export function Step5(){

  const t = useTranslations()

  const {handleSubmit,control,formState:{errors}} = useFormPrediction('step5')

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
            options={PROPERTY_STATUSES}
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
            options={SELLING_MOTIVES}
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
          options={BUYING_MOTIVES}
          optionsTranslation={t.enums.buyingMotives}
          />
        </InputWrapper>
      )}

      <InputWrapper
      labelHeading={t.form.willing_price.label}
      error={errors.willing_price?.message}
      >
        <NumberInputControlled
          thousandSeparator={','}
          prefix="$ "
          suffix=" COP"
          stepper={1000000}
          placeholder="$ 300,000,000 COP"
          name="willing_price"
          control={control}
        />
      </InputWrapper>

   </StepWrapper>
  </>
}
