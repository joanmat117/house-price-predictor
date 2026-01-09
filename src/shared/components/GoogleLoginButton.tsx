import { initiateGoogleLogin } from '@/shared/services/googleOAuth';
import { Button } from '@/shared/components/ui/button';
import { useEffect, useState } from 'react';

/**
 * Google Login Button Component
 * 
 * Initiates Google OAuth authentication flow when clicked
 */
export function GoogleLoginButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    initiateGoogleLogin();
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_registered');
    setIsAuthenticated(false);
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
