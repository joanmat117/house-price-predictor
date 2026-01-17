import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '@/shared/services/googleOAuth';
import { useRedirectAfterLogin } from '@/shared/hooks/useRedirectAfterLogin';
import { useAuthentication } from '@/shared/hooks/useAuthentication';

type OAuthStatus = 'loading' | 'needs-registration' | 'error';

export const useGoogleOAuthCallback = () => {
  const navigate = useNavigate();
  const { redirect } = useRedirectAfterLogin();
  const [registerToken,setRegisterToken] = useState<string|null>(null)
  const {setAuthToken} = useAuthentication()

  const [status, setStatus] = useState<OAuthStatus>('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);

        console.log('URL params received from google: ',urlParams)
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          console.log('Auth code: ',code)
          throw new Error('No authorization code received from google');
        }

        const data = await exchangeCodeForToken(urlParams);

        if (!data.token || typeof data.is_registered !== 'boolean') {
          throw new Error('Invalid backend response');
        }

        console.log('Se recibio la data del exchangeCodeForToken: ',data)


        cleanOAuthParamsFromUrl();

        if (data.is_registered) {
          setAuthToken(data.token)
          redirect();
        } else {
          setRegisterToken(data.token)
          setStatus('needs-registration');
        }
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        setStatus('error');
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, redirect]);

  return {
    status,
    needsRegistration: status === 'needs-registration',
    isLoading: status === 'loading',
    registerToken
  };
};

/**
 * Removes OAuth query params from URL
 */
const cleanOAuthParamsFromUrl = () => {
  const url = new URL(window.location.href);
  ['code', 'scope', 'authuser', 'prompt', 'state'].forEach(param =>
    url.searchParams.delete(param)
  );

  window.history.replaceState({}, document.title, url.pathname);
};
