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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    width: '100%',
    height: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
  } as CSSProperties;

  if (isPending || !products || products?.length === 0) {
    return (
      <div style={styleGrid}>
        <Flex vertical gap={10}>
          <Skeleton.Node
            active
            style={{ width: '47.60dvw', height: '64.21dvw' }}
          />
          <Skeleton
            active
            style={{
              width: '47.60dvw',
              height: '32,105dvw',
            }}
          />
        </Flex>

        <Flex vertical gap={10}>
          <Skeleton.Node
            active
            style={{ width: '47.60dvw', height: '64.21dvw' }}
          />
          <Skeleton
            active
            style={{
              width: '47.60dvw',
              height: '32,105dvw',
            }}
          />
        </Flex>
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
            width='47.60dvw'
            height='64.21dvw'
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
