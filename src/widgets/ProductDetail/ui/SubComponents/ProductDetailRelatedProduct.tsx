import { Flex, Typography } from 'antd';
import { MappedProductType } from 'api-mapping/product/_type';
import { useTranslations } from 'next-intl';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { CSSProperties } from 'react';

interface IProductDetailRelatedProductProps {
  readonly productsRelated: MappedProductType[] | [];
}

const { Title } = Typography;

const ProductDetailRelatedProduct: React.FC<
  IProductDetailRelatedProductProps
> = (props) => {
  const { productsRelated } = props;
  const t = useTranslations('ProductDetailRelatedProduct');

  const gridStyle: CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--sck-columns-on-page), 1fr)',
    gridGap: '10px',    backgroundColor: '#f5f5f5'
  };

  return (
    <Flex
      vertical={true}
      style={{ width: '100%', padding: '10px' }}
      justify='flex-start'
    >
      <Title level={5} style={{
        color: '#00000073',
      }}>{t('vam-mozhhet-prigoditsya')}</Title>
      <div style={gridStyle}>
          {productsRelated.map((product, index) => (
              <ProductCart
                prefetch={false}
                key={index}
                Product={product}
                addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
                addToFavoriteSlot={
                  <AddToFavoriteProduct prod_id={product.id} />
                }
              />
          ))}
      </div>
    </Flex>
  );
};

export default ProductDetailRelatedProduct;
