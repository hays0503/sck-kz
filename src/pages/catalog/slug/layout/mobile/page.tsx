'use server';
import { SearchParams } from 'nuqs';
// import { searchParamsCache } from './searchParams';
// import { ProvidersServer } from '@/shared/providers/providersServer';
// import { ProvidersClient } from '@/shared/providers/providersClient';
// import { Flex } from 'antd';
// import { getProductResult } from '@/entities/Product/api/getProductPopulates';
// import getCity from '@/entities/City/api/getCity';
// import { MappedCityType } from 'api-mapping/city';
// import { FooterMobile } from '@/widgets/FooterMobile';
// import { MappedCategoryWithoutChildrenType } from 'api-mapping/category/root/type';
// import { getCategoryRoot } from '@/entities/Category';
// import { HeaderText } from '@/shared/ui';
// import { ProductCatalog } from '@/widgets/ProductCatalog';
// import getProductByCategory from '@/entities/Product/api/getProductByCategory';
// import { LayoutMain } from '@/widgets/LayoutMain';
// import { SearchProduct } from '@/features/search-products';
// import { CSSProperties } from 'react';
// import { FilterType } from '@/features/new-product-filter/ui/SubModule/FilterValueCheckBox';
import { permanentRedirect } from 'next/navigation';
// import getCategoryAll from '@/entities/Category/api/getCategoryAll';
import getCategoryBySlug from 'api-mapping/category/by_slug/api/getCategoryBySlug';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function CatalogPage(props: PageProps) {
  const { params
    // , searchParams 
  } = await props;
  // const { page, order } = searchParamsCache.parse(await searchParams);



  // const products: getProductResult = await getProductByCategory({
  //   slug: (await params).slug,
  //   city: (await params).city,
  //   orderBy: order as
  //     | 'avg_rating'
  //     | '-avg_rating'
  //     | 'stocks__price'
  //     | '-stocks__price',
  //   page,
  // });

  // const cities: MappedCityType[] = await getCity();
  const {locale,slug, city} = await params;
  const category = await getCategoryBySlug(slug);
  permanentRedirect(`/${locale}/city/${city}/filter/?category=${category?.id}`);

  // const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';
  // const urlFilter = `${process.env.HOST_URL}${host_port}/api-mapping/filter/?category=${(await params).slug}`;

  // const dataFilter = (await fetch(urlFilter).then((res) => res.json())) as {
  //   result: FilterType[];
  // };

  // const urlProductsByCategory = `/api-mapping/product/by_category/?category=${(await params).slug}&order=${order}&page=${page}&city=${(await params).city}`;

  // const urlCity = `/api-mapping/city`;
  // const urlCategoryRoot = `/api-mapping/category/root/?city=${(await params).city}`;
  // const fallback = {
  //   [urlProductsByCategory]: products,
  //   [urlCity]: cities,
  //   [urlCategoryRoot]: categoryRoot,
  // };



  // return (
  //   <ProvidersServer>
  //     <ProvidersClient fallback={{}}>
  //       <LayoutMain
  //         headerContent={<HeaderText SearchProduct={SearchProduct} />}
  //         content={
  //           <Flex
  //             vertical={true}
  //             gap={20}
  //             style={
  //               {
  //                 width: '100%',
  //                 height: '100%',
  //                 backgroundColor: '#fff',
  //                 '--sck-columns-on-page': 2,
  //               } as CSSProperties
  //             }
  //           >
  //             <ProductCatalog
  //               params={await params}
  //               filter={dataFilter.result}
  //             />
  //           </Flex>
  //         }
  //         footerContent={<FooterMobile defaultKey='2' />}
  //       />
  //     </ProvidersClient>
  //   </ProvidersServer>
  // );
}
