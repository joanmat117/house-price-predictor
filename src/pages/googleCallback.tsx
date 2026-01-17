import { UserForm } from '@/features/UserForm';
import { GoogleCallbackLoading } from '@/features/Auth/components/GoogleCallbackLoading';
import { useGoogleOAuthCallback } from '@/features/Auth/hooks/useGoogleOAuthCallback';

export default function GoogleCallbackPage() {
  const { isLoading, needsRegistration, registerToken} = useGoogleOAuthCallback();


  if (isLoading) {
    return <GoogleCallbackLoading />;
  }

  if (needsRegistration && registerToken) {
    return <UserForm 
    registerToken={registerToken}
    />;
  }

  return null;
}

