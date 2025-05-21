'use client';

import { FC } from 'react';
import { Flex, Skeleton, Typography } from 'antd';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { useTranslations } from 'next-intl';
import SearchAnotherProduct from './SearchAnotherProduct';
import SearchProductOption from './SearchProductOption';


const { Text } = Typography;

interface SearchResultsProps {
  inputText: string;
  products: MappedPopularProductType[];
  isLoading: boolean;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  onSelect: (slug: string) => void;
}

const SearchResults: FC<SearchResultsProps> = ({ inputText, products, isLoading, locale, t, onSelect }) => {
  if (isLoading) {
    return (
      <Flex vertical style={{ width: '100%', padding: '10px 0' }}>
        {[...Array(5)].map((_, idx) => (
          <div key={idx} style={{ padding: '8px 12px' }}>
            <Skeleton avatar paragraph={{ rows: 1 }} active />
          </div>
        ))}
      </Flex>
    );
  }

  if (products.length === 0 && inputText.trim().length > 0 && !isLoading) {
    return (
      <Flex
        vertical
        style={{ width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      >
        <Text style={{ padding: 10 }}>
          {t('nichego-ne-nai-deno')} {`"${inputText}".`}
          <br />
          {t('vozmozhno-vam-ponravitsya')}:
        </Text>
        <SearchAnotherProduct slug={'mebel'} key="MebelAnotherProduct" />
      </Flex>
    );
  }

  return (
    <Flex vertical justify='center' style={{ width: '100%' }}>
      {products.map((product) => (
        <div key={product.id} onClick={() => onSelect(product.slug)}>
          <SearchProductOption product={product} locale={locale} />
        </div>
      ))}
    </Flex>
  );
};

export default SearchResults;