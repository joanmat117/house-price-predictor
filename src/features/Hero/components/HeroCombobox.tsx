import { CITIES, SESSION_STORAGE_CITY_KEY } from "@/config";
import { Combobox } from "@/shared/components/Combobox";
import { useTranslations } from "@/shared/hooks/useTranslations";

export function HeroCombobox(){
  const t = useTranslations()

  return <Combobox
  label={t.form.city.label}
  notFound={t.form.city.notFound}
  options={CITIES}
  triggerClassName="border-none flex-1 md:w-sm text-lg h-full shadow-none"
  popoverItemClassName="text-lg"
  onValueChange={(value)=>{
      sessionStorage.setItem(SESSION_STORAGE_CITY_KEY,value)
    }}
  />
}
