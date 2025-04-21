'use client';

import { SWRConfig } from 'swr';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Suspense, useEffect, useState } from 'react';
import { Button, Flex, notification } from 'antd';
import { ClockCircleOutlined, LoginOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { useLocalStorage, useReadLocalStorage } from '@undefined/usehooks-ts';
import timeCalculate from '@/entities/User/model/timeCalculate';
import { verifyAuth } from '@/entities/User/model/useIsAnonymous';
import { getUserInfo } from '@/entities/User';
import * as Sentry from '@sentry/react';
import { useGetCityParams } from '../hooks/useGetCityParams';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
  const [api, contextHolder] = notification.useNotification();
  const pathname = usePathname();
  const isLoginPage = /^\/[a-z]{2}\/city\/[^/]+\/login\/?$/.test(
    pathname || '',
  );

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

  const [remindLater, setRemindLater] = useLocalStorage<boolean>(
    'remindLater',
    false,
  );
  const [remindTime, setRemindTime] = useLocalStorage<number>('remindTime', 0);
  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>(
    'refreshToken',
  );
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const cityEn = useGetCityParams();
  const t = useTranslations();

  // Очистка напоминалки по истечению времени
  useEffect(() => {
    if (remindLater && Date.now() < remindTime) return;

    if (Date.now() >= remindTime) {
      setRemindLater(false);
    }
  }, [remindLater, remindTime, setRemindLater]);

  // Проверка истечения сессии
  useEffect(() => {
    if (AccessToken?.expires_at && AccessToken?.issued_at) {
      if (timeCalculate(new Date(AccessToken?.expires_at))) {
        if (RefreshToken?.token) {
          verifyAuth(RefreshToken?.token).then((response) => {
            if (response.isVerified && response.data) {
              setAccessToken(response.data?.access);
              getUserInfo(response.data?.access.token).then((response) => {
                if (response.statusCode === 200 && response.data) {
                  Sentry.setUser({
                    id: response.data?.id ?? 'No id',
                    email: response.data?.email ?? 'No email',
                    username: response.data?.username ?? 'No username',
                    addressUrl: 'No position',
                  });
                }
              });
            } else if (!isLoginPage) {
              setIsSessionExpired(true);
            }
          });
        } else if (!isLoginPage) {
          setIsSessionExpired(true);
        }
      }
    }
  }, [
    AccessToken?.expires_at,
    AccessToken?.issued_at,
    RefreshToken?.token,
    setAccessToken,
    isLoginPage,
  ]);

  // Показываем Notification при истекшей сессии
  useEffect(() => {
    if (isSessionExpired && !isLoginPage && !remindLater) {
      const key = 'session-expired';

      const handleLogin = () => {
        api.destroy(key);
        window.location.href = `/city/${cityEn}/login`;
      };

      const handleRemind = () => {
        const remindInFiveMinutes = Date.now() + 5 * 60 * 1000;
        setRemindLater(true);
        setRemindTime(remindInFiveMinutes);
        api.destroy(key);
      };

      api.info({
        showProgress: true,
        key,
        message: t('sessiya-istekla'),
        description: t('pozhaluista-povtorite-avtorizaciyu'),
        duration: 10, // автоисчезновение через 10 секунд
        placement: 'top',
        actions: (
          <Flex gap={10} vertical style={{ width: '100%',minWidth:320}}>
            <Button
              type='primary'
              icon={<LoginOutlined />}
              style={{ width: '100%' }}
              onClick={handleLogin}
            >
              {t('pereiti-k-avtorizacii')}
            </Button>
            <Button
              style={{ backgroundColor: 'orange', color: 'white' }}
              icon={<ClockCircleOutlined />}
              onClick={handleRemind}
            >
              {t('napomnit-pozhe')}
            </Button>
          </Flex>
        ),
      });
    }
  }, [isSessionExpired, remindLater, isLoginPage, cityEn, t, setRemindLater, setRemindTime, api]);

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>
          <>
            {contextHolder}
            {children}
          </>
        </Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
