import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "@/shared/hooks/useTranslations";
import { Link } from "react-router-dom";

export default function NotFound(){
  const t = useTranslations()
  return <>
    <section className="">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-foreground md:text-4xl">{t.notfound.title}</p>
            <p className="mb-4 text-lg font-light text-muted-foreground">{t.notfound.description}</p>
          <Link to='/'>  
          <Button variant={'outline'}>
            {t.notfound.button}
          </Button>
          </Link>
        </div>   
    </div>
    </section>
  </>
}
