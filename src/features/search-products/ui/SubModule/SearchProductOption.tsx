'use client';

import { memo } from 'react';
import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { useTranslations } from 'next-intl';
import beautifulCost from '@/shared/tools/beautifulCost';

const { Text } = Typography;

type Props = {
  product: MappedPopularProductType;
  locale: string;
};

export const SearchProductOption = memo(({ product, locale }: Props) => {
  const t = useTranslations();

  return (
    <Flex
      align='center'
      justify='flex-start'
      gap={10}
      style={{
        width: '100%',
        cursor: 'pointer',
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5, 
        // marginTop: 10,
        // marginBottom: 10,
        // borderBottom: '1px solid #e8e8e8',
      }}
    >
      <Flex
        justify='center'
        align='center'
        style={{
          width: 100,
          height: 133,
          backgroundColor: '#f5f5f5',
          // backdropFilter: `blur(10px)`,
          filter: 'drop-shadow(10px 0px 80px  #878787)',
          borderRadius: 12,
        }}
      >
        <Image
          src={product.img[0]}
          alt={product?.name?.[locale] ?? product.img[0]}
          width={100}
          height={100}
          loading='lazy'
          style={{ objectFit: 'contain' }}
        />
      </Flex>

      <Flex vertical justify='space-between' style={{ flex: 1 }}>
        <span className='ellipsis2'>
          {product?.name?.[locale] ?? 'Название нет'}
        </span>
        <span className='ellipsis1' style={{ color: 'rgba(0,0,0,0.25)' }}>
          {t('ProductDetail.brand')}: {product?.brand?.[locale] ?? 'бренда нет'}
        </span>
        <Text disabled>
          {t('ProductDetail.artikul')} №{product?.id}
        </Text>
      </Flex>

      <Flex style={{ width: '20%' }}>
        <Text>{beautifulCost(product?.price)}</Text>
      </Flex>
    </Flex>
  );
});

SearchProductOption.displayName = 'SearchProductOption';

export default SearchProductOption;
