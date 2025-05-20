'use client';

import { FC, useState, useCallback, useRef, useTransition, memo } from 'react';
import { useRouter } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Button, Flex, Input, Skeleton, Tag, Typography, Spin } from 'antd';
import {
  CloseSquareFilled,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useLocale, useTranslations } from 'next-intl';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { rawProductsTypeV2 } from 'api-mapping/product/_type/rawProductTypeV2';
import ClientPortal from '@/shared/ui/ClientPortal/ClientPortal';
import SearchProductOption from './SubModule/SearchProductOption';
import SearchAnotherProduct from './SubModule/SearchAnotherProduct';
import { motion } from 'framer-motion';
import { useLocalStorage } from 'usehooks-ts';
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md';
import CityEnToRu from '@/shared/constant/city';

const { Text } = Typography;

interface GlobalSearchResponseType {
  products: rawProductsTypeV2[];
  categories: { id: number; name_category: string; slug: string }[];
  brands: { id: number; name_brand: string }[];
  tags: { id: number; tag_text: string }[];
}

const SearchResults: FC<{
  inputText: string;
  products: MappedPopularProductType[];
  isLoading: boolean;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  onSelect: (slug: string) => void;
}> = ({ inputText, products, isLoading, locale, t, onSelect }) => {
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
        <SearchAnotherProduct slug={'mebel'} key='MebelAnotherProduct' />
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

const PredictionList: FC<{
  predictions: string[];
  setText: (text: string) => void;
}> = ({ predictions, setText }) => (
  <>
    {predictions.map((prediction) => (
      <Tag
        bordered={false}
        style={{
          padding: '0px 10px',
          cursor: 'pointer',
          borderRadius: '20px',
          backgroundColor: '#dfdfdf',
        }}
        key={prediction}
        onClick={() => setText(prediction)}
      >
        {prediction}
      </Tag>
    ))}
  </>
);

const PredictionMenu: FC<{
  predictionsLists: string[][];
  setText: (text: string) => void;
}> = ({ predictionsLists, setText }) => {
  const flat = predictionsLists.flat();
  if (flat.length === 0) return null;
  return (
    <Flex
      wrap
      gap={5}
      style={{ width: '100%', padding: '10px', backgroundColor: '#f4f4f4' }}
    >
      <PredictionList predictions={flat} setText={setText} />
    </Flex>
  );
};

function SearchProduct() {
  const [inputText, setInputText] = useState('');
  const [products, setProducts] = useState<MappedPopularProductType[]>([]);
  const [brandText, setBrandText] = useState<string[]>([]);
  const [categoryText, setCategoryText] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    'search_history',
    [],
  );

  const abortRef = useRef<AbortController | null>(null);
  const prevQueryRef = useRef<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPending, startTransition] = useTransition();

  const cityEn = useGetCityParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim() || query.length < 2 || query === prevQueryRef.current) {
        return;
      }
      prevQueryRef.current = query;
      setIsLoading(true);

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const resp = await fetch(
          `/api/v2/globalsearch/?q=${query.toLowerCase()}&city=${CityEnToRu[cityEn]}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            signal: controller.signal,
          },
        );
        const data = (await resp.json()) as GlobalSearchResponseType;

        setBrandText(data.brands?.map((b) => b.name_brand) || []);
        setCategoryText(data.categories?.map((c) => c.name_category) || []);
        setTagText(data.tags?.map((t) => t.tag_text) || []);

        const uniqueIds = Array.from(new Set(data.products.map((p) => p.id)));
        const resDetail = await fetch(
          `/api-mapping/product/by_ids/?order=none_sort&city=${cityEn}&page=1&ids=${uniqueIds.join(',')}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            cache: 'force-cache',
            signal: controller.signal,
          },
        );
        const jsonDetail = await resDetail.json();
        setProducts(
          Array.isArray(jsonDetail.results) ? jsonDetail.results : [],
        );
      } catch (err) {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('[Error] Ошибка при поиске товара:', err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [cityEn],
  );

  const handleChange = (value: string) => {
    setInputText(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!value.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        performSearch(value);
      });
    }, 300);
  };

  const handleClear = () => {
    setInputText('');
    setProducts([]);
    setIsLoading(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (trimmed) {
      // обновляем историю
      setSearchHistory((prev) => {
        const updated = [trimmed, ...prev.filter((item) => item !== trimmed)];
        return updated.slice(0, 10);
      });

      setIsFocused(false);
      router.push(`/city/${cityEn}/search/${encodeURIComponent(trimmed)}`);
    }
  };

  const onSelect = useCallback(
    (slug: string) => {
      setInputText('');
      setIsFocused(false);
      router.push(`/city/${cityEn}/product/${slug}`);
    },
    [router, cityEn],
  );

  const showPortal =
    isFocused || products.length > 0 || inputText.trim() !== '';

  return (
    <>
      <Flex
        align='center'
        style={{
          borderRadius: 4,
          height: 44,
          border: '1px solid rgb(142, 142, 142)',
          width: '100%',
        }}
      >
        <Input
          value={inputText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          allowClear={{
            clearIcon: <CloseSquareFilled style={{ fontSize: 16 }} />,
          }}
          onChange={(e) => handleChange(e.target.value)}
          onPressEnter={handleSearch}
          placeholder={t('poisk')}
          autoComplete='off'
          enterKeyHint='search'
          style={{
            height: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0 8px',
          }}
        />
        <Button
          type='text'
          onClick={handleSearch}
          style={{
            borderRadius: '0 4px 4px 0',
            width: 50,
            height: '100%',
            backgroundColor: '#4954f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPending ? (
            <Spin size='small' />
          ) : (
            <SearchOutlined style={{ color: '#fff', fontSize: 22 }} />
          )}
        </Button>
      </Flex>

      {showPortal && inputText.trim() !== '' && (
        <Button type='text' onClick={handleClear}>
          {t('cancel')}
        </Button>
      )}

      <ClientPortal
        selector='contentOverlay'
        show
        display={showPortal ? 'block' : 'none'}
      >
        <div
          style={{
            overflowY: 'auto',
            position: 'absolute',
            height: 'inherit',
            width: '100%',
            zIndex: 999,
          }}
        >
          <PredictionMenu
            predictionsLists={[brandText, tagText, categoryText]}
            setText={handleChange}
          />

          {/* История поиска */}
          {inputText.trim() === '' && searchHistory.length > 0 && (
            <Flex
              wrap
              vertical
              gap={5}
              style={{ padding: '10px', backgroundColor: '#f4f4f4' }}
            >
              <Text strong style={{ width: '100%' }}>
                {t('istoriya-poiska')}
              </Text>
              {searchHistory.map((item) => (
                <Flex
                  key={item}
                  gap={10}
                  style={{ width: '100%' }}
                  onClick={() => {
                    setInputText(item);
                    performSearch(item);
                  }}
                >
                  <MdOutlineYoutubeSearchedFor style={{ fontSize: 28 }} />
                  <Flex
                    gap={10}
                    style={{
                      width: '100%',
                      borderBottom: '1px solid rgba(128, 128, 128, 0.53)',
                    }}
                    justify='space-between'
                    align='center'
                  >
                    <Text style={{ cursor: 'pointer', borderRadius: '20px' }}>
                      {item}
                    </Text>
                    <RightOutlined style={{ fontSize: 22 }} />
                  </Flex>
                </Flex>
              ))}
              <Button type='link' danger onClick={() => setSearchHistory([])}>
                {t('ochistit-istoriyu')}
              </Button>
            </Flex>
          )}

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <SearchResults
              inputText={inputText}
              products={products}
              isLoading={isLoading}
              locale={locale}
              t={t}
              onSelect={onSelect}
            />
          </motion.div>
        </div>
      </ClientPortal>
    </>
  );
}

export default memo(SearchProduct);
