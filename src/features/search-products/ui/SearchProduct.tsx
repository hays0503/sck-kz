'use client';

import { Link, useRouter } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  Flex,
  Input,
  Skeleton,
  Typography,
} from 'antd';
import { useState, useRef, useCallback, useMemo } from 'react';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts';
import { CloseSquareFilled, SearchOutlined } from '@ant-design/icons';
import { useLocale, useTranslations } from 'next-intl';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import './SearchProduct.css';
import { SearchProductOption } from './SubModule/SearchProductOption';
import SearchAnotherProduct from './SubModule/SearchAnotherProduct';
import { rawProductsTypeV2 } from 'api-mapping/product/_type/rawProductTypeV2';
import { rawSpecification } from 'api-mapping/product/by_discounted/type/rawDiscounted';

const { Text } = Typography;

interface GlobalSearchResponseType {
    products: rawProductsTypeV2[]; 
    "categories": {id:number,name_category:string,slug:string}[],
    "brands": {id:number,name_brand:string}[],
    "specifications": rawSpecification[],
    "tags":{id:number,tag_text:string} 
}

export default function SearchProduct() {
  const [text, setText] = useDebounceValue('', 500);
  const router = useRouter();
  const cityEn = useGetCityParams();
  const locale = useLocale();
  const t = useTranslations();
  const abortRef = useRef<AbortController | null>(null);
  const [products, setProducts] = useState<MappedPopularProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useDebounceCallback(async (value: string) => {
    if (!isLoading) return;
    if (!value.trim()) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const GlobalSearchResponse = await fetch(`/api/v2/globalsearch/${value.toLowerCase()}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      const results = await GlobalSearchResponse.json() as GlobalSearchResponseType;

      if (results.products.length == 0) {
        setIsLoading(false);
        setProducts([]);
        return;
      }

      const productIds = results.products.map((p: { id: number }) => p.id);

      if (productIds.length == 0) {
        setIsLoading(false);
        setProducts([]);
        return;
      }

      const productRes = await fetch(
        `/api-mapping/product/by_ids/?order=none_sort&city=${cityEn}&page=1&ids=${productIds.join(',')}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          cache: 'force-cache',
          signal: controller.signal,
        },
      );

      const { results: fetchedProducts } = await productRes.json();
      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      const activeTextarea = document.activeElement as HTMLElement;
      activeTextarea?.blur();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Обычная отмена запроса — игнорируем
        return;
      }
      console.error('Ошибка при поиске товара:', error);
    }

    setIsLoading(false);
  }, 3500);

  const options = useMemo<AutoCompleteProps['options']>(() => {
    return products.slice(0, 20).map((product) => ({
      value: product.slug,
      label: (
        <SearchProductOption
          key={product.id}
          product={product}
          locale={locale}
        />
      ),
    }));
  }, [locale, products]);

  const onSelect = useCallback(
    (value: string) => {
      setText('');
      router.push(`/city/${cityEn}/product/${value}`);
    },
    [cityEn, router, setText],
  );

  const handleSearchClick = useCallback(() => {
    if (text.trim()) {
      router.push(`/city/${cityEn}/search/${text}`);
    }
  }, [cityEn, router, text]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const NotFound = () => {
    const _ContentHeightLocal = `calc(100dvh - 158px)`;
    if (isLoading) {
      return (
        <Flex style={{ width: '100%', padding: 10 }} vertical>
          <Skeleton active />
        </Flex>
      );
    }
    if (products.length === 0)
      return (
        <Flex
          vertical
          style={
            {
              position: 'relative',
              width: '100%',
              height: _ContentHeightLocal,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            } as React.CSSProperties
          }
        >
          <Flex
            vertical
            style={{
              width: '100dvw',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Text style={{ paddingLeft: 5, paddingRight: 5 }}>
              {t('nichego-ne-nai-deno')} {`"${text}".`} <br />{' '}
              {t('vozmozhno-vam-ponravitsya')}:
            </Text>
            <SearchAnotherProduct slug={'mebel'} />
          </Flex>
        </Flex>
      );
  };

  return (
    <AutoComplete
      autoFocus
      backfill
      open={true}
      value={text}
      autoClearSearchValue={true}
      
      options={options}
      style={{
        width: '100%',
        height: '100%',
      }}
      onSearch={search}
      onChange={(value: string) => {
        setText(value);
        setIsLoading(true);
      }}
      onSelect={onSelect}
      listHeight={500}
      dropdownStyle={{
        // position: 'relative',
        left: 0,
        minWidth: '100dvw',
        padding: 0,
        borderRadius: '12px 12px 0px 0px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      }}
      notFoundContent={<NotFound />}
      dropdownRender={(menu) => {
        if (isLoading) {
          return <></>;
        }
        if (text === '') {
          return <></>;
        }
        return (
          <Flex
            ref={scrollRef}
            vertical
            style={{
              width: '100%',
              overflow: 'auto',
              borderRadius: '12px 12px 0px 0px',
            }}
          >
            {options && options?.length != 0 && (
              <Link
                href={`/city/${cityEn}/search/${text}`}
                style={{
                  background: '#4954f0',
                  padding: 5,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SearchOutlined style={{ color: '#fff', fontSize: 16 }} />
                <Text style={{ color: '#fff' }}>{t('smotret-vse')}</Text>
              </Link>
            )}
            {menu}
          </Flex>
        );
      }}
    >
      <Flex
        align='center'
        style={{
          borderRadius: 4,
          height: 44,
          backgroundColor: 'transparent',
          border: '1px solid rgb(142, 142, 142)',
        }}
      >
        <Input
          allowClear={{
            clearIcon: <CloseSquareFilled style={{ fontSize: 16 }} />,
          }}
          onClear={() => {
            setText('');
            setIsLoading(false);
          }}
          placeholder='Поиск'
          style={{
            height: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          onPressEnter={handleSearchClick}
        />
        <Button
          type='text'
          style={{
            borderRadius: '0 4px 4px 0',
            width: 50,
            height: 'inherit',
            backgroundColor: '#4954f0',
          }}
          onClick={handleSearchClick}
        >
          <SearchOutlined style={{ color: '#fff', fontSize: 22 }} />
        </Button>
      </Flex>
    </AutoComplete>
  );
}
