import { ProductCart } from '@/entities/Product/ui/CartV2';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import { Flex, Spin } from 'antd';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { CSSProperties, Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const _RowAligns: readonly ['top', 'middle', 'bottom', 'stretch'];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const _RowJustify: readonly [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
];
type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type ResponsiveLike<T> = {
  [key in Responsive]?: T;
};
export type ResponsiveAligns = ResponsiveLike<(typeof _RowAligns)[number]>;
export type ResponsiveJustify = ResponsiveLike<(typeof _RowJustify)[number]>;

interface Level1Props {
  readonly Products: MappedPopularProductType[];
  align?: (typeof _RowAligns)[number] | ResponsiveAligns;
  justify?: (typeof _RowJustify)[number] | ResponsiveJustify;
}

// Первый уровень карты (карточки товаров)
const Level1: React.FC<Level1Props> = ({ Products }) => {
  const ButtonStyle: CSSProperties = {
    width: '100%',
    height: '40px',
    background: '#2f369c',
    padding: '8px 16px',
    borderRadius: '4px',
  };

  const gridStyle: CSSProperties = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--sck-columns-on-page), 1fr)',
    gridGap: '5px',
    backgroundColor: '#f5f5f5'
  };

  return (
    <div style={gridStyle}>
      {Products?.map((item, index) => (
        <ProductCart
          width='48dvw'
          height='64dvw'
          key={index}
          Product={item}
          addToCartSlot={
            <Suspense
              fallback={
                <Flex style={ButtonStyle} align='center' justify='center'>
                  <Spin spinning />
                </Flex>
              }
            >
              <AddToBasketProduct prod_id={item.id} />
            </Suspense>
          }
          addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id} />}
        />
      ))}
    </div>
  );
};

export default Level1;
