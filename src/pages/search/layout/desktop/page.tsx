'use server';

import { SearchParams } from 'nuqs';
import { getCategoryRoot } from '@/entities/Category';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { LayoutMainDesktop } from '@/widgets/LayoutMainDesktop';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import { SearchProduct } from '@/features/search-products';
import { HeaderDesktop } from '@/widgets/HeaderDesktop';
import { CatalogDesktop } from '@/widgets/CatalogDesktop';
import { UserCabinet } from '@/widgets/UserCabinet';
import { BasketButton } from '@/widgets/BasketButton';
import { Flex } from 'antd';
import { FooterSCK } from '@/widgets/FooterSCK';
import { searchParamsCache } from './searchParams';
import getCity from '@/entities/City/api/getCity';
import { ProductCatalogDesktop } from '@/widgets/ProductCatalogDesktop';
import { CSSProperties } from 'react';
import { unstable_cache } from 'next/cache';
import { FilterType } from '@/features/new-product-filter/ui/SubModule/FilterValueCheckBox';
import { MappedProductType } from 'api-mapping/product/_type';
import { getTranslations } from 'next-intl/server';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
    queryText: string;
  }>;
  searchParams: Promise<SearchParams>;
};

const SearchPage: React.FC<PageProps> = async (props) => {
  const { params, searchParams } = await props;
  const { city, queryText } = await params;
  const { page, order } = searchParamsCache.parse(await searchParams);

  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';

  const urlCity = `/api-mapping/city`;
  const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`;
  const urlFilter = `${process.env.HOST_URL}${host_port}/api-mapping/search/?queryText=${queryText}`;
  const getSearchFilterData = () =>
    fetch(urlFilter)
      .then((res) => res.json())
      .then(
        (data) =>
          data as {
            result: { filterData: FilterType[]; productIds: number[] };
          },
      );

  const revTime = { revalidate: 600 };

  const [dataFilter, cities, categoryRoot] = await Promise.all([
    unstable_cache(getSearchFilterData, [queryText], revTime)(),
    unstable_cache(getCity, [], revTime)(),
    unstable_cache(() => getCategoryRoot(city), [city], revTime)(),
  ]);

  const urlProductIds = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_ids/?ids=${dataFilter?.result?.productIds}&order=${order}&city=${city}&page=${page}`;
  const getProduct = () =>
    fetch(urlProductIds)
      .then((res) => res.json())
      .then((data) => data as { results: MappedProductType[] });
  const products = await unstable_cache(getProduct, [urlProductIds], revTime)();

  const fallback = {
    [urlCity]: cities,
    [urlCategoryRoot]: categoryRoot,
    [urlFilter]: dataFilter?.result?.filterData,
    [urlProductIds]: products,
  };

  const NotFound = async () => {
    const t = await getTranslations('NotFound');
    return (
      <Flex>
        <span>{`${t('po-zaprosu')} "${decodeURIComponent(queryText)}" ${t('netchego-ne-naydeno')}`}</span>
      </Flex>
    );
  };

  const flagNotFound =
    dataFilter.result?.productIds.length === 0 ||
    !dataFilter.result?.productIds;

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
            <Flex
              vertical={true}
              gap={20}
              style={
                {
                  width: '100%',
                  height: 'auto',
                  backgroundColor: '#fff',
                  '--sck-columns-on-page': 6,
                } as CSSProperties
              }
            >
              {flagNotFound ? (
                <NotFound />
              ) : (
                <ProductCatalogDesktop
                  params={await params}
                  filter={dataFilter.result?.filterData}
                  productIds={dataFilter.result?.productIds}
                />
              )}
            </Flex>
          }
          footerContent={<FooterSCK />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default SearchPage;
