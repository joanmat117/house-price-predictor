import { useEffect, useState } from "react"
import type { AvaliableLanguages } from "@/shared/types/AvaliableLanguages"
import {AVALIABLE_LANGUAGES} from '@/config'

const storedLangKey = 'user-lang'

export function useLanguage(){
  const [language,setLanguage] = useState<AvaliableLanguages>('en')

  useEffect(()=>{
    const detectLanguage = ()=>{

      const savedLang = localStorage.getItem(storedLangKey)

      if(savedLang && AVALIABLE_LANGUAGES.includes(savedLang)){
        setLanguage(savedLang as AvaliableLanguages)
        return
      }

      const browserLang = navigator.language.split('-')[0].toLowerCase()

      const detectedLang = AVALIABLE_LANGUAGES.includes(browserLang)? browserLang as AvaliableLanguages : 'en'

      setLanguage(detectedLang)
      localStorage.setItem(storedLangKey,detectedLang)
    }

    detectLanguage()
  },[])

  const changeLanguage = (newLang:AvaliableLanguages)=>{
    setLanguage(newLang)
    localStorage.setItem(storedLangKey,newLang)
  }

  return {language,changeLanguage}

}
