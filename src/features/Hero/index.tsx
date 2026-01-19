import { useTranslations } from "@/shared/hooks/useTranslations";
import { HeroInputCta } from "./components/HeroInputCta";
import { Link } from "react-router-dom";

export const Hero = () => {
  
  const t = useTranslations()
   

  return (
    <section className={"overflow-hidden w-full bg-[url(@/assets/hero.webp)] bg-no-repeat bg-cover flex flex-col  flex-1"}>
      <div className=" mx-auto w-full h-full flex-1 flex flex-col justify-center  bg-linear-to-b from-background backdrop-blur-[10px]  backdrop-saturate-200 dark:via-background/90 dark:via-background/40 to-background/40 text-slate-900 dark:text-foreground">
        <div className="flex flex-col w-full gap-5 py-10">
          <div className="relative flex flex-col gap-5 px-3">
            <div
              style={{
                transform: "translate(-50%, -50%)",
              }}
              className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto shadow-lg shadow-primary-400/15 flex text-white bg-primary  rounded-full px-3 py-1 items-center justify-center  font-semibold text-sm">
              {t.hero.cost.toUpperCase()}
            </span>
            <div className="space-y-0">
              <h1 className="mx-auto animate-blurred-fade-in max-w-5xl text-shadow text-shadow-lg text-shadow-black/20 text-center text-4xl font-[900] text-balance md:text-6xl">
                {t.hero.title}
              </h1>
              <h2 className="mx-auto animate-blurred-fade-in max-w-5xl text-shadow text-shadow-lg text-shadow-black/20 text-center text-4xl font-[900] text-balance md:text-6xl">
                {t.hero.subtitle}
              </h2>
            </div>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground font-semibold  md:text-xl">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <HeroInputCta/> 
              {t.hero.accuracy && (
                <div className="text-xs text-muted-foreground px-2 py-1 bg-background rounded-full">{t.hero.accuracy}</div>
              )}
            </div>

            <div className="flex items-center drop-shadow drop-shadow-sm drop-shadow-background/40 justify-center gap-4 pb-4">
              <Link
                to="/terms"
                className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
              >
                {t.hero.terms}
              </Link>
              <Link
                to="/privacy-terms"
                className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
              >
                {t.hero.privacy}
              </Link>
              <Link
                to="/credits"
                className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
              >
                {t.hero.credits}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


