import { Flex, Skeleton, Spin, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import defaultFetcher from '@/shared/tools/defaultFetcher';
import useSWRInfinite from 'swr/infinite';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { useIntersectionObserver } from 'usehooks-ts';
import { motion } from 'framer-motion';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import BrandList from './BrandList';
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

const styleText = {
  padding: '5px',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.013em',
  verticalAlign: 'bottom',
  color: '#00000073',
};

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
    justify='flex-start'
    align='flex-start'
    vertical={true}
    gap={10}
    style={{
      width: '100%',
      // height: 'fit-content',
      minHeight: '420px',
      scrollBehavior: 'smooth',
      contentVisibility: 'auto',
      overflow: 'auto',
      // overflowAnchor: 'revert',
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

const RenderListMemo = memo(RenderList);

const ProductDetailAnotherProduct: React.FC<
  IProductDetailAnotherProductProps
> = ({ slug }) => {
  const t = useTranslations('ProductDetailAnotherProduct');
  const cityEn = useGetCityParams();

  const [selectBrand, setSelectBrand] = useState<string>('');

  const getKey = useCallback(
    (page: number): string | null => {
      if (selectBrand != '') {
        return `/api-mapping/product/by_category/?category=${slug}&order=none_sort&page=${page}&city=${cityEn}&brand=${selectBrand}`;
      }
      return `/api-mapping/product/by_category/?category=${slug}&order=none_sort&page=${page}&city=${cityEn}`;
    },
    [cityEn, selectBrand, slug],
  );

  // const { cache } = useSWRConfig();
  // console.log("AAAAAAAAAAA cache",cache);

  const { data, setSize, isLoading, isValidating, error } = useSWRInfinite<{
    len: number;
    results: MappedPopularProductType[];
  }>(getKey, defaultFetcher, {
    persistSize: false,
    initialSize: 1,
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

  if (error) {
    return (
      <ListWrapper>
        <Flex
          vertical
          style={{ width: '100%', minHeight: '420px' }}
          justify='flex-start'
          align='flex-start'
          gap={10}
        >
          <Text style={styleText}>{t('error')}</Text>
        </Flex>
      </ListWrapper>
    );
  }

  // if (isLoading) {
  //   return (
  //     <ListWrapper>
  //       <Flex
  //         vertical
  //         style={{
  //           width: '100%',
  //           minHeight: '420px',
  //           scrollBehavior: 'smooth',
  //           overflow: 'auto',
  //         }}
  //         justify='flex-start'
  //         align='flex-start'
  //         gap={10}
  //       >
  //         <Text id='start-list' style={styleText}>
  //           {t('smotrite-takzhe')}
  //         </Text>
  //         <BrandList
  //       slugCategory={slug}
  //       selectBrand={selectBrand}
  //       setSelectBrand={setSelectBrand}
  //     />
  //         <Text style={styleText}>{t('zagruzka')}</Text>
  //         <Skeleton active />
  //       </Flex>
  //     </ListWrapper>
  //   );
  // }

  console.log('data', data);

  return (
    <ListWrapper>
      <Text id='start-list' style={styleText}>
        {t('smotrite-takzhe')}
      </Text>
      <BrandList
        slugCategory={slug}
        selectBrand={selectBrand}
        setSelectBrand={setSelectBrand}
      />
      <>
        {!data || isLoading ? (
          <Flex vertical style={{ width: '100%', minHeight: '420px' }}>
            <Text style={styleText}>{t('zagruzka')}</Text>
            <Skeleton active />
          </Flex>
        ) : (
          data?.map((d, index) => {
            return (
              d?.results?.length > 0 && (
                <RenderListMemo
                  key={index}
                  index={index}
                  len={data.length}
                  Products={d.results}
                  isValidating={isValidating}
                  callbackIntersecting={handleIntersection}
                />
              )
            );
          })
        )}
      </>
      {isValidating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Flex
            vertical
            style={{ width: '100%', minHeight: '420px' }}
            justify='flex-start'
            align='center'
            gap={10}
          >
            <Spin />
          </Flex>
        </motion.div>
      )}
      {/* <Flex vertical justify='center' align='center'>
        <Link href={'#start-list'}>
          <Text style={styleText}>{t('k-nachalu-spiska')}</Text>
        </Link>
      </Flex> */}
    </ListWrapper>
  );
};

export default memo(ProductDetailAnotherProduct);
