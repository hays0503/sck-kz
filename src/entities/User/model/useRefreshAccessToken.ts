// hooks/useRefreshAccessToken.ts
import { useEffect } from 'react';
import { getUserInfo } from '@/entities/User';
import { verifyAuth } from '@/entities/User/model/useIsAnonymous';
import * as Sentry from '@sentry/react';
import timeCalculate from './timeCalculate';

interface AccessToken {
  expires_at?: Date;
  issued_at?: Date;
  token?: string;
};
interface RefreshToken {
  token?: string;
};

interface UseRefreshAccessTokenProps {
  accessToken?: AccessToken|null;
  refreshToken?: RefreshToken|null;
  isLoginPage: boolean;
  setAccessToken: (token: AccessToken) => void;
  setIsSessionExpired: (value: boolean) => void;
}

export function useRefreshAccessToken({
  accessToken,
  refreshToken,
  isLoginPage,
  setAccessToken,
  setIsSessionExpired,
}: UseRefreshAccessTokenProps) {
  useEffect(() => {
    const refreshIfExpired = async () => {
      if (!accessToken?.expires_at || !accessToken.issued_at) return;

      const isExpired = timeCalculate(new Date(accessToken.expires_at));
      if (!isExpired) return;

      if (!refreshToken?.token) {
        if (!isLoginPage) setIsSessionExpired(true);
        return;
      }

      const response = await verifyAuth(refreshToken.token);
      if (!response.isVerified || !response.data) {
        if (!isLoginPage) setIsSessionExpired(true);
        return;
      }

      setAccessToken(response.data.access);

      const userInfo = await getUserInfo(response.data.access.token);
      if (userInfo.statusCode === 200 && userInfo.data) {
        Sentry.setUser({
          id: userInfo.data.id ?? 'No id',
          email: userInfo.data.email ?? 'No email',
          username: userInfo.data.username ?? 'No username',
          addressUrl: 'No position',
        });
      }
    };

    refreshIfExpired();
  }, [
    accessToken?.expires_at,
    accessToken?.issued_at,
    refreshToken?.token,
    isLoginPage,
    setAccessToken,
    setIsSessionExpired,
  ]);
}
