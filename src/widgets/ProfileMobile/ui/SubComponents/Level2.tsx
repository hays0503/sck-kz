import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { UserInfo } from '@/shared/types/user';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import IconLikeIOS from '@/shared/ui/IconLikeIOS/IconLikeIOS';
import { Watermark } from 'antd';
import ElementList from './ElementList';
import dynamic from 'next/dynamic';

// const LastViewedList = lazy(() =>
//   import('./LastViewedList').then((module) => ({ default: module.default })),
// );

const LastViewedList = dynamic(() => import('./LastViewedList'), { ssr: false });

interface Level2Props {
  readonly IsAnonymous: boolean | undefined;
  readonly infoUser: UserInfo | null;
}

const Level2: React.FC<Level2Props> = (props) => {
  const isGuest = props.IsAnonymous;
  const uuid_id = useReadLocalStorage<string | undefined | null>('uuid_id');
  const accessToken = useReadLocalStorage<{
    user_id: string | undefined | null;
  }>('accessToken');

  const currentCity = useGetCityParams();
  const t = useTranslations('Level2');
  const refreshToken = useReadLocalStorage<{ token: string }>('refreshToken');

  return (
    <Flex vertical={true} gap={10} align='center' style={{ width: '100%' }}>
      <ElementList
        title={t('istoriya-zakazov')}
        href={`/city/${currentCity}/order-history/${refreshToken?.token}`}
        disabled={isGuest}
        icon={<IconLikeIOS ionicons src='cube-outline' color='#ffba06' />}
      />
      <ElementList
        title={t('izbrannye-tovary')}
        href={`/city/${currentCity}/featured-products`}
        disabled={false}
        icon={<IconLikeIOS ionicons src='heart-outline' color='#37bd2b' />}
      />
      <ElementList
        title={t('otzyvy')}
        href={`/city/${currentCity}/reviews-user/${accessToken?.user_id}`}
        disabled={isGuest}
        icon={<IconLikeIOS ionicons src='chatbox-outline' color='#3baad0' />}
      />
      <Watermark
        gap={[10, 10]}
        rotate={-10}
        content={'В разработке'}
        style={{ width: '100%' }}
      >
        <ElementList
          title={t('sravnenie-tovarov')}
          href={`/city/${currentCity}/main`}
          disabled={true}
          icon={<IconLikeIOS src='/scales.svg' color='red' />}
        />
      </Watermark>
      <Watermark
        gap={[10, 10]}
        rotate={-10}
        content={'В разработке'}
        style={{ width: '100%' }}
      >
        <ElementList
          title={t('nastroi-ki')}
          href={`/city/${currentCity}/main`}
          disabled={true}
          icon={<IconLikeIOS ionicons src='settings-outline' color='#37bd2b' />}
        />
      </Watermark>
      <ElementList
        title={t('vykhod')}
        href={`/city/${currentCity}/logout`}
        disabled={isGuest}
        color='red'
        icon={<IconLikeIOS ionicons src='log-out-outline' color='purple' />}
      />

      {uuid_id && (
        <LastViewedList uuid={uuid_id} user_id={accessToken?.user_id} />
      )}
    </Flex>
  );
};

export default Level2;
