import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeSelector } from "./components/ThemeSelector";

export function Header(){
  return <header className="sticky top-0 left-0 w-full bg-background shadow-b border p-2 flex items-center justify-end gap-3 z-20">
    <LanguageSelector/> 
    <ThemeSelector/>
  </header>
}
