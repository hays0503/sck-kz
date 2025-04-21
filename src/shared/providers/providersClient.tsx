'use client';

import { SWRConfig } from 'swr';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Suspense, useState } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { useGetCityParams } from '../hooks/useGetCityParams';
import { usePathname } from 'next/navigation';
import { useSessionReminder } from '@/entities/User/model/useSessionReminder';
import { useRefreshAccessToken } from '@/entities/User/model/useRefreshAccessToken';

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
  const pathname = usePathname();


  const [AccessToken, setAccessToken] = useLocalStorage<
    | {
        expires_at?: Date;
        issued_at?: Date;
        token?: string;
      }
    | undefined
  >('accessToken', {
    expires_at: undefined,
    issued_at: undefined,
    token: undefined,
  });

  const RefreshToken = useReadLocalStorage<{ token?: string }>('refreshToken');
  const isLoginPage = /^\/[a-z]{2}\/city\/[^/]+\/login\/?$/.test(
    pathname || '',
  );
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const cityEn = useGetCityParams();

  useRefreshAccessToken({
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    isLoginPage,
    setAccessToken,
    setIsSessionExpired,
  });

  const sessionNotification = useSessionReminder({
    isSessionExpired,
    isLoginPage,
    cityEn,
  });

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>
          <>
            {sessionNotification}
            {children}
          </>
        </Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
