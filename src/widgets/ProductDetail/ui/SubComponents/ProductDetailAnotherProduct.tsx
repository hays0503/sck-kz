import { Flex, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import React, { CSSProperties, memo, useEffect, useMemo, useRef } from 'react';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import defaultFetcher from '@/shared/tools/defaultFetcher';
import useSWRInfinite from 'swr/infinite';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { useIntersectionObserver } from '@undefined/usehooks-ts';
import { Link } from '@/i18n/routing';
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
        letterSpacing: '-1.3%',
        verticalAlign: 'bottom',
        color: '#00000073',
      }) as CSSProperties,
    [],
  );

  const getPage = (page: number): string | null => {
    const urlProductsByCategory = `/api-mapping/product/by_category/?category=${product.categorySlug}&order=none_sort&page=${page}&city=${cityEn}`;
    return urlProductsByCategory;
  };

  const { data, size, setSize } = useSWRInfinite(getPage, defaultFetcher, {
    // persistSize: false,
    parallel: true,
  });

  return (
    <Flex
      vertical={true}
      gap={10}
      style={{ width: '100%', height: 'fit-content', padding: '10px',scrollBehavior:"smooth" }}
    >
      <Text id='start-list' style={styleText}>
        {t('smotrite-takzhe')}
      </Text>
      {data?.map((d, index) => {
        return d?.results?.length > 0 ? (
          <PageObserved
            key={index}
            Products={d.results}
            callbackIntersecting={() => {
              setSize(size + 1);
            }}
          />
        ) : (
          <Flex key={index} vertical justify='center' align='center'>
            <Link href={'#start-list'}>
              <Text style={styleText}>К началу списка</Text>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default memo(ProductDetailAnotherProduct);
