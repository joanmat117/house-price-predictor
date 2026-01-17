import { Link } from "react-router-dom";
import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeSelector } from "./components/ThemeSelector";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { LogOutBtn } from "./components/LogOutBtn";

export function Header(){
  const t = useTranslations()
  return (
    <header className="fixed top-0 left-0 w-screen rounded-b-md p-2 flex items-center justify-between gap-3 z-20 bg-background/70 backdrop-blur-[30px]">
      <Link to="/" className="text-lg line-clamp-1 md:text-xl font-extrabold ">
        {t.header.title}
      </Link>

      <div className="flex items-center gap-3">
        {/*<GoogleLoginButton />*/}
        <LogOutBtn/>
        <LanguageSelector/>
        <ThemeSelector/>
      </div>
    </header>
  );
}
