import { useGetProductPopulatesSWR } from '@/entities/Product/model';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

const { Text } = Typography;

const ProductDetailPopular = memo(() => {
  const cityEn = useGetCityParams();
  const t = useTranslations('Status');

  const {
    data: ProductPopulates,
    isLoading,
    error,
  } = useGetProductPopulatesSWR({
    city: cityEn,
    orderBy: 'none_sort',
    page: 1,
  });

  if (!ProductPopulates && isLoading) {
    return <>{t('zagruzka')}</>;
  }

  if (error) {
    return (
      <>
        {t('oshibka')} {JSON.stringify(error)}
      </>
    );
  }

  const SwiperProps: SwiperProps = {
    slidesPerView: 'auto',
    spaceBetween: '10',
    loop: true,
    navigation: false,
    style: { width: '100%',height:'fit-content' },
  };
  const products = ProductPopulates?.results;

  const textStyle = {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '-1.3%',
  };

  return (
    <Flex vertical style={{ width: '100%', padding: '10px' }} gap={5}>
      <Text style={textStyle}>{t('sales')}</Text>
      <Swiper {...SwiperProps}>
        {products?.map((item, index) => (
          <SwiperSlide key={index} style={{ width: '38%' }}>
            <ProductCart
              Product={item}
              addToCartSlot={<AddToBasketProduct prod_id={item.id} />}
              addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id} />}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
});
ProductDetailPopular.displayName = 'ProductDetailPopular';

export default ProductDetailPopular;
