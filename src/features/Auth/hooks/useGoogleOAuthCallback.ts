import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '@/shared/services/googleOAuth';
import { useRedirectAfterLogin } from '@/shared/hooks/useRedirectAfterLogin';

type OAuthStatus = 'loading' | 'needs-registration' | 'error';

export const useGoogleOAuthCallback = () => {
  const navigate = useNavigate();
  const { redirect } = useRedirectAfterLogin();

  const [status, setStatus] = useState<OAuthStatus>('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);

        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        const data = await exchangeCodeForToken(urlParams);

        if (!data.token || typeof data.is_registered !== 'boolean') {
          throw new Error('Invalid backend response');
        }

        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_registered', String(data.is_registered));

        cleanOAuthParamsFromUrl();

        if (data.is_registered) {
          redirect();
        } else {
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
