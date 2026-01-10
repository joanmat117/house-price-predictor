import { useNavigate } from "react-router-dom"

const REDIRECT_URL_STORAGE_KEY = 'redirect-after-login-url'

export function useRedirectAfterLogin(){

  const navigate = useNavigate()

  const getRedirectUrl = ()=>{
    return localStorage.getItem(REDIRECT_URL_STORAGE_KEY) || '/'
  }
  
  const redirect = ()=>{
    navigate(getRedirectUrl(),{replace:true}) 
    localStorage.removeItem(REDIRECT_URL_STORAGE_KEY)
  }

  const setRedirectUrl = (url:string)=>{
    console.log('Se seteo una redirect url')
    localStorage.setItem(REDIRECT_URL_STORAGE_KEY,url)
  }

  return {
    setRedirectUrl,
    redirect,
    getRedirectUrl
  }
}
