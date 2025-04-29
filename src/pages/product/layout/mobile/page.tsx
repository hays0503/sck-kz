import getProductByCategory from '@/entities/Product/api/getProductByCategory';
import getProductBySlug from '@/entities/Product/api/getProductBySlug';
import getProductPopulates from '@/entities/Product/api/getProductPopulates';
import { Link } from '@/i18n/routing';
import CityEnToRu from '@/shared/constant/city';
import { STATUS_CODE } from '@/shared/constant/statusCode';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { HeaderText } from '@/shared/ui';
import { FooterMobile } from '@/widgets/FooterMobile';
import { LayoutMain } from '@/widgets/LayoutMain';
import { ProductDetail } from '@/widgets/ProductDetail';
import { Flex } from 'antd';
import getBrandsBySlugCategory from 'api-mapping/category/brands/api/getBrandsBySlugCategory';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { getTranslations } from 'next-intl/server';
import { unstable_cache } from 'next/cache';

import React, { JSX } from 'react';

interface IProductPageProps {
  params: {
    locale: string;
    city: string;
    slug: string;
  };
}

type ProductPageComponent = (props: IProductPageProps) => Promise<JSX.Element>;

const ProductPage: ProductPageComponent = async (props) => {
  const { slug, city } = await props.params;

  const revalidateTime = { revalidate: 300 };

  const t = await getTranslations('NotFound');

  const [productSlug, productPopulates] = await Promise.all([
    unstable_cache(
      () => getProductBySlug({ slug, city }),
      [slug, city],
      revalidateTime,
    )(),
    unstable_cache(
      () => getProductPopulates({ city, orderBy: 'none_sort', page: 1 }),
      [city],
      revalidateTime,
    )(),
  ]);

  // Ключи для кэширования
  const urlSlug = `/api-mapping/product/by_slug/?slug=${slug}&city=${city}`;
  const urlPopulates = `/api-mapping/product/by_populates?page=${1}&order=none_sort&city=${city}`;

  let fallback = {
    [urlSlug]: productSlug.data,
    [urlPopulates]: productPopulates,
  };

  if (productSlug?.data !== null) {
    const categorySlug = (productSlug.data as MappedProductDetailType)
      .categorySlug;
    const urlProductMore = `/api-mapping/product/by_category/?category=${categorySlug}&order=none_sort&page=${0}&city=${city}`;
    const urlBrands = `/api-mapping/category/brands/?city=${city}&slug=${slug}`;

    const [productMore, Brands] = await Promise.all([
      unstable_cache(
        () =>
          getProductByCategory({
            slug: categorySlug,
            city,
            orderBy: 'none_sort',
            page: 1,
          }),
        [city],
        revalidateTime,
      )(),
      unstable_cache(
        () => getBrandsBySlugCategory(categorySlug, CityEnToRu[city]),
        [city],
        revalidateTime,
      )(),
    ]);

    const urlProductMores = Brands.results.map(
      (brand) =>
        `/api-mapping/product/by_category/?category=${categorySlug}&order=none_sort&page=${0}&city=${city}&brand=${brand.id}`,
    );

    const mores = await Promise.all(
      Brands.results.map((brand) =>
        unstable_cache(
          () =>
            getProductByCategory({
              slug: categorySlug,
              city,
              orderBy: 'none_sort',
              page: 1,
              brand: `${brand.id}`,
            }),
          [],
          revalidateTime,
        )(),
      ),
    );

    const fallbackMore = new Map();
    urlProductMores.forEach((url, index) => {
      // fallbackMore[url] = mores[index];
      fallbackMore.set([`$inf$${url},0`], [mores[index]]);
    });

    fallback = {
      [`$inf$${urlProductMore}`]: [productMore],
      ...fallback,
      ...Object.fromEntries(fallbackMore),
      // [unstable_serialize(() => {
      //   return { url: `${urlProductMore}`, page: 0 };
      // })]: [productMore],
      [urlBrands]: Brands,
    };
  }

  console.log('fallback', fallback);

  if (productSlug.statusCode !== STATUS_CODE.OK) {
    const contentText = t('tovar-udalen');
    return (
      <ErrorPage fallback={{}} content={<h4>{contentText}</h4>} city={city} />
    );
  }

  return (
    <Flex vertical style={{ width: '100%' }}>
      <DefaultPage fallback={fallback} slug={slug} />
    </Flex>
  );
};

const Empty = () => <></>;

const DefaultPage: React.FC<{
  fallback: object;
  slug: string;
}> = ({ fallback, slug }) => (
  <ProvidersServer>
    <ProvidersClient fallback={fallback}>
      <LayoutMain
        headerContent={<Empty />}
        content={<ProductDetail slug={slug} />}
        footerContent={
          <Flex vertical style={{ width: '100%' }}>
            <div id='footerContent' />
            <FooterMobile defaultKey='1' />
          </Flex>
        }
      />
    </ProvidersClient>
  </ProvidersServer>
);

const ErrorPage: React.FC<{
  fallback: object;
  content: JSX.Element;
  city: string;
}> = async ({ fallback, city, content }) => {
  const t = await getTranslations('NotFound');
  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText socialFunctionOff />}
          content={
            <Flex
              align='center'
              justify='center'
              style={{ width: '100%' }}
              gap={10}
              vertical
            >
              {content}
              <Link href={`/city/${city}/main`}>
                {t('vernutsya-na-glavnuyu')}
              </Link>
            </Flex>
          }
          footerContent={<FooterMobile defaultKey='1' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProductPage;
