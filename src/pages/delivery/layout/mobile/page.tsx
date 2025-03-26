"use server";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { LayoutMain } from "@/widgets/LayoutMain";
import getProductPopulates, { getProductResult } from "@/entities/Product/api/getProductPopulates";
import { HeaderMobile } from "@/widgets/HeaderMobile";
import { SelectCity } from "@/features/select-city";
import { ChangeLanguage } from "@/features/change-language";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
import { SearchProduct } from "@/features/search-products";
import { FooterMobile } from "@/widgets/FooterMobile";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import { AboutDelivery } from "@/widgets/AboutDelivery";


type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function DeliveryPage(props: PageProps) {
  const { params, searchParams } = await props;
  const { page } = searchParamsCache.parse(await searchParams);

  const products: getProductResult = await getProductPopulates({
    city: (await params).city,
    orderBy: "none_sort",
    page
  })

  const cities: MappedCityType[] = await getCity();

  const categoryRoot:{results:MappedCategoryWithoutChildrenType[]}|undefined = await getCategoryRoot((await params).city);

  const urlPopulates = `/api-mapping/product/by_populates?page=${page}&order=none_sort&city=${(await params).city}`
  const urlCity = `/api-mapping/city`
  const urlCategoryRoot = `/api-mapping/category/root/?city=${(await params).city}`
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
            />
          }
          content={<AboutDelivery/>}

          footerContent={
            <FooterMobile/>
          }

        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
