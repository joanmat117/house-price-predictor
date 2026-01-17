import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '@/shared/services/googleOAuth';
import { userService } from '@/shared/services/userService';
import { useRedirectAfterLogin } from '@/shared/hooks/useRedirectAfterLogin';
import { useAuthentication } from '@/shared/hooks/useAuthentication';
import type { UserFormData } from '@/shared/schemas/UserSchema';

type FlowStatus = 'loading' | 'needs-registration' | 'error' | 'success';

export const useGoogleAuthFlow = () => {
  const navigate = useNavigate();
  const { redirect } = useRedirectAfterLogin();
  const { setAuthToken } = useAuthentication();
  
  const [status, setStatus] = useState<FlowStatus>('loading');
  const [registerToken, setRegisterToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to track if the OAuth exchange has already started (prevents React 18 double-call)
  const initializationRef = useRef(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Prevent double execution in Strict Mode
      if (initializationRef.current) return;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      // If no code and no error, likely a re-render after cleanup
      if (!code && !error) return;

      // Mark as started immediately
      initializationRef.current = true;

      try {
        if (error) throw new Error(error);
        if (!code) throw new Error('No authorization code received');

        const data = await exchangeCodeForToken(urlParams);
        
        // Clean URL to prevent pollution
        window.history.replaceState({}, document.title, window.location.pathname);

        if (data.is_registered && data.token) {
          // User exists, log them in directly
          setAuthToken(data.token);
          setStatus('success');
          redirect();
        } else if (data.token) {
          // User needs registration, store token locally for the next step
          setRegisterToken(data.token);
          setStatus('needs-registration');
        } else {
          throw new Error('Invalid server response');
        }
      } catch (err) {
        console.error('OAuth Error:', err);
        setStatus('error');
        navigate('/', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [navigate, redirect, setAuthToken]);

  /**
   * Handles user registration using the stored token.
   * This is a closure, so it has access to 'registerToken' without passing it as a prop.
   */
  const registerUser = async (formData: UserFormData) => {
    if (!registerToken) return;

    try {
      setIsSubmitting(true);
      const res = await userService.registerUser(formData, registerToken);
      
      if (typeof res === 'string') {
        setAuthToken(res);
        setStatus('success');
        redirect();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Optional: Add logic here to trigger a toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    status,
    isLoading: status === 'loading',
    needsRegistration: status === 'needs-registration',
    isSubmitting,
    registerUser,
  };
};
