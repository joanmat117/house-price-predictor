import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { ANTIQUITY, STRATA } from "@/config"
import { ComboboxControlled } from "./ComboboxControlled"
import { genArrayRange } from "@/shared/utils/genArrayRange"

export function Step3(){
  const t = useTranslations()

  const {handleSubmit,control,formState:{errors}} = useFormPrediction('step3')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

      <InputWrapper
      labelHeading={t.form.strata.label}
      error={errors.strata?.message}
      >
        {/*<SliderWithIndicator
        name='strata'
        control={control}
        max={STRATA.max}
        min={STRATA.min}
        />*/}
        <ComboboxControlled
        options={genArrayRange(STRATA.min,STRATA.max)}
        control={control}
        name="strata"
        label={t.form.strata.label}
        notFound={''}
        />
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.antiquity.label}
      error={errors.antiquity?.message}
      >
        {/*<SliderWithIndicator
        name='antiquity'
        control={control}
        max={ANTIQUITY.max}
        min={ANTIQUITY.min}
        />*/}
        <BoxRadioInputControlled
        name="antiquity"
        optionsTranslation={t.enums.antiquity}
        control={control}
        options={genArrayRange(ANTIQUITY.min,ANTIQUITY.max)}
        containsText={true}
        />
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.has_sauna_jacuzzi_or_turkish_bath.label}
      error={errors.has_sauna_jacuzzi_or_turkish_bath?.message}
      >
        <BoxRadioInputControlled
        name="has_sauna_jacuzzi_or_turkish_bath"
        control={control}
        options={["true", "false"]}
        optionsTranslation={{"true": t.buttons.yes, "false": t.buttons.no}}
        valueType="boolean"
        />
      </InputWrapper>

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
