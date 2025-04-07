'use server';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { Flex } from 'antd';
import { FooterMobile } from '@/widgets/FooterMobile';
import { HeaderText } from '@/shared/ui';
import { ProductCatalog } from '@/widgets/ProductCatalog';
import { LayoutMain } from '@/widgets/LayoutMain';
import { SearchProduct } from '@/features/search-products';
import { CSSProperties } from 'react';
import { FilterType } from '@/features/new-product-filter/ui/SubModule/FilterValueCheckBox';
import { unstable_cache } from 'next/cache';
import getCity from '@/entities/City/api/getCity';
import { searchParamsCache } from './searchParams';
import { SearchParams } from 'nuqs';
import { MappedProductType } from 'api-mapping/product/_type';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
    queryText: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function SearchPage(props: PageProps) {
  const { params, searchParams } = await props;
  const { city, queryText } = await params;
  const { page, order } = searchParamsCache.parse(await searchParams);

  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';
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

  const [dataFilter, cities] = await Promise.all([
    unstable_cache(getSearchFilterData, [queryText], revTime)(),
    unstable_cache(getCity, [], revTime)(),
  ]);

  const urlCity = `/api-mapping/city`;
  const urlProductIds = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_ids/?ids=${dataFilter?.result?.productIds}&order=${order}&city=${city}&page=${page}`;
  const getProduct = () =>
    fetch(urlProductIds)
      .then((res) => res.json())
      .then((data) => data as { results: MappedProductType[] });
  const products = await unstable_cache(getProduct, [urlProductIds], revTime)();

  const fallback = {
    [urlCity]: cities,
    [urlFilter]: dataFilter?.result?.filterData,
    [urlProductIds]: products,
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText SearchProduct={SearchProduct} />}
          content={
            <Flex
              vertical={true}
              gap={20}
              style={
                {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  '--sck-columns-on-page': 2,
                } as CSSProperties
              }
            >
              <ProductCatalog
                params={await params}
                filter={dataFilter.result?.filterData}
                productIds={dataFilter.result?.productIds}
              />
            </Flex>
          }
          footerContent={<FooterMobile defaultKey='2' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
