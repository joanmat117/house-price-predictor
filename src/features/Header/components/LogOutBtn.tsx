import { Button } from "@/shared/components/ui/button";
import { useAuthentication } from "@/shared/hooks/useAuthentication";
import { useTranslations } from "@/shared/hooks/useTranslations";

export function LogOutBtn(){
  const {isAuthenticated,removeAuthToken} = useAuthentication()

  const t = useTranslations()

  return <> 
  {isAuthenticated &&
    <Button 
        onClick={()=>removeAuthToken()}
        variant='outline'>
      {t.oauth.logOut}
    </Button>}
  </>
}
