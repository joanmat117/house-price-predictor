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
import { useTheme, type Theme } from "@/shared/contexts/ThemeProvider"
import { useTranslations } from "@/shared/hooks/useTranslations"
import { Monitor, Moon, Sun } from "lucide-react"
import { useState } from "react"

export function ThemeSelector() {
  const t = useTranslations()
  const {theme,setTheme} = useTheme()
  const [position, setPosition] = useState(theme)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='aspect-square'>

        {position === 'light' && <Sun className='size-4'/>}
        {position === 'dark' && <Moon className='size-4' />}
        {position === 'system' && <Monitor className='size-4'/>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.themeSelector.title}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuRadioGroup value={position} onValueChange={(newTheme)=>{
          setTheme(newTheme as Theme)
          setPosition(newTheme as Theme)
        }}>
          <DropdownMenuRadioItem value="dark">{t.themeSelector.dark}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">{t.themeSelector.light}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">{t.themeSelector.system}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
