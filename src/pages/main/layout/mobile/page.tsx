"use server";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";
import { ProductPopularListPagination } from "@/widgets/ProductPopularListPagination";
import getProductPopulates, { getProductResult } from "@/entities/Product/api/getProductPopulates";
import { HeaderMobile } from "@/widgets/HeaderMobile";
import { SelectCity } from "@/features/select-city";
import { ChangeLanguage } from "@/features/change-language";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
import { SearchProduct } from "@/features/search-products";
import { FooterMobile } from "@/widgets/FooterMobile";
import { CategoryListMobile } from "@/widgets/CategoryListMobile";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import { TabletCategory } from "@/widgets/TabletCategory/ui";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";






type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function HomePage(props: PageProps) {
  const { params, searchParams } = await props;
  const { page } = searchParamsCache.parse(await searchParams);

  const products: getProductResult = await getProductPopulates({
    city: (await params).city,
    orderBy: "stocks__price",
    page
  })

  const cities: MappedCityType[] = await getCity();

  const categoryRoot:{results:MappedCategoryWithoutChildrenType[]}|undefined = await getCategoryRoot();

  const urlPopulates = `/api-mapping/product/populates?page=${page}&order=stocks__price&city=${(await params).city}`
  const urlCity = `/api-mapping/city`
  const urlCategoryRoot = `/api-mapping/category/root`
  const fallback = {
    [urlPopulates]: products,
    [urlCity]: cities,
    [urlCategoryRoot]: categoryRoot
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
              CategoryListMobile={CategoryListMobile}
            />
          }

          content={
            <Flex vertical={true} gap={20}>
              <div style={{ width: "100%" ,height:"3px",backgroundColor:'#eeeff1'}}/>
              <BannerMobileSlider category={categoryRoot?.results || []} />
              <div style={{ width: "100%" ,height:"3px",backgroundColor:'#eeeff1'}}/>
              <TabletCategory />
              <div style={{ width: "100%" ,height:"3px",backgroundColor:'#eeeff1'}}/>
              <ProductPopularListPagination />
            </Flex>
          }

          footerContent={
            <FooterMobile/>
          }

        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
