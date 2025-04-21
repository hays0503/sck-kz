// hooks/useSessionChecker.ts
import { useEffect } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import timeCalculate from '@/entities/User/model/timeCalculate';
import { verifyAuth } from '@/entities/User/model/useIsAnonymous';
import { getUserInfo } from '@/entities/User';
import * as Sentry from '@sentry/react';

export function useSessionChecker({
  isLoginPage,
  onSessionExpired,
}: {
  isLoginPage: boolean;
  onSessionExpired: () => void;
}) {
  const [accessToken, setAccessToken] = useLocalStorage<{
    expires_at?: Date;
    issued_at?: Date;
    token?: string;
  } | undefined>('accessToken', undefined);

  const refreshToken = useReadLocalStorage<{ token?: string }>('refreshToken');

  useEffect(() => {
    const expiresAt = accessToken?.expires_at ? new Date(accessToken.expires_at) : null;
    const issuedAt = accessToken?.issued_at ? new Date(accessToken.issued_at) : null;

    const shouldCheck =
      expiresAt &&
      issuedAt &&
      !isNaN(expiresAt.getTime()) &&
      !isNaN(issuedAt.getTime()) &&
      !isLoginPage;

    if (shouldCheck && timeCalculate(expiresAt)) {
      if (refreshToken?.token) {
        verifyAuth(refreshToken.token).then((response) => {
          if (response.isVerified && response.data) {
            setAccessToken(response.data.access);

            getUserInfo(response.data.access.token).then((res) => {
              if (res.statusCode === 200 && res.data) {
                Sentry.setUser({
                  id: res.data.id ?? 'No id',
                  email: res.data.email ?? 'No email',
                  username: res.data.username ?? 'No username',
                  addressUrl: 'No position',
                });
              }
            });
          } else {
            onSessionExpired();
          }
        });
      } else {
        onSessionExpired();
      }
    }
  }, [accessToken?.expires_at, accessToken?.issued_at, refreshToken?.token, setAccessToken, isLoginPage, onSessionExpired]);
}
