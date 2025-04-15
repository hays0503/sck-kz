import { Flex, Spin, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
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
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { useIntersectionObserver } from '@undefined/usehooks-ts';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
const { Text } = Typography;

interface IProductDetailAnotherProductProps {
  readonly product: MappedProductDetailType;
}

const PageObserved: React.FC<{
  Products: MappedPopularProductType[];
  callbackIntersecting: () => void;
}> = ({ Products, callbackIntersecting }) => {
  const running = useRef(false);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });
  useEffect(() => {
    if (!running.current) {
      if (isIntersecting) {
        running.current = true;
        callbackIntersecting();
      }
    }
  }, [callbackIntersecting, isIntersecting]);

  const gridStyle = useMemo(
    () =>
      ({
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '10px',
      }) as CSSProperties,
    [],
  );

  return (
    <div style={gridStyle} ref={ref}>
      {Products.map((product: MappedPopularProductType) => (
        <ProductCart
          key={product.id}
          Product={product}
          addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
          addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
        />
      ))}
    </div>
  );
};
const PageObservedMemo = memo(PageObserved);

const ListWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Flex
    vertical={true}
    gap={10}
    style={{
      width: '100%',
      height: 'fit-content',
      padding: '10px',
      scrollBehavior: 'smooth',
    }}
  >
    {children}
  </Flex>
);

const ProductDetailAnotherProduct: React.FC<
  IProductDetailAnotherProductProps
> = ({ product }): React.ReactNode => {
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
      return `/api-mapping/product/by_category/?category=${product.categorySlug}&order=none_sort&page=${page}&city=${cityEn}`;
    },
    [cityEn, product.categorySlug],
  );

  const { data, setSize, isLoading,isValidating, error } = useSWRInfinite(
    getPage,
    defaultFetcher,
    {
      // persistSize: false,
      initialSize: 1,
      parallel: true,
    },
  );

  const handleIntersection = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

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
      <span
        style={{
          position: 'absolute',
          top: '50%',
          bottom: '50%',
          transform: '-50% , -50%',
        }}
      >
        {isLoading}
      </span>
      {data?.map((d, index) => {
        return d?.results?.length > 0 ? (
          <PageObservedMemo
            key={index}
            Products={d.results}
            callbackIntersecting={handleIntersection}
          />
        ) : (
          <Flex key={index} vertical justify='center' align='center'>
            <Link href={'#start-list'}>
              <Text style={styleText}>{t('k-nachalu-spiska')}</Text>
            </Link>
          </Flex>
        );
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
    </ListWrapper>
  );
};

export default memo(ProductDetailAnotherProduct);
