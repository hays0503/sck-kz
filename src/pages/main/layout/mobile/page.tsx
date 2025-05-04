import { SearchParams } from 'nuqs';
import { searchParamsCache } from './searchParams';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { LayoutMain } from '@/widgets/LayoutMain';
import { Flex } from 'antd';
import { ProductPopularListPagination } from '@/widgets/ProductPopularListPaginationMobile';
import getProductPopulates from '@/entities/Product/api/getProductPopulates';
import { HeaderMobile } from '@/widgets/HeaderMobile';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import getCity from '@/entities/City/api/getCity';
import { SearchProduct } from '@/features/search-products';
import { FooterMobile } from '@/widgets/FooterMobile';
import { getCategoryRoot } from '@/entities/Category';
import { TabletCategory } from '@/widgets/TabletCategory/ui';
import { BannerMobileSlider } from '@/widgets/BannerMobileSlider';
import { CSSProperties } from 'react';
import { unstable_cache } from 'next/cache';
import { MobileFooterMenu } from '@/widgets/MobileFooterMenu';
import getProductByCategory from '@/entities/Product/api/getProductByCategory';

type PageProps = {
  params: { slug: string; locale: string; city: string };
  searchParams: SearchParams;
};

export const revalidate = 600;
export const dynamicParams = true;

export default async function HomePage({ params, searchParams }: PageProps) {
  const { page } = await searchParamsCache.parse(searchParams);
  const { city } = await params;

  // Ключи для кэша
  const urlPopulates = `/api-mapping/product/by_populates?page=${page}&order=none_sort&city=${city}`;
  const urlCity = `/api-mapping/city`;
  const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`;
  const urlProductMore = `/api-mapping/product/by_category/?category=${'mebel'}&order=none_sort&page=${1}&city=${city}`;

  const revalidateTime = { revalidate: 300 };

  // Запросы с кэшированием
  const [productsData, citiesData, categoryRootData,productMore] = await Promise.all([
    unstable_cache(
      () => getProductPopulates({ city, orderBy: 'none_sort', page }),
      [urlPopulates],
      revalidateTime,
    )(),
    unstable_cache(() => getCity(), [urlCity], revalidateTime)(),
    unstable_cache(
      () => getCategoryRoot(city),
      [urlCategoryRoot],
      revalidateTime,
    )(),
    unstable_cache(
      () =>
        getProductByCategory({
          slug: 'mebel',
          city,
          orderBy: 'none_sort',
          page: 1,
        }),
      [city],
      revalidateTime,
    )()
  ]);

  const fallback = {
    [urlPopulates]: productsData,
    [urlCity]: citiesData,
    [urlCategoryRoot]: categoryRootData,
    [urlProductMore]: productMore
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={
            <HeaderMobile
              SelectCity={SelectCity}
              ChangeLanguage={ChangeLanguage}
              SearchProduct={SearchProduct}
            />
          }
          content={
            <Flex
              vertical
              gap={5}
              style={{ '--sck-columns-on-page': 2 } as CSSProperties}
            >
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  backgroundColor: '#eeeeee',
                }}
              />
              <BannerMobileSlider category={categoryRootData?.results ?? []} />
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  backgroundColor: '#eeeeee',
                }}
              />
              <TabletCategory />
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  backgroundColor: '#eeeeee',
                }}
              />
              <ProductPopularListPagination />
              <MobileFooterMenu/>
            </Flex>
          }
          footerContent={<FooterMobile />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
