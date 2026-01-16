import { UserForm } from '@/features/UserForm';
import { GoogleCallbackLoading } from '@/features/Auth/components/GoogleCallbackLoading';
import { useGoogleOAuthCallback } from '@/features/Auth/hooks/useGoogleOAuthCallback';

export default function GoogleCallbackPage() {
  const { isLoading, needsRegistration } = useGoogleOAuthCallback();


  if (isLoading) {
    return <GoogleCallbackLoading />;
  }

  if (needsRegistration) {
    return <UserForm />;
  }

  return null;
}

