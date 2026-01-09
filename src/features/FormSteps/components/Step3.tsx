import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import { BoxRadioInputControlled } from "./BoxRadioInputControlled"
import { ComboboxControlled } from "./ComboboxControlled"

export function Step3(){
  const t = useTranslations()

  const {handleSubmit,control,register,formState:{errors}} = useFormPrediction('step3')

  return <>
  <StepWrapper handleContinue={handleSubmit}>

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
