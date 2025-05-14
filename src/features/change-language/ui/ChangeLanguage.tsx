'use client';
import React, { useTransition } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Spin, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';

const ChangeLanguage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();
  // const params = useParams();
  const query = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const t = useTranslations();
  const cityEn = useGetCityParams();
  const [, setSelectCityLocal] = useLocalStorage<
    { locale: string; city: string } | null | undefined
  >('parameters', undefined);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (localActive === key) return;
    messageApi.info(`${t('vybran-yazyk')} ${key}`);
    startTransition(() => {
      setSelectCityLocal({ city: cityEn, locale: key });
      const url = `${pathname}?${query?.toString()}`;
      router.replace({ pathname: url }, { locale: key });
    });
  };

  const items = [
    {
      key: 'kk',
      label: (
        <Space>
          <Typography.Text>Қазақ</Typography.Text>
        </Space>
      ),
    },
    {
      key: 'ru',
      label: (
        <Space>
          <Typography.Text>Русский</Typography.Text>
        </Space>
      ),
    },
    {
      key: 'en',
      label: (
        <Space>
          <Typography.Text>English</Typography.Text>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      {isPending && <Spin size={'large'} spinning fullscreen />}
      <Dropdown menu={{ items, onClick }} overlayStyle={{ zIndex: 2000 }}>
        <Space size={'small'} style={{ height: '10px' }}>
          <Typography.Text>
            {items.find(({ key }) => key === localActive)?.label}
          </Typography.Text>
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
};
export default ChangeLanguage;
