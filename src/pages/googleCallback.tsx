import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '@/shared/services/googleOAuth';
import { UserForm } from '@/features/UserForm';
import { Loader } from '@/shared/components/icons/Loader';
import { useTranslations } from '@/shared/hooks/useTranslations';

/**
 * Google OAuth Callback Page
 * 
 * Handles the OAuth callback from Google by:
 * 1. Extracting all OAuth parameters from URL
 * 2. Exchanging the authorization code with backend for JWT token
 * 3. Storing the token and redirecting to home
 */
export default function GoogleCallback() {
  const navigate = useNavigate();
  const t = useTranslations()
  const [isLogin,setIsLogin] = useState(false)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setIsLogin(true)
        // Extract all URL parameters from Google's callback
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange authorization code with backend for JWT token
        const data = await exchangeCodeForToken(urlParams);

        // Log the server response
        console.log('Server response:', data);

        // Validate response contains required fields
        if (!data.token || typeof data.is_registered !== 'boolean') {
          throw new Error('Invalid response from backend');
        }

        // Store JWT in localStorage for API calls
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('is_registered', String(data.is_registered));

        // Clean up URL by removing OAuth parameters
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('code');
        newUrl.searchParams.delete('scope');
        newUrl.searchParams.delete('authuser');
        newUrl.searchParams.delete('prompt');
        window.history.replaceState({}, document.title, newUrl.pathname);

      } catch (err) {
        console.error('OAuth callback error:', err);

        // Redirect to home with error state
        navigate('/', { replace: true });
      } finally {
        setIsLogin(false)
      }
    };

    handleCallback();
  }, [navigate]);
  return <>
    {isLogin &&
    <div className="min-h-screen flex flex-col justify-center items-center justify-center bg-background">
        <Loader className='size-12 my-4'/>
        <h2 className="text-2xl font-semibold mb-2">{t.signIn.title}</h2>
        <p className="text-muted-foreground">{t.signIn.description}</p>
    </div>
    }
    {!isLogin &&
    <UserForm/>
    }
  </>
}
