import { useEffect, useState } from "react";
import { getAuthToken } from "../utils/getAuthToken";

export function useAuthentication(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);    

  useEffect(()=>{
    const tokenValue = getAuthToken()

    setIsAuthenticated(Boolean(tokenValue))
  },[])

  const logOut = ()=>{
    if(isAuthenticated){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_registered');
    setIsAuthenticated(false);
    }
  }

  return {isAuthenticated,getAuthToken,logOut}
}
