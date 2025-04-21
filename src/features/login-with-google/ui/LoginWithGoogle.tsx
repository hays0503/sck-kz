'use client';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import useLoginWithGoogle from '../model/useLoginWithGoogle';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex } from 'antd';

export default function LoginWithGoogle({
  callbackUrl,
}: {
  callbackUrl: string | undefined;
}) {
  const url = useLoginWithGoogle() ?? '';
  const [, setParameter] = useLocalStorage<{
    locale: undefined | string;
    city: undefined | string;
  }>('parameters', { locale: undefined, city: undefined });
  const [, setCallbackUrl] = useLocalStorage<{ url: string | undefined }>(
    'callbackUrl',
    { url: callbackUrl },
  );
  const locale = useLocale();
  const city = useGetCityParams();
  useEffect(() => {
    setCallbackUrl({ url: callbackUrl });
    setParameter({
      locale,
      city,
    });
  }, [callbackUrl, city, locale, setCallbackUrl, setParameter]);
  return (
    <Flex style={{ padding: '10px', backgroundColor: '#9292921A' }}>
      {url ? (
        <Link href={url} prefetch={true}>
          <Image
            priority={true}
            width={32}
            height={32}
            src='/google.png'
            alt='GoogleAuth'
          />
        </Link>
      ) : (
        <button disabled>
          <Image
            priority={true}
            width={32}
            height={32}
            src='/google.png'
            alt='GoogleAuth'
          />
          {/* Add a loading spinner or text if desired */}
        </button>
      )}
    </Flex>
  );
}
