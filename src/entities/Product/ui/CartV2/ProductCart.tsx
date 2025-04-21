'use client';
import { Flex } from 'antd';
import { JSX, useRef, memo } from 'react';
import { Level1, Level2, Level3, ProductCartSwiper } from './SubComponent';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { useResizeObserver } from 'usehooks-ts';

interface IProductCartProps {
  readonly Product: MappedPopularProductType;
  readonly addToCartSlot: JSX.Element;
  readonly addToFavoriteSlot: JSX.Element;
  readonly prefetch?: boolean;
  readonly oneImage?: boolean;
}

// eslint-disable-next-line react/display-name
const ProductCart: React.FC<IProductCartProps> = memo((props) => {
  const { Product, addToCartSlot, addToFavoriteSlot, prefetch, oneImage } =
    props;
  const currentCity = useGetCityParams();
  const locale = useLocale();
  const refContainer = useRef<HTMLDivElement>(null);

  const { width: CartWidth = 170 } = useResizeObserver({
    ref: refContainer,
    box: 'border-box',
  });

  const ProductName = Product.name?.[locale]
    ? Product?.name?.[locale]
    : Product.name?.['ru'];

  const CartHeight = CartWidth + 70;

  return (
    <Flex
      ref={refContainer}
      wrap
      vertical={true}
      align='center'
      justify='space-between'
      itemScope
      itemType='http://schema.org/Product'
    >
      <Level1
        discount={Product.discount}
        addToFavoriteSlot={addToFavoriteSlot}
        Swiper={
          <Link
            href={`/city/${currentCity}/product/${props.Product.slug}`}
            prefetch={prefetch ?? true}
            style={{
              width: CartWidth,
              height: CartHeight,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProductCartSwiper
              name={ProductName}
              images={Product.img}
              width={CartWidth}
              height={CartHeight}
              oneImage={oneImage ?? false}
            />
          </Link>
        }
      />
      <Link
        href={`/city/${currentCity}/product/${props.Product.slug}`}
        style={{ width: '100%' }}
        prefetch={prefetch}
      >
        <Level2
          NameProduct={ProductName}
          average_rating={Product?.rating}
          reviews_count={Product?.reviews}
          price={Product?.price}
          discountPrice={Product?.oldPrice}
          Brand={Product?.brand?.[locale] ?? 'SCK'}
        />
      </Link>
      <Level3 addToCartSlot={addToCartSlot} />
    </Flex>
  );
});

export default ProductCart;
