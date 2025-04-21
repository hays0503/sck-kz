'use client';
import { Flex, Typography } from 'antd';
import React from 'react';

import { BasketDetail, BasketInfo, ProductsInBasket } from './SubModule';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { useReadLocalStorage } from 'usehooks-ts';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import useGetBasketProductsSWR from '@/entities/Basket/model/getBasketProductsSWR';
import Image from 'next/image';

interface IBasketDesktopProps {
  readonly basket_id: string;
}

const { Text } = Typography;

const BasketDesktop: React.FC<IBasketDesktopProps> = ({ basket_id }) => {
  const t = useTranslations('BasketMobile');
  const { data: fetchBasket, error } = useGetBasketProductsSWR();
  const accessToken = useReadLocalStorage<{ token: string }>('accessToken');
  const pathname = usePathname();
  const city = useGetCityParams();
  const Empty = () => {
    return (
      <Flex
        justify='center'
        align='center'
        vertical={true}
        style={{ minHeight: '500px', width: '100%' }}
      >
        <Flex
          justify='space-around'
          align='center'
          vertical={true}
          style={{
            width: '350px',
            minHeight: '350px',
            background: '#ffff',
            borderRadius: '10px',
          }}
        >
          <Typography.Title level={2}>{t('korzina-pusta')}</Typography.Title>
          <Image
            src='/cart.svg'
            alt='cart'
            width={100}
            height={100}
            style={{ filter: 'invert(1)' }}
          />
          <Link href={`/city/${city}/main`} prefetch={true}>
            {t('na-glavnuyu')}
          </Link>
        </Flex>
      </Flex>
    );
  };

  const ToOrder = ({ accessToken }: { accessToken: string | undefined }) => {
    if (accessToken) {
      return (
        <Flex align='center' justify='center'>
          <Link
            prefetch={true}
            href={`/city/${city}/order/${basket_id}`}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#4954F0',
              color: 'white',
              borderRadius: 4,
              textAlign: 'center',
              alignContent: 'center',
            }}
          >
            {t('oformit-tovar')}
          </Link>
        </Flex>
      );
    } else {
      return (
        <Flex align='center' justify='center'>
          <Link
            prefetch={true}
            href={`/city/${city}/login-redirect/${pathname}`}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#4954F0',
              color: 'white',
              borderRadius: 4,
              textAlign: 'center',
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <ShoppingCartOutlined />
            <Text style={{ color: 'white' }}>
              {t('avtorizuites-dlya-prodolzhenie-oformlenie')}
            </Text>
            <ShoppingCartOutlined />
          </Link>
        </Flex>
      );
    }
  };

  if (!fetchBasket) {
    return <Empty />;
  }

  if (error) {
    return <Empty />;
  }

  return (
    <Flex
      justify='center'
      align='center'
      gap={10}
      style={{ width: '100%', paddingTop: '10px' }}
    >
      <Flex style={{ width: '100%' }} gap={10}>
        <Flex vertical style={{ width: '70%' }} gap={10}>
          <ProductsInBasket Products={fetchBasket} />
        </Flex>
        <Flex vertical style={{ width: '30%' }} gap={10}>
          <BasketInfo />
          <BasketDetail
            Products={fetchBasket}
            ToOrder={<ToOrder accessToken={accessToken?.token} />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BasketDesktop;
