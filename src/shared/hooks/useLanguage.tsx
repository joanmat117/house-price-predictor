import {useState } from "react"
import type { AvaliableLanguages } from "@/shared/types/AvaliableLanguages"
import { useNavigate } from "react-router-dom"

const storedLangKey = 'user-lang'

export function useLanguage(){

  const navigate = useNavigate()

  const [language,setLanguage] = useState<AvaliableLanguages>(()=>localStorage.getItem(storedLangKey) as AvaliableLanguages || 'es')

  const changeLanguage = (newLang:AvaliableLanguages)=>{
    setLanguage(newLang)
    localStorage.setItem(storedLangKey,newLang)
    navigate(0)
  }
  

  return {language,changeLanguage}

}
