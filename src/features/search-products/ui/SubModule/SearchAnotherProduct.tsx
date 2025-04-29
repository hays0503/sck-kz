import { Flex, Spin, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import defaultFetcher from '@/shared/tools/defaultFetcher';
import useSWRInfinite from 'swr/infinite';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { useIntersectionObserver } from 'usehooks-ts';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
const { Text } = Typography;

interface IProductDetailAnotherProductProps {
  readonly slug: string;
}

const gridStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '10px',
} as CSSProperties;

const Page: React.FC<{
  Products: MappedPopularProductType[];
}> = ({ Products }) => {
  return (
    <div style={{ ...gridStyle }}>
      {Products?.map((product: MappedPopularProductType) => (
        <ProductCart
          width='47.60dvw'
          height='64.21dvw'
          oneImage={true}
          key={product.id}
          Product={product}
          addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
          addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
        />
      ))}
    </div>
  );
};

const PageMemo = memo(Page);

const PageObserved: React.FC<{
  Products: MappedPopularProductType[];
  callbackIntersecting: () => void;
  isValidating: boolean;
}> = ({ Products, callbackIntersecting, isValidating }) => {
  const running = useRef(false);
  const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.25 });

  useEffect(() => {
    if (!running.current && isIntersecting) {
      running.current = true;
      callbackIntersecting();
    }
  }, [isIntersecting, callbackIntersecting]);

  useEffect(() => {
    if (!isValidating) {
      running.current = false;
    }
  }, [isValidating]);

  return (
    <div style={gridStyle} ref={ref}>
      {Products.map((product: MappedPopularProductType) => (
        <ProductCart
          oneImage={true}
          key={product.id}
          Product={product}
          addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
          addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
          width='47.60dvw'
          height='64.21dvw'
        />
      ))}
    </div>
  );
};
const PageObservedMemo = memo(PageObserved);

const ListWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Flex
    vertical={true}
    gap={5}
    style={{
      width: '100%',
      height: 'fit-content',
      scrollBehavior: 'smooth',
      contentVisibility: 'auto',
      overflowAnchor: 'auto',
    }}
  >
    {children}
  </Flex>
);

const RenderList: React.FC<{
  Products: MappedPopularProductType[];
  index: number;
  len: number;
  callbackIntersecting: () => void;
  isValidating: boolean;
}> = ({ Products, index, len, callbackIntersecting, isValidating }) => {
  if (index + 1 === len) {
    return (
      <PageObservedMemo
        Products={Products}
        callbackIntersecting={callbackIntersecting}
        isValidating={isValidating}
      />
    );
  } else {
    return <PageMemo Products={Products} />;
  }
};

const SearchAnotherProduct: React.FC<IProductDetailAnotherProductProps> = ({
  slug,
}): React.ReactNode => {
  const t = useTranslations('ProductDetailAnotherProduct');
  const cityEn = useGetCityParams();

  const styleText = useMemo(
    () =>
      ({
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '-0.013em',
        verticalAlign: 'bottom',
        color: '#00000073',
      }) as CSSProperties,
    [],
  );

  const getPage = useCallback(
    (page: number): string | null => {
      return `/api-mapping/product/by_category/?category=${slug}&order=none_sort&page=${page}&city=${cityEn}`;
    },
    [cityEn, slug],
  );

  const { data, setSize, isLoading, isValidating, error } = useSWRInfinite<{
    len: number;
    results: MappedPopularProductType[];
  }>(getPage, defaultFetcher, {
    persistSize: false,
    initialSize: 10,
    parallel: true,
    revalidateFirstPage: false,
  });

  const handleIntersection = useCallback(() => {
    if (data) {
      const count = data[0].len;
      const loaded = data.reduce((acc, item) => acc + item.results.length, 0);
      if (loaded >= count) {
        return;
      } else {
        setSize((prev) => prev + 1);
      }
    }
  }, [data, setSize]);

  if (isLoading) {
    return (
      <ListWrapper>
        <Flex
          style={{ width: '100%' }}
          justify='center'
          align='center'
          gap={10}
        >
          <Text style={styleText}>{t('zagruzka')}</Text>
          <Spin />
        </Flex>
      </ListWrapper>
    );
  }

  if (error) {
    return (
      <ListWrapper>
        <Flex style={{ width: '100%' }} justify='center' align='center'>
          <Text style={styleText}>{t('error')}</Text>
        </Flex>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Text id='start-list' style={styleText}>
        {t('smotrite-takzhe')}
      </Text>
      {data?.map((d, index) => {
        return d?.results?.length > 0 ? (
          <RenderList
            key={index}
            index={index}
            len={data.length}
            Products={d.results}
            isValidating={isValidating}
            callbackIntersecting={handleIntersection}
          />
        ) : null;
      })}
      {isValidating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Flex justify='center' align='center' style={{ padding: '10px 0' }}>
            <Spin />
          </Flex>
        </motion.div>
      )}
      <Flex vertical justify='center' align='center'>
        <Link href={'#start-list'}>
          <Text style={styleText}>{t('k-nachalu-spiska')}</Text>
        </Link>
      </Flex>
    </ListWrapper>
  );
};

export default memo(SearchAnotherProduct);
