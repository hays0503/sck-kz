'use client';
import React from 'react';
import { Collapse, Flex, Typography } from 'antd';
import { CollapseProps } from 'antd/lib';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';

const { Text } = Typography;

const MobileFooterMenu = () => {
  const t = useTranslations('FooterSCK');
  const cityEn = useGetCityParams();
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: t('kompaniya'),
      children: (
        <>
          <Link href={`/city/${cityEn}/about`}>
            <Text>{t('o-nas')}</Text>
          </Link>
          <br />
          <Link href={`/city/${cityEn}/about-our-guarantees`}>
            <Text>{t('nashi-garantii')}</Text>
          </Link>
          <br />
          <li>
            <Link href={`/city/${cityEn}/contact`}>
              <Text>{t('kontakty')}</Text>
            </Link>
          </li>
        </>
      ),
      styles: {
        header: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    {
      key: '2',
      label: t('pomosh'),
      children: (
        <Link href={`/city/${cityEn}/about-pays`}>
          <Text>{t('oplata')}</Text>
        </Link>
      ),
    },
    {
      key: '3',
      label: t('internet-magazin'),
      children: (
        <>
          <Text>{t('svyazhites-s-nami')}</Text>
          <br />
          <Text strong>+7 705 655 00 00</Text>
        </>
      ),
    },
    {
      key: '4',
      label: t('yuridicheskaya-informaciya'),
      children: (
        <>
          <Text strong>TOO «SCK» (ЭсСиКей)</Text>
          <br />
          <Text>Sales Center of Kazakhstan</Text>
          <br />
          <Text>БИН 160 440 027 443</Text>
          <br />
          <br />
          <Link href={`/city/${cityEn}/user-agreement`}>
            <Text>{t('polzovatelskoe-soglashenie')}</Text>
          </Link>
          <br />
          <Link href={`/city/${cityEn}/privacy-policy`}>
            <Text>{t('politika-konfidencialnosti')}</Text>
          </Link>
        </>
      ),
    },
  ];

  return (
    <Flex vertical style={{ padding: '10px', backgroundColor: '#fff' }}>
      <Collapse
        items={items}
        ghost
        accordion
        expandIconPosition='end'
        style={{ padding: 0 }}
      />

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Text>{`© ${new Date().getFullYear()} ${t('sck-essikei-zona-unikalnykh-cen')}`}</Text>
      </div>
    </Flex>
  );
};

export default MobileFooterMenu;
