import { Flex, Skeleton, Typography } from 'antd';
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
import { motion, useInView } from 'framer-motion';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import BrandList from './BrandList';

const { Text } = Typography;

interface IProductDetailAnotherProductProps {
  readonly slug: string;
}

const gridStyle = {
  willChange: 'opacity, transform',
  width: 'calc( 100% - 10px )',
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
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

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedProductCard: React.FC<{ product: MappedPopularProductType }> = ({
  product,
}) => {
  return (
    <motion.div
      key={`${product.id}-${product.name}`}
      variants={cardVariants}
      transition={{ duration: 0.4 }}
    >
      <ProductCart
        oneImage={true}
        Product={product}
        addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
        addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
      />
    </motion.div>
  );
};

const AnimatedProductCardMemo = memo(AnimatedProductCard);

const Page: React.FC<{
  Products: MappedPopularProductType[];
}> = ({ Products }) => {
  return (
    <motion.div layout style={gridStyle}>
      {Products?.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatedProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const PageMemo = memo(Page);

const containerVariants = {
  hidden: {
    opacity: 1,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PageObserved: React.FC<{
  Products: MappedPopularProductType[];
  callbackIntersecting: () => void;
}> = ({ Products, callbackIntersecting }) => {
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, {
    once: true,
    margin: '0px 0px -1% 0px',
  });

  useEffect(() => {
    if (isInView) {
      callbackIntersecting();
    }
  }, [isInView, callbackIntersecting]);

  return (
    <motion.div
      ref={wrapperRef}
      style={gridStyle}
      variants={containerVariants}
      viewport={{ amount: 'some', once: true }}
    >
      {Products.map((product: MappedPopularProductType) => {
        return <AnimatedProductCardMemo key={product.id} product={product} />;
      })}
    </motion.div>
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
          backgroundColor: '#f5f5f5'
      // overflowY: 'auto',
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
}> = ({ Products, index, len, callbackIntersecting }) => {
  if (index + 1 === len) {
    return (
      <PageObservedMemo
        Products={Products}
        callbackIntersecting={callbackIntersecting}
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


  const { data, setSize, isLoading, isValidating, error } = useSWRInfinite<{
    len: number;
    results: MappedPopularProductType[];
  }>(getKey, defaultFetcher, {
    persistSize: false,
    initialSize: 25,
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
            <Skeleton active />
          </Flex>
        </motion.div>
      )}
    </ListWrapper>
  );
};

export default memo(ProductDetailAnotherProduct);
