import { useMemo, useState } from "react";
import { getAuthToken } from "../utils/getAuthToken";

export function useAuthentication(){
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken())

  const authToken = useMemo(()=>{
    return getAuthToken()
  },[isAuthenticated])

  const logOut = ()=>{
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_registered');
    setIsAuthenticated(false);
  }

  return {isAuthenticated,authToken,logOut}
}
