import { SearchParams } from 'nuqs';
// import { searchParamsCache } from './searchParams';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { LayoutMain } from '@/widgets/LayoutMain';
import { HeaderMobile } from '@/widgets/HeaderMobile';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import getCity from '@/entities/City/api/getCity';
import { SearchProduct } from '@/features/search-products';
import { FooterMobile } from '@/widgets/FooterMobile';
import { getCategoryRoot } from '@/entities/Category';
import { unstable_cache } from 'next/cache';
import { FilterRenderMobile } from '@/widgets/Filter/Filter';
import CityEnToRu from '@/shared/constant/city';
import { searchParamsCache } from './searchParams';
import { convertSortOrder } from '@/features/sorting-products/ui/SortingProducts';

type PageProps = {
  params: { slug: string; locale: string; city: string };
  searchParams: SearchParams;
};

export const revalidate = 600;
export const dynamicParams = true;

export default async function HomePage({ params, searchParams }: PageProps) {
  const { order } = await searchParamsCache.parse(searchParams);
  const { city } = await params;

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
        <LayoutMain
          headerContent={
            <HeaderMobile
              SelectCity={SelectCity}
              ChangeLanguage={ChangeLanguage}
              SearchProduct={SearchProduct}
            />
          }
          content={
            <FilterRenderMobile
              fetchData={{
                category: fetchData.categorys,
                brands: fetchData.brands,
                specifications: fetchData.specifications,
                products: fetchData.products.items,
              }}
              searchParamsData={url}
            />
          }
          footerContent={<FooterMobile />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
