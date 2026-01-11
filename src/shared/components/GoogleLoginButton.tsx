import { initiateGoogleLogin } from '@/shared/services/googleOAuth';
import { Button } from '@/shared/components/ui/button';
import { useAuthentication } from '../hooks/useAuthentication';
import { Google } from './icons/Google';
import { LogOut } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

/**
 * Google Login Button Component
 * 
 * Initiates Google OAuth authentication flow when clicked
 */
export function GoogleLoginButton() {
  
  const {isAuthenticated,logOut} = useAuthentication()
  const t = useTranslations()

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
      {isAuthenticated ? <LogOut/> : <Google/>}
      <span>
        {isAuthenticated ? t.oauth.logOut : t.oauth.signIn }
      </span>
    </Button>
  );
}
