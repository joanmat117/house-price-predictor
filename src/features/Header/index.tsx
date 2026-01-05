import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeSelector } from "./components/ThemeSelector";

export function Header(){
  return <header className="fixed top-0 left-0 w-screen bg-background shadow-b border rounded-b-md p-2 flex items-center justify-end gap-3 z-20">
    <LanguageSelector/> 
    <ThemeSelector/>
  </header>
}
