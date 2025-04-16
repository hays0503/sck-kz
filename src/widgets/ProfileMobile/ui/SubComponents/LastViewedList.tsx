'use client';
import useGetProductByIdsSWR from '@/entities/Product/model/getProductByIdsSWR';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToFavoriteProduct } from '@/features/add-to-favorite-product';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex, Skeleton, Spin, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useEffect, useState } from 'react';

const { Text, Title } = Typography;

interface ILastViewedListProps {
  readonly uuid: string;
}

interface ILastViewedProduct {
  product_id: number;
  client_uuid: string | null;
  id: string;
  user_id: string | null;
  created_at: string;
}

const LastViewedList: React.FC<ILastViewedListProps> = ({ uuid }) => {
  const t = useTranslations('LastViewedList');
  const cityEn = useGetCityParams();
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
    const dataGetLastViewedUrl = `/auth_api/v2/viewed/by_client_uuid_or_user_id?client_uuid=${uuid}`;

    const responseData = await fetch(dataGetLastViewedUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const dataIds = ((await responseData.json()) as ILastViewedProduct[])
    .reverse()
    .map((item: ILastViewedProduct) => item.product_id);
    console.log({dataIds,aaaa:Array.from(new Set(dataIds))});
    setLastViewedProductIds(Array.from(new Set(dataIds)));
  }, [uuid]);

  useEffect(() => {
    callbackGetLastViewed();
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

  return (
    <Wrapper>
      <Flex gap={25} style={{ overflowY: 'scroll', paddingBottom: 25 }}>
        {data?.results.map((product) => (
          <ProductCart
            oneImage
            key={product.id}
            Product={product}
            addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
            addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};

export default memo(LastViewedList);
