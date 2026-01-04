
import { cn } from "@/lib/utils";

import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "@/shared/hooks/useTranslations";
import heroImage from '@/assets/hero.jpg'
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  
  const t = useTranslations()
   

  return (
    <section className={cn("overflow-hidden py-15")}>
      <div className="container mx-auto">
        <div className="flex flex-col w-full gap-5">
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
            <h2 className="mx-auto max-w-5xl text-center text-3xl font-extrabold text-balance md:text-6xl">
              {t.hero.title}
            </h2>
            <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
              <Button size="lg" variant={'default'} asChild>
                <Link to={'/predict'}>
                  {t.hero.cta.button} <Calculator className="size-4"/> 
                </Link>
              </Button>
              {t.hero.accuracy && (
                <div className="text-xs text-muted-foreground">{t.hero.accuracy}</div>
              )}
            </div>
          </div>
          <img
            src={heroImage}
            alt={'Imagen de Financiación, La construcción de viviendas y Para construir.'}
            className="mx-auto h-full max-h-[524px] w-full max-w-5xl md:rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};


