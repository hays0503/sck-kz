'use client';

import { SWRConfig } from 'swr';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Suspense, useEffect, useState } from 'react';
import { Flex, Modal, Button, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import '@ant-design/v5-patch-for-react-19';
import { useLocalStorage, useReadLocalStorage } from '@undefined/usehooks-ts';
import timeCalculate from '@/entities/User/model/timeCalculate';
import { verifyAuth } from '@/entities/User/model/useIsAnonymous';
import { getUserInfo } from '@/entities/User';
import * as Sentry from '@sentry/react';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '../hooks/useGetCityParams';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ClockCircleOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;

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
  const isLoginPage = /^\/[a-z]{2}\/city\/[^/]+\/login\/?$/.test(pathname || '');

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

  const [remindLater, setRemindLater] = useLocalStorage<boolean>('remindLater', false);
  const [remindTime, setRemindTime] = useLocalStorage<number>('remindTime', 0);
  const [isModalVisible, setIsModalVisible] = useState(true); // Add state for modal visibility

  const cityEn = useGetCityParams();
  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>('refreshToken');
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const t = useTranslations();

  const handleRemindLater = () => {
    const remindInFiveMinutes = Date.now() + 5 * 60 * 1000; // Set to 5 minutes from now
    setRemindLater(true);
    setRemindTime(remindInFiveMinutes);
    setIsModalVisible(false); // Close the modal when the button is clicked
  };

  useEffect(() => {
    // If 'remindLater' is true, don't show the modal
    if (remindLater && Date.now() < remindTime) {
      setIsModalVisible(false);
      return;
    }

    // Reset reminder after 5 minutes or if it's expired
    if (Date.now() >= remindTime) {
      setRemindLater(false); 
      setIsModalVisible(true);
    }
  }, [remindLater, remindTime]);

  useEffect(() => {
    if (AccessToken?.expires_at && AccessToken?.issued_at) {
      if (timeCalculate(new Date(AccessToken?.expires_at))) {
        if (RefreshToken?.token) {
          verifyAuth(RefreshToken?.token).then((response) => {
            if (response.isVerified && response.data) {
              setAccessToken(response.data?.access);
              getUserInfo(response.data?.access.token).then((response) => {
                if (response.statusCode === 200 && response.data) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const positionUrl = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`;
                      Sentry.setUser({
                        id: response.data?.id ?? 'No id',
                        email: response.data?.email ?? 'No email',
                        username: response.data?.username ?? 'No username',
                        addressUrl: positionUrl,
                      });
                    },
                    () => {
                      Sentry.setUser({
                        id: response.data?.id ?? 'No id',
                        email: response.data?.email ?? 'No email',
                        username: response.data?.username ?? 'No username',
                        addressUrl: 'No position',
                      });
                    },
                    {
                      enableHighAccuracy: true,
                      timeout: 5000,
                      maximumAge: 0,
                    },
                  );
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

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
        <AnimatePresence>
          {isSessionExpired && !isLoginPage && isModalVisible && ( // Check for modal visibility
            <Modal
              open={isModalVisible}
              closable={false}
              footer={null}
              centered
              maskClosable={false}
              styles={{
                content: {
                  backgroundColor: '#efefef',
                },
                mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              }}
              modalRender={(modal) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {modal}
                </motion.div>
              )}
            >
              <Flex
                vertical
                align='center'
                justify='center'
                style={{ backgroundColor: '#efefef' }}
              >
                <Image
                  src={'/sessiontimeout.png'}
                  width={250}
                  height={250}
                  alt='sessiontimeout'
                />
                <Title level={2}>{t('sessiya-istekla')}</Title>
                <Text>{t('pozhaluista-povtorite-avtorizaciyu')}</Text>
                <Flex gap={10} align='center' justify='center' style={{ width: '100%' }}>
                  <Link href={`/city/${cityEn}/login`}>
                    <Button type='primary'>
                      <Text style={{ color: 'white' }}>{t('pereiti-k-avtorizacii')}</Text>
                    </Button>
                  </Link>
                  <Button
                    style={{
                      backgroundColor: 'orange',
                    }}
                    type='primary'
                    icon={<ClockCircleOutlined />}
                    onClick={handleRemindLater}
                  >
                    <Text style={{ color: 'white' }}>{t('napomnit-pozhe')}</Text>
                  </Button>
                </Flex>
              </Flex>
            </Modal>
          )}
        </AnimatePresence>
      </NuqsAdapter>
    </SWRConfig>
  );
}
