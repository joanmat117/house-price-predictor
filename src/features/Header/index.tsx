import { Link } from "react-router-dom";
import { LanguageSelector } from "./components/LanguageSelector";
import { ThemeSelector } from "./components/ThemeSelector";
import { GoogleLoginButton } from "@/shared/components/GoogleLoginButton";
import { useTranslations } from "@/shared/hooks/useTranslations";

export function Header(){
  const t = useTranslations()
  return (
    <header className="fixed top-0 left-0 w-screen shadow-b border rounded-b-md p-2 flex items-center justify-between gap-3 z-20 bg-background border-border">
      <Link to="/" className="text-xl font-extrabold opacity-70">
        {t.header.title}
      </Link>

      <div className="flex items-center gap-3">
        <GoogleLoginButton />
        <LanguageSelector/>
        <ThemeSelector/>
      </div>
    </header>
  );
}
