import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { useLanguage } from "@/shared/hooks/useLanguage"
import { useTranslations } from "@/shared/hooks/useTranslations"
import type { AvaliableLanguages } from "@/shared/types/AvaliableLanguages"
import { Earth } from "lucide-react"
import { useState } from "react"

export function LanguageSelector() {
  const t = useTranslations()
  const {changeLanguage,language} = useLanguage()
  const [position, setPosition] = useState(language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size='icon' className='aspect-square rounded-full'><Earth className="size-4"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 m-2">
        <DropdownMenuLabel>{t.languageSelector.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={(l)=>{
          changeLanguage(l as AvaliableLanguages)
          setPosition(l as AvaliableLanguages)
        }}>
          <DropdownMenuRadioItem value="en">{t.languageSelector.english}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="es">{t.languageSelector.spanish}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
