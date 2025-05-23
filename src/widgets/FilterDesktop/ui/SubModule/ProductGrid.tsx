import { CSSProperties, memo } from 'react';
import { ProductCart } from '@/entities/Product/ui/CartV2';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import CityEnToRu from '@/shared/constant/city';
import { rawProductsTypeV2 } from 'api-mapping/product/_type/rawProductTypeV2';
import { Flex, Skeleton } from 'antd';

interface Props {
  products: rawProductsTypeV2[] | undefined;
  cityEn: string;
  isPending: boolean;
}

const ProductGrid = memo(({ isPending, products, cityEn }: Props) => {
  const styleGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    rowGap: '10px',
    width: '100%',
    height: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
  } as CSSProperties;

  if (isPending || !products || products?.length === 0) {
    return (
      <div style={styleGrid}>
        {[...Array(12)].map((_, idx) => (
          <Flex vertical gap={10} key={idx}>
            <Skeleton.Node
              active
              style={{ width: '14.52dvw', height: '19.34dvw' }}
            />
            <Skeleton
              active
              style={{
                width: '14.52dvw',
                height: '9,67dvw',
              }}
            />
          </Flex>
        ))}
      </div>
    );
  }

  return (
    <div style={styleGrid}>
      {products?.map((product) => {
        const stock = product?.stocks?.[CityEnToRu?.[cityEn]];
        return (
          <ProductCart
            key={product.id}
            width={'14.52dvw'}
            height={'19.34dvw'}
            Product={{
              id: product.id,
              slug: product.slug,
              name: {
                ru: product.name_product,
                en: product.additional_data.en,
                kk: product.additional_data.kk,
              },
              img: product.images?.flatMap((img) => img.image),
              rating: product.avg_rating,
              price: stock?.price,
              oldPrice: product?.discount ? stock?.price_before_discount : null,
              reviews: product?.reviews_count,
              discount: product?.discount?.amount ?? null,
              brand: {
                ru: product.brand?.name_brand,
                en: product.additional_data.en,
                kk: product.additional_data.kk,
              },
              tags: product.tags,
            }}
            addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
            addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
          />
        );
      })}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';
export default memo(ProductGrid);
