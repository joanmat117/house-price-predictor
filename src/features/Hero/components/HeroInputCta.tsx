import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroInputCta(){

  const t = useTranslations()

  return <Link to={'/predict'}>
      <article aria-disabled={true} className="flex min-w-[300px] md:min-w-[500px] px-1 md:px-2 gap-1 md:gap-2 items-center border border-border bg-background rounded-xl pointer-events-none shadow shadow-lg shadow-primary/5" >
        <Input 
        className="border-none shadow-none"
        placeholder={t.form.location.label} />
        <Button size='lg' variant={'default'} className="my-1 md:my-2 text-lg" >
          {t.hero.cta.button} <Calculator className="size-4"/> 
        </Button>
      </article>
    </Link>
}
