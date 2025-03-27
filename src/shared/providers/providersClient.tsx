'use client';

import { SWRConfig } from 'swr';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Suspense, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { useLocalStorage, useReadLocalStorage } from '@undefined/usehooks-ts';
import timeCalculate from '@/entities/User/model/timeCalculate';
import { verifyAuth } from '@/entities/User/model/useIsAnonymous';
import { getUserInfo } from '@/entities/User';
import * as Sentry from '@sentry/react';

export function ProvidersClient({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}) {
  const [AccessToken, setAccessToken] = useLocalStorage<
    | {
        expires_at: Date | undefined;
        issued_at: Date | undefined;
        token: string | undefined;
      }
    | undefined
  >('accessToken', {
    expires_at: undefined,
    token: undefined,
    issued_at: undefined,
  });

  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>(
    'refreshToken',
  );

  useEffect(() => {
    if (AccessToken?.expires_at && AccessToken?.issued_at) {
      if (timeCalculate(new Date(AccessToken?.expires_at))) {
        if (RefreshToken?.token) {
          verifyAuth(RefreshToken?.token).then((response) => {
            if (response.isVerified && response.data) {
              setAccessToken(response.data?.access);
              getUserInfo(response.data?.access.token).then((response) => {
                if (response.statusCode === 200) {
                  if (response.data) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const positionUrl = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`
                      console.log("positionUrl =>",positionUrl);
                      Sentry.setUser({
                        id: response.data?.id ?? 'No id',
                        email: response.data?.email ?? 'No email',
                        username: response.data?.username ?? 'No username',
                        addressUrl: positionUrl,
                      });
                    }, () => {
                      console.log("No position");
                      Sentry.setUser({
                        id: response.data?.id ?? 'No id',
                        email: response.data?.email ?? 'No email',
                        username: response.data?.username ?? 'No username',
                        addressUrl: 'No position',
                      });
                    },{
                      enableHighAccuracy: true,
                      timeout: 5000,
                      maximumAge: 0,
                    });
                  }
                }
              });
            }
          });
        }
      }
    }
    return () => {};
  }, [
    AccessToken?.expires_at,
    AccessToken?.issued_at,
    RefreshToken?.token,
    setAccessToken,
  ]);

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
