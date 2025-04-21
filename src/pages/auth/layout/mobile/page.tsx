'use client';

import getUsersBasket from '@/entities/Basket/api/getUsersBasket';
import { iBasket } from '@/shared/types/basket';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { getUserInfo } from '@/entities/User';

const AuthPage = () => {
  const searchParams = useSearchParams();
  const [callbackUrl, , removeCallbackUrl] = useLocalStorage<{
    url: string | undefined;
  }>('callbackUrl', { url: undefined });
  const [, setAccessToken] = useLocalStorage('accessToken', { token: '' });
  const [, setRefreshToken] = useLocalStorage('refreshToken', { token: '' });
  const [, setUuid] = useLocalStorage('uuid_id', '');
  const [parameters] = useLocalStorage<{
    locale: undefined | string;
    city: undefined | string;
  }>('parameters', { locale: undefined, city: undefined });
  const router = useRouter();
  useEffect(() => {
    // debugger;
    const accessTokenData = searchParams?.get('accessTokenData');
    const refreshTokenData = searchParams?.get('refreshTokenData');
    if (accessTokenData && refreshTokenData) {
      setAccessToken({ token: accessTokenData });
      setRefreshToken({ token: refreshTokenData });
      getUsersBasket(accessTokenData).then((data: iBasket) => {
        if (data?.uuid_id) {
          setUuid(data?.uuid_id);
        }
      });
    }
    if (callbackUrl?.url) {
      const url = callbackUrl?.url;
      removeCallbackUrl();
      router.replace(url);
    } else {
      if (accessTokenData && typeof accessTokenData === 'string') {
        getUserInfo(accessTokenData).then((data) => {
          if (data?.data?.id) {
            const url = `/${parameters.locale}/city/${parameters.city}/profile/${data?.data?.id}`;
            router.replace(url);
          }
        });
      }
    }
  }, [
    callbackUrl?.url,
    parameters.city,
    parameters.locale,
    removeCallbackUrl,
    router,
    searchParams,
    setAccessToken,
    setRefreshToken,
    setUuid,
  ]);
  return <>Save Token</>;
};

export default AuthPage;
