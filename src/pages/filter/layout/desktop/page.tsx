import { SearchParams } from 'nuqs';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import getCity from '@/entities/City/api/getCity';
import { SearchProduct } from '@/features/search-products';
import { getCategoryRoot } from '@/entities/Category';
import { unstable_cache } from 'next/cache';
import CityEnToRu from '@/shared/constant/city';
import { searchParamsCache } from './searchParams';
import { convertSortOrder } from '@/features/sorting-products/ui/SortingProducts';
import { setRequestLocale } from 'next-intl/server';
import { LayoutMainDesktop } from '@/widgets/LayoutMainDesktop';
import { HeaderDesktop } from '@/widgets/HeaderDesktop';
import { CatalogDesktop } from '@/widgets/CatalogDesktop';
import { UserCabinet } from '@/widgets/UserCabinet';
import { BasketButton } from '@/widgets/BasketButton';
import { FooterSCK } from '@/widgets/FooterSCK';
import { FilterRenderDesktop } from '@/widgets/FilterDesktop';

type PageProps = {
  params: { slug: string; locale: string; city: string };
  searchParams: SearchParams;
};

export const revalidate = 600;
export const dynamicParams = true;

export default async function FilterPage({ params, searchParams }: PageProps) {
  const { order } = await searchParamsCache.parse(searchParams);
  const { city, locale } = await params;

  setRequestLocale(locale);

  const data = await searchParams;
  const searchParamsData: string = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const cityRu = CityEnToRu[city];

  const url = `http://185.100.67.246:8888/categories/facets/?${searchParamsData}&limit=100&ordering=${convertSortOrder(order)}&city=${cityRu}`;

  const fetchData = await (await fetch(url)).json();

  // Ключи для кэша
  const urlCity = `/api-mapping/city`;
  const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`;

  const revalidateTime = { revalidate: 300 };

  // Запросы с кэшированием
  const [citiesData, categoryRootData] = await Promise.all([
    unstable_cache(() => getCity(), [urlCity], revalidateTime)(),
    unstable_cache(
      () => getCategoryRoot(city),
      [urlCategoryRoot],
      revalidateTime,
    )(),
  ]);

  const fallback = {
    [urlCity]: citiesData,
    [urlCategoryRoot]: categoryRootData,
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMainDesktop
          headerContent={
            <HeaderDesktop
              SelectCity={SelectCity}
              ChangeLanguage={ChangeLanguage}
              SearchProduct={SearchProduct}
              CatalogDesktop={CatalogDesktop}
              UserCabinet={UserCabinet}
              BasketButton={BasketButton}
            />
          }
          content={
            <FilterRenderDesktop  
              fetchData={{
                category: fetchData.categorys,
                brands: fetchData.brands,
                specifications: fetchData.specifications,
                products: fetchData.products.items,
              }}
              searchParamsData={url}
            />
          }
          footerContent={<FooterSCK />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
