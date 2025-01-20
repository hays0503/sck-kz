'use client'
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message,Space,Typography  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { useRouter } from '@/i18n/routing';

const ChangeLanguage = () => {

    const [, startTransition] = useTransition();
    const router = useRouter();
    const localActive = useLocale();
    const city = useGetCityParams();
    
    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Выбран язык ${key}`);
        startTransition(() => {
          const url = `/city/${city}/main`;
          router.replace(url, { locale: key });
        });
    };

    const items = [
        {
          key: 'kk',
          label: <Space>
          <Typography.Text>Қазақ</Typography.Text>
          </Space>,
        },
        {
          key: 'ru',
          label: <Space>
            <Typography.Text>Русский</Typography.Text></Space>,
        },
        {
          key: 'en',
          label: <Space>
            <Typography.Text>English</Typography.Text></Space>,
        },
    
      ];

      return <Dropdown
      menu={{ items, onClick }}
      overlayStyle={{ zIndex: 2000 }}
      >
      <Space size={'small'} style={{height: "10px"}}>
        <Typography.Text>{items.find(({ key }) => key === localActive)?.label}</Typography.Text>
        <DownOutlined />
      </Space>
    </Dropdown>
}
export default ChangeLanguage;