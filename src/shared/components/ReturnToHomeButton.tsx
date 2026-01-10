import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CornerLeftUp } from "lucide-react";
import { useTranslations } from "../hooks/useTranslations";

export function ReturnToHomeButton(){
  
  const t = useTranslations()

  return <Link to='/' >
    <Button variant={'outline'} size='sm' >
      <CornerLeftUp className='size-4'/>
      {t.buttons.out}
    </Button>
  </Link>
}
