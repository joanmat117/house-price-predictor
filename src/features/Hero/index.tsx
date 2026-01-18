import { useTranslations } from "@/shared/hooks/useTranslations";
import { HeroInputCta } from "./components/HeroInputCta";

export const Hero = () => {
  
  const t = useTranslations()
   

  return (
    <section className={"overflow-hidden mx-auto flex justify-center items-center flex-1"}>
      <div className="container mx-auto">
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
            <span className="mx-auto shadow-lg shadow-green-400/15 flex text-green-600 bg-green-400/20 dark:text-green-500 rounded-full px-3 py-1 items-center justify-center border font-semibold text-sm">
              {t.hero.cost.toUpperCase()}
            </span>
            <h1 className="mx-auto max-w-5xl text-center text-4xl font-[900] text-balance md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <HeroInputCta/> 
              {t.hero.accuracy && (
                <div className="text-xs text-muted-foreground">{t.hero.accuracy}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


