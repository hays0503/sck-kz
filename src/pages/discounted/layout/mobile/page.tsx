import { ProvidersClient } from '@/shared/providers/providersClient';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { DiscountedMobile } from '@/widgets/DiscountedMobile';
import { FooterMobile } from '@/widgets/FooterMobile';
import { LayoutMain } from '@/widgets/LayoutMain';
import { Flex } from 'antd';
import { setRequestLocale } from 'next-intl/server';
import { HeaderMobile } from '@/widgets/HeaderMobile';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import { SearchProduct } from '@/features/search-products';
import React, { JSX } from 'react';
import { SearchParams } from 'nuqs';
import { searchParamsCache } from './searchParams';
import getProductByDiscounted from '@/entities/Product/api/getProductByDiscounted';
import getCity from '@/entities/City/api/getCity';
import { unstable_cache } from 'next/cache';

interface IDiscountedPageProps {
  params: {
    locale: string;
    city: string;
    slug: string;
  };
  searchParams: Promise<SearchParams>;
}

type DiscountedPageComponent = (props: IDiscountedPageProps) => Promise<JSX.Element>;

const DiscountedPage: DiscountedPageComponent = async (props) => {
  const { locale,city } = await props.params;
  const { page, order } = searchParamsCache.parse(await props.searchParams);

  const urlCity = `/api-mapping/city`;
  const urlProductDiscounted = `/api-mapping/product/by_discounted?page=${page}&order=${order}&city=${city}`;

  const revalidateTime = { revalidate: 300 };

  // Запросы с кэшированием
  const [citiesData,productDiscountedData] = await Promise.all([
    unstable_cache(() => getCity(), [urlCity], revalidateTime)(),
    unstable_cache(() => getProductByDiscounted({ city, orderBy: 'none_sort', page }), [urlProductDiscounted], revalidateTime)(),
  ]);

  setRequestLocale(locale);

  const fallback = {
    [urlCity]: citiesData,
    [urlProductDiscounted]: productDiscountedData
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
          content={<DiscountedMobile page={page} order={order}/>}
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
}
export default DiscountedPage;