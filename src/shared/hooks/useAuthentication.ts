import Cookies from 'js-cookie'
import { useState, useCallback } from 'react' 

const AUTH_COOKIE_NAME = 'auth_token'

export function useAuthentication() {
  const [authToken, setAuthTokenState] = useState<string | undefined>(() => {
    return Cookies.get(AUTH_COOKIE_NAME)
  })

  const getAuthToken = useCallback(() => {
    return authToken
  }, [authToken])

  const setAuthToken = useCallback((token: string) => {
    try {
      Cookies.set(AUTH_COOKIE_NAME, token, {
        path: '/',
        secure: true,
        sameSite: 'lax',
        domain: window.location.hostname,
        expires: 50 / (24 * 60)
      })
      setAuthTokenState(token) 
    } catch(e) {
      console.log('Error while setting AuthToken on cookies: ', e)
      throw new Error('Error setting AuthToken')
    }
  }, [])

  const removeAuthToken = useCallback(() => {
    Cookies.remove(AUTH_COOKIE_NAME, {
      path: '/',
      domain: window.location.hostname
    })
    setAuthTokenState(undefined) 
  }, [])

  const isAuthenticated = !!authToken

  return { isAuthenticated, getAuthToken, removeAuthToken, setAuthToken, authToken }
}
