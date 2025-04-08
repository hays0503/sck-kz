'use client';

import { Button, Flex } from 'antd';
import {
  // ProductDetailBreadcrumb,
  ProductDetailConfiguration,
  ProductDetailDescription,
  ProductDetailItem,
  ProductDetailPopular,
  ProductDetailPrice,
  ProductDetailRating,
  ProductDetailReviews,
  ProductDetailSpecification,
  ProductDetailSwiper,
  ProductDetailToOrder,
} from './SubComponents';
import useGetProductBySlugSWR from '@/entities/Product/model/getProductBySlugSWR';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { useLocale, useTranslations } from 'next-intl';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import ProductDetailRelatedProduct from './SubComponents/ProductDetailRelatedProduct';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useReadLocalStorage, useResizeObserver } from '@undefined/usehooks-ts';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { CopyUrlButton } from '@/features/copy-url-button';
import { ShareButton } from '@/features/share-button';
import { useRouter } from '@/i18n/routing';
import { createPortal } from 'react-dom';

interface IProductDetailProps {
  slug: string;
}

const SendMessage: React.FC<{ id: number }> = ({ id }) => {
  const client_uuid = useReadLocalStorage<string>('uuid_id');

  useEffect(() => {
    fetch('/auth_api/v2/viewed/add_viewed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        product_id: id,
        client_uuid: client_uuid,
      }),
    });
  }, [client_uuid, id]);
  return <></>;
};

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Status');
  const cityEn = useGetCityParams();
  const {
    data: ProductBySlug,
    isLoading,
    error,
  } = useGetProductBySlugSWR(slug, cityEn);

  const refSliderContainer = useRef<HTMLDivElement>(null);
  const sliderSize = useResizeObserver({
    ref: refSliderContainer,
    box: 'content-box',
  });

  const [enableButtonBuy, setEnableButtonBuy] = useState(true);

  if (!ProductBySlug && isLoading) {
    return <div>{t('zagruzka')}</div>;
  }

  if (error) {
    return (
      <div>
        {t('oshibka')} {JSON.stringify(error)}
      </div>
    );
  }

  const product: MappedProductDetailType =
    ProductBySlug as MappedProductDetailType;

  const PortalData = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    if (!mounted) return null;
    if (!document) return null;

    return mounted
      ? createPortal(
          <Flex
            style={{
              width: '100%',
              border: '1px solid #f5f5f5',
              borderRadius: '4px 4px 0% 0%',
              boxShadow: '0px 0px 10px -1px rgba(0,0,0,0.45)',
            }}
          >
            {/* Остатки и Кнопка купить */}
            <ProductDetailToOrder product={product} />
          </Flex>,
          document.getElementById('footerContent')!,
        )
      : null;
  };

  return (
    <>
      <SendMessage id={product.id} />
      <Flex
        style={
          {
            backgroundColor: '#EEEFF1',
            '--sck-columns-on-page': 2,
          } as CSSProperties
        }
        vertical={true}
        gap={10}
        itemScope={true}
        itemType='http://schema.org/Product'
      >
        {/* <ProductDetailItem> */}
        {/* Крошки */}
        {/* <ProductDetailBreadcrumb idCategoryProduct={product.categoryId} /> */}
        {/* </ProductDetailItem> */}

        <ProductDetailItem>
          {/* Слайдер */}
          <Flex
            style={{ width: '100%', height: '65dvh', position: 'relative' }}
            justify='center'
            ref={refSliderContainer}
          >
            <Flex
              vertical
              justify='center'
              align='center'
              gap={10}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 999,
              }}
            >
              <CopyUrlButton />
              <ShareButton />
              <Button style={{ margin: 0, padding: 0 }}>
                <AddToFavoriteProduct prod_id={product.id} />
              </Button>
            </Flex>
            <Flex
              vertical
              justify='center'
              align='center'
              gap={10}
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 999,
              }}
            >
              <Button
                type='text'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                  padding: 0,
                }}
                onClick={() => router.back()}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 16 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.53718 0.391676C6.87192 0.0569412 7.41463 0.0569412 7.74937 0.391676C8.0841 0.726411 8.0841 1.26912 7.74937 1.60386L3.21242 6.14063H14.8576C15.2971 6.14063 15.6594 6.47152 15.7089 6.89781L15.7147 6.99777C15.7147 7.47115 15.3309 7.85491 14.8576 7.85491H3.21242L7.74937 12.3917C8.05835 12.7007 8.08212 13.1869 7.82067 13.5231L7.74937 13.6039C7.41463 13.9386 6.87192 13.9386 6.53718 13.6039L0.537184 7.60386L0.474438 7.53387C0.472452 7.53139 0.47048 7.52891 0.468521 7.52641C0.463805 7.52049 0.459064 7.51428 0.454419 7.50803C0.439124 7.48731 0.424749 7.466 0.411334 7.44405C0.404939 7.43372 0.398846 7.42325 0.392994 7.41268C0.38367 7.39573 0.374741 7.37825 0.366407 7.36042C0.359572 7.34585 0.353158 7.33102 0.347183 7.31606C0.340404 7.29912 0.334238 7.28217 0.328601 7.26497C0.324472 7.25221 0.320502 7.23902 0.316857 7.22576C0.311705 7.20728 0.307252 7.18869 0.303417 7.16988C0.300449 7.15495 0.297814 7.14001 0.295577 7.12503C0.289357 7.08379 0.286133 7.04116 0.286133 6.99777L0.289533 7.07427C0.287757 7.05434 0.286677 7.03435 0.286292 7.01436L0.286133 6.99777C0.286133 6.99228 0.286185 6.9868 0.286287 6.98133C0.286647 6.96175 0.287732 6.94148 0.289533 6.92127C0.291075 6.90361 0.293086 6.88677 0.295578 6.87009C0.297814 6.85553 0.300449 6.84059 0.303482 6.82572C0.307253 6.80684 0.311704 6.78825 0.316751 6.76991C0.320502 6.75651 0.324472 6.74332 0.328765 6.73022C0.334238 6.71337 0.340404 6.69641 0.347079 6.67972C0.353158 6.66452 0.359572 6.64968 0.366424 6.63501C0.374741 6.61729 0.38367 6.5998 0.393169 6.58267C0.398846 6.57229 0.404939 6.56181 0.411272 6.55145C0.424749 6.52953 0.439124 6.50823 0.454401 6.48763C0.479258 6.45406 0.506847 6.42201 0.537184 6.39168L0.468521 6.46913C0.489849 6.44194 0.512785 6.41608 0.537184 6.39168L6.53718 0.391676Z'
                    fill='#99A2AD'
                  />
                </svg>
              </Button>
            </Flex>
            <ProductDetailSwiper
              images={product.img}
              name={product?.name?.[locale]}
              width={sliderSize?.width ?? 300}
              height={sliderSize?.height ?? 300}
            />
          </Flex>
        </ProductDetailItem>

        {enableButtonBuy && <PortalData />}

        <ProductDetailItem>
          {/* Название товара и Конфигурация */}
          <ProductDetailConfiguration
            nameProduct={product?.name?.[locale] ?? product.slug}
            Configurations={product.configuration}
            img={product.img}
            discount={product.discount}
          />
        </ProductDetailItem>

        <ProductDetailItem>
          {/* Информация о товаре - название - цена - артикул - отзывы - каспи виджет/форте виджет */}
          <ProductDetailPrice product={product} />
        </ProductDetailItem>

        {product?.rating && (
          <ProductDetailItem>
            <ProductDetailRating product={product} />
          </ProductDetailItem>
        )}

        {/* {product?.configuration && ( */}

        {/* )} */}

        <ProductDetailItem>
          {/* Характеристики */}
          <ProductDetailSpecification product={product} />
        </ProductDetailItem>

        {product?.desc && (
          <ProductDetailItem>
            <ProductDetailDescription product={product} />
          </ProductDetailItem>
        )}

        <ProductDetailItem>
          <ProductDetailReviews product={product} />
        </ProductDetailItem>

        {product?.relatedProducts && (
          <ProductDetailItem callbackIntersecting={setEnableButtonBuy}>
            <ProductDetailRelatedProduct
              productsRelated={product?.relatedProducts}
            />
          </ProductDetailItem>
        )}

        <ProductDetailItem callbackIntersecting={setEnableButtonBuy}>
          <ProductDetailPopular />
        </ProductDetailItem>
      </Flex>
    </>
  );
};
export default ProductDetail;
