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
   * Handles user registration.
   * Handles both new registration and "already registered" cases.
   */
  const registerUser = async (formData: UserFormData) => {
    if (!registerToken) return;

    try {
      setIsSubmitting(true);
      const res = await userService.registerUser(formData, registerToken);
      
      // Case 1: Standard Success (User Created)
      if (res && res.token) {
        setAuthToken(res.token);
        setStatus('success');
        redirect();
        return;
      }

      // Case 2: Handled Exception (User already exists)
      if (res && res.detail === "User is already registered.") {
        // If the API sends the token even in this case, use it. 
        // Otherwise, you might need to handle a re-login flow.
        if (res.token) setAuthToken(res.token);
        
        setStatus('success');
        redirect();
      } else {
        throw new Error('Registration failed: Unexpected response');
      }

    } catch (error: any) {
      // Case 3: Error response from Axios/Fetch (e.g., 400 Bad Request)
      const errorDetail = error.response?.data?.detail;
      
      if (errorDetail === "User is already registered.") {
        // Log them in if the error response includes the token
        const recoveredToken = error.response?.data?.token;
        if (recoveredToken) setAuthToken(recoveredToken);
        
        setStatus('success');
        redirect();
      } else {
        console.error('Registration error:', error);
        // Could add a setFormError here to show the message in the UI
      }
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
