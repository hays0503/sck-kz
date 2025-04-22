'use client';

import { useGetLastViewedProductIds } from '@/entities/Product/model';
import useGetProductByIdsSWR from '@/entities/Product/model/getProductByIdsSWR';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToFavoriteProduct } from '@/features/add-to-favorite-product';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex, Skeleton, Spin, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

const { Text, Title } = Typography;

interface ILastViewedListProps {
  readonly uuid: string;
  readonly user_id?: string | null;
}

const LastViewedList: React.FC<ILastViewedListProps> = ({ uuid, user_id }) => {
  const t = useTranslations('LastViewedList');
  const cityEn = useGetCityParams();
  const { productIds, loading, error } = useGetLastViewedProductIds(
    uuid,
    user_id,
  );
  const { data, isLoading, isValidating } = useGetProductByIdsSWR({
    ids: productIds,
    city: cityEn,
    orderBy: 'none_sort',
    page: 1,
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Flex vertical style={{ width: '100%' }} gap={10}>
      <Title level={5}>{t('vi-smotreli')}</Title>
      {children}
    </Flex>
  );

  if (productIds.length === 0 || loading || isLoading || isValidating) {
    return (
      <Wrapper>
        {productIds.length === 0 ? (
          <Spin />
        ) : (
          productIds.map((id) => <Skeleton key={id} />)
        )}
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Text type='danger'>{`${t('oshibka')}: ${String(error)}`}</Text>
      </Wrapper>
    );
  }

  if (!data || data.results.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <Flex gap={25} style={{ overflowY: 'scroll', paddingBottom: 25 }}>
        {data.results.map((product) => (
          <Flex vertical key={product.id}>
            <ProductCart
              oneImage
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

LastViewedList.displayName = 'LastViewedList';
