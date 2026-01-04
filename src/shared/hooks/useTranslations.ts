import { useEffect, useState } from "react";
import { useLanguage } from "./useLanguage";
import esTranslations from '@/shared/i18n/es.json'

export function useTranslations(){
  const {language} = useLanguage()
  const [_translations,setTranslations] = useState(esTranslations)
  
  useEffect(()=>{
    const getTranslations = async()=>{
      const t = await import(`@/shared/i18n/${language}.json`)
      setTranslations(t)
    }

    getTranslations()

  },[language])

  return esTranslations
}
