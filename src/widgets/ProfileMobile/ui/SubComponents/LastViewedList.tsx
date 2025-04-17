'use client';
import useGetProductByIdsSWR from '@/entities/Product/model/getProductByIdsSWR';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToFavoriteProduct } from '@/features/add-to-favorite-product';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex, Skeleton, Spin, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';

const { Text, Title } = Typography;

interface ILastViewedListProps {
  readonly uuid: string;
  readonly user_id?: string | null;
}

interface ILastViewedProduct {
  product_id: number;
  client_uuid: string | null;
  id: string;
  user_id: string | null;
  created_at: string;
}

const LastViewedList: React.FC<ILastViewedListProps> = ({ uuid, user_id }) => {
  const t = useTranslations('LastViewedList');
  const cityEn = useGetCityParams();
  const [a, setA] = useState<number[]>();
  const [lastViewedProductIds, setLastViewedProductIds] = useState<number[]>(
    [],
  );
  const { data, isLoading, isValidating, error } = useGetProductByIdsSWR({
    ids: lastViewedProductIds,
    city: cityEn,
    orderBy: 'none_sort',
    page: 1,
  });

  const callbackGetLastViewed = useCallback(async () => {
    let dataGetLastViewedUrl = `/auth_api/v2/viewed/by_client_uuid_or_user_id?client_uuid=${uuid}`;
    if (user_id) {
      dataGetLastViewedUrl += `&user_id=${user_id}`;
    }
    const responseData = await fetch(dataGetLastViewedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return (await responseData.json()) as ILastViewedProduct[];
  }, [user_id, uuid]);

  useEffect(() => {
    callbackGetLastViewed().then((data) => {
      const dataIds = data
        .reverse()
        .map((item: ILastViewedProduct) => item.product_id);

      setA(dataIds);

      const uniqDataIds = Array.from(new Set(dataIds)).slice(0, 8);
      setLastViewedProductIds(uniqDataIds);
    });
  }, [callbackGetLastViewed]);

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Flex vertical style={{ width: '100%' }}>
      <Title level={5}>{t('vi-smotreli')}</Title>
      {children}
    </Flex>
  );

  if (isLoading || isValidating) {
    return (
      <Wrapper>
        {lastViewedProductIds.length == 0 ? (
          <Spin />
        ) : (
          <>
            {lastViewedProductIds.map((item: number) => (
              <Skeleton key={item} />
            ))}
          </>
        )}
      </Wrapper>
    );
  }

  if (error) {
    <Wrapper>
      <Text>{`${t('oshibka')}: ${JSON.stringify(error)}`}</Text>
    </Wrapper>;
  }

  let dataGetLastViewedUrl = `http://185.100.67.246:9876/auth_api/v1/viewed/by_client_uuid_or_user_id/?client_uuid=${uuid}`;
  if (user_id) {
    dataGetLastViewedUrl += `&user_id=${user_id}`;
  }

  return (
    <Wrapper>
      <Flex vertical gap={50}>
        <Link
          href={dataGetLastViewedUrl}
          target='_blank'
          rel='noopener noreferrer'
          style={{ overflowY: 'scroll' }}
          title={dataGetLastViewedUrl}
        >
          {dataGetLastViewedUrl}
        </Link>
        <span style={{ overflowY: 'scroll' }}>
          {`JSON.stringify(a): `}
          {JSON.stringify(a)}
        </span>
        <span style={{ overflowY: 'scroll' }}>
          {`JSON.stringify(lastViewedProductIds): `}
          {JSON.stringify(lastViewedProductIds)}
        </span>
        <span style={{ overflowY: 'scroll' }}>
          {`JSON.stringify(data): `}
          {JSON.stringify(data?.results.map((item) => item.id))}
        </span>
      </Flex>
      <Flex gap={25} style={{ overflowY: 'scroll', paddingBottom: 25 }}>
        {data?.results.map((product) => (
          <Flex vertical key={product.id}>
            {product.id}

            <ProductCart
              oneImage
              key={product.id}
              Product={product}
              addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
              addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
            />
          </Flex>
        ))}
      </Flex>
    </Wrapper>
  );
};

export default memo(LastViewedList);
