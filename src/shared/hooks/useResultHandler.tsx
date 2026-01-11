import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";
import { initiateGoogleLogin } from "../services/googleOAuth";
import { useRedirectAfterLogin } from "./useRedirectAfterLogin";

export function useResultHandler(){
  const navigate = useNavigate()
  const {isAuthenticated} = useAuthentication()
  const {setRedirectUrl} = useRedirectAfterLogin()
  
  const handleResult = ()=>{
  if(isAuthenticated) {
    navigate('/results')
  }
  else {
    setRedirectUrl('/results')
    initiateGoogleLogin()
  }
  }

  return {handleResult}
}
