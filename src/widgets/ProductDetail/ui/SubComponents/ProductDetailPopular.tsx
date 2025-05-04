import { useGetProductPopulatesSWR } from '@/entities/Product/model';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { CSSProperties, memo } from 'react';

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

  const products = ProductPopulates?.results;

  const textStyle = {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '-1.3%',
  };

  const gridStyle: CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--sck-columns-on-page), 1fr)',
    gridGap: '10px',    backgroundColor: '#f5f5f5'
  };

  return (
    <Flex vertical style={{ width: '100%', padding: '10px' }} gap={5}>
      <Text style={textStyle}>{t('populyarnye')}</Text>
      <div style={gridStyle}>
          {products?.map((item, index) => (
              <ProductCart
                key={index}
                Product={item}
                addToCartSlot={<AddToBasketProduct prod_id={item.id} />}
                addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id} />}
              />
          ))}
      </div>
    </Flex>
  );
});
ProductDetailPopular.displayName = 'ProductDetailPopular';

export default ProductDetailPopular;
