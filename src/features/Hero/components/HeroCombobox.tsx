import { CITIES } from "@/config";
import { Combobox } from "@/shared/components/Combobox";
import { useFormFieldsStore } from "@/shared/hooks/useFormFieldsStore";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { toSnakeCase } from "@/shared/utils/toSnakeCase";
import { useState } from "react";

export function HeroCombobox(){

  const [value,setValue] = useState('')
  const {addFields} = useFormFieldsStore()

  const t = useTranslations()

  return <Combobox
  label={t.form.city.label}
  notFound={t.form.city.notFound}
  options={CITIES.map(toSnakeCase)}
  optionsTranslation={t.enums.cities}
  triggerClassName="border-none flex-1 md:w-sm text-lg h-full shadow-none"
  popoverItemClassName="text-lg"
  value={value}
  onValueChange={(value)=>{
      setValue(value)
      addFields({
        city:value
      })
    }}
  />
}
