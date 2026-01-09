/**
 * Google OAuth Service
 * 
 * Handles Google OAuth authentication flow.
 * Frontend redirect URI: http://localhost:5173/google/callback
 * Backend exchanges the code for JWT token
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const getGoogleOAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/google/callback`,
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

/**
 * Initiates Google OAuth login by redirecting to Google
 */
export const initiateGoogleLogin = (): void => {
  const oauthUrl = getGoogleOAuthUrl();
  window.location.href = oauthUrl;
};

/**
 * Exchanges authorization code with backend for JWT token
 */
export const exchangeCodeForToken = async (urlParams: URLSearchParams): Promise<{
  token: string;
  is_registered: boolean;
}> => {
  const response = await fetch(
    `/api/google/callback?${urlParams.toString()}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    throw new Error(`Backend authentication failed: ${response.status}`);
  }

  return response.json();
};
