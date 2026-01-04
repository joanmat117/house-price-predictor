import { useEffect, useState } from "react";
import { useLanguage } from "@/shared/hooks/useLanguage";
import esTranslations from '@/shared/i18n/es.json'

export function useTranslations(){
  const {language} = useLanguage()
  const [translations,setTranslations] = useState(esTranslations)

  useEffect(()=>{
    const getTranslations = async()=>{
      const t = await import(`@/shared/i18n/${language}.json`)
      setTranslations(t)
    }

    getTranslations()

  },[language])

  return translations
}
