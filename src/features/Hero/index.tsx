
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCombobox } from "./components/HeroCombobox";

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
            <span className="mx-auto flex text-green-600 bg-green-400/20 dark:text-green-500 rounded-full px-3 py-1 items-center justify-center border font-semibold text-sm">
              {t.hero.cost.toUpperCase()}
            </span>
            <h1 className="mx-auto max-w-5xl text-center text-4xl font-extrabold text-balance md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <article className="flex min-w-[300px] md:min-w-[500px] px-1 md:px-2 gap-1 md:gap-2 items-center border border-border bg-background rounded-md" >
              <HeroCombobox/>
              <Button size='lg' variant={'default'} className="my-1 md:my-2 text-lg" asChild>
                <Link to={'/predict'}>
                  {t.hero.cta.button} <Calculator className="size-4"/> 
                </Link>
              </Button>
              </article>
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


