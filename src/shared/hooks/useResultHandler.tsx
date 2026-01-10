import { useNavigate } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";
import { initiateGoogleLogin } from "../services/googleOAuth";

export function useResultHandler(){
  const navigate = useNavigate()
  const {isAuthenticated} = useAuthentication()
  
  const handleResult = ()=>{
  if(isAuthenticated) {
    navigate('/results')
  }
  else {
    initiateGoogleLogin()
  }
  }

  return {handleResult}
}
