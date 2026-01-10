import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '@/shared/services/googleOAuth';
import { useRedirectAfterLogin } from '@/shared/hooks/useRedirectAfterLogin';

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
  const {redirect} = useRedirectAfterLogin()

  useEffect(() => {
    const handleCallback = async () => {
      try {
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

        redirect()
      } catch (err) {
        console.error('OAuth callback error:', err);

        // Redirect to home with error state
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Signing you in...</h2>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}
