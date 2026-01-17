import { UserForm } from '@/features/UserForm';
import { GoogleCallbackLoading } from '@/features/Auth/components/GoogleCallbackLoading';
import { useGoogleAuthFlow } from '@/features/Auth/hooks/useGoogleAuthFlow';

export default function GoogleCallbackPage() {
  const { 
    isLoading, 
    needsRegistration, 
    isSubmitting, 
    registerUser 
  } = useGoogleAuthFlow();

  if (isLoading) {
    return <GoogleCallbackLoading />;
  }

  if (needsRegistration) {
    return (
      <UserForm 
        onSubmit={registerUser} 
        isSubmitting={isSubmitting}
      />
    );
  }

  return null; 
}
