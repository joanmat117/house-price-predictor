import { useTranslations } from "@/shared/hooks/useTranslations"
import { useFormPrediction } from "../hooks/useFormPrediction"
import { InputWrapper } from "./InputWrapper"
import { StepWrapper } from "./StepWrapper"
import { Input } from "@/shared/components/ui/input"
import {BATHROOMS, PARKING_SPOTS, ROOMS } from "@/config"
import { genArrayRange } from "@/shared/utils/genArrayRange"
import { BoxRadioInputExpansible } from "./BoxRadioInputExpansible"


export function Step2(){
  const t = useTranslations()

  const {handleSubmit,control,setValue,register,formState:{errors}} = useFormPrediction('step2')


    return <>
    <StepWrapper handleContinue={handleSubmit}>
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

      <InputWrapper
      labelHeading={t.form.rooms.label}
      error={errors.rooms?.message}
      >
        {/*<SliderWithIndicator
        min={ROOMS.min}
        max={ROOMS.max}
        control={control}
        name='rooms'
        />*/}
        <BoxRadioInputExpansible
        name="rooms"
        setValue={setValue}
        control={control}
        containsText={false}
        options={genArrayRange(ROOMS.min,ROOMS.max)}
        />
      </InputWrapper>

      <InputWrapper
      labelHeading={t.form.bathrooms.label}
      error={errors.bathrooms?.message}
      >
        {/*<SliderWithIndicator
        min={BATHROOMS.min}
        max={BATHROOMS.max}
        control={control}
        name='bathrooms'
        />*/}
        <BoxRadioInputExpansible
        name="bathrooms"
        control={control}
        setValue={setValue}
        containsText={false}
        options={genArrayRange(BATHROOMS.min,BATHROOMS.max)}
        />

      </InputWrapper>

      <InputWrapper
        labelHeading={t.form.parking_spots.label}
        error={errors.parking_spots?.message}
      >
        {/*<SliderWithIndicator
        min={PARKING_SPOTS.min}
        max={PARKING_SPOTS.max}
        control={control}
        name='parking_spots'
        />*/}
        <BoxRadioInputExpansible
        name="parking_spots"
        setValue={setValue}
        control={control}
        containsText={false}
        options={genArrayRange(PARKING_SPOTS.min,PARKING_SPOTS.max)}
        />
      </InputWrapper>

    </StepWrapper>
  </>
}
