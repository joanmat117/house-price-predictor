import { useMemo, useState } from "react";

export function getAuthToken(){
  return localStorage.getItem('auth_token')
}

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
