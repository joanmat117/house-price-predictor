import { initiateGoogleLogin } from '@/shared/services/googleOAuth';
import { Button } from '@/shared/components/ui/button';
import { useAuthentication } from '../hooks/useAuthentication';

/**
 * Google Login Button Component
 * 
 * Initiates Google OAuth authentication flow when clicked
 */
export function GoogleLoginButton() {
  
  const {isAuthenticated,logOut} = useAuthentication()

  const handleLogin = () => {
    initiateGoogleLogin();
  };

  const handleLogout = () => {
    logOut()
  };

  return (
    <Button
      onClick={isAuthenticated ? handleLogout : handleLogin}
      variant={isAuthenticated ? 'outline' : 'default'}
      size="sm"
    >
      {isAuthenticated ? 'Logout' : 'Google Sign In'}
    </Button>
  );
}
