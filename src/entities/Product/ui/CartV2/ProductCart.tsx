'use client';
import { Flex } from 'antd';
import { JSX, useRef, memo } from 'react';
import { Level1, Level2, Level3, ProductCartSwiper } from './SubComponent';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import { useResizeObserver } from 'usehooks-ts';
import useSaveLastElementView from '@/shared/hooks/useSaveLastElementView';

interface IProductCartProps {
  readonly Product: MappedPopularProductType;
  readonly addToCartSlot: JSX.Element;
  readonly addToFavoriteSlot: JSX.Element;
  readonly prefetch?: boolean;
  readonly oneImage?: boolean;
  readonly width?: string;
  readonly height?: string;
}

// eslint-disable-next-line react/display-name
const ProductCart: React.FC<IProductCartProps> = memo((props) => {
  const {
    Product,
    addToCartSlot,
    addToFavoriteSlot,
    prefetch,
    oneImage,
    width,
    height,
  } = props;
  const currentCity = useGetCityParams();
  const locale = useLocale();
  const refContainer = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLElement>;

  const { width: CartWidth = 0 } = useResizeObserver({
    ref: refContainer,
    box: 'content-box',
  });

  const saveScroll = useSaveLastElementView(`ProductCart${Product.id}`);

  const ProductName = Product.name?.[locale]
    ? Product?.name?.[locale]
    : Product.name?.['ru'];

  const CartHeight = 70 + CartWidth;

  return (
    <Flex
      id={`ProductCart${Product.id}`}
      ref={refContainer}
      wrap
      vertical={true}
      align='center'
      justify='space-between'
      itemScope
      itemType='http://schema.org/Product'
      style={{
        position: 'relative',
        
      }}
    >
      <Level1
        discount={Product.discount}
        tags={Product.tags}
        addToFavoriteSlot={addToFavoriteSlot}
        Swiper={
          <Link
            key={Product.id}
            lang={locale}
            locale={locale}
            onClick={() => saveScroll()}
            scroll={false}
            href={`/city/${currentCity}/product/${props.Product.slug}`}
            prefetch={prefetch ?? true}
            shallow
            style={{
              width: width ?? CartWidth,
              height: height ?? CartHeight,
              minWidth: '100px',
              minHeight: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ProductCartSwiper
              name={ProductName}
              images={Product.img}
              width={width ?? CartWidth}
              height={height ?? CartHeight}
              oneImage={oneImage ?? false}
            />
          </Link>
        }
      />
      <Link
        key={Product.id}
        lang={locale}
        locale={locale}
        shallow
        onClick={() => saveScroll()}
        scroll={false}
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
