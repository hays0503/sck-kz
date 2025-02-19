"use server";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { Flex } from "antd";
import { getProductResult } from "@/entities/Product/api/getProductPopulates";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
import { FooterMobile } from "@/widgets/FooterMobile";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { HeaderText } from "@/shared/ui";
import { ProductCatalog } from "@/widgets/ProductCatalog";
import getProductByCategory from "@/entities/Product/api/getProductByCategory";
import getCategoryBySlugs from "@/entities/Category/api/getCategoryBySlugs";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};
export default async function CatalogPage(props: PageProps) {

  const { params, searchParams } = await props;
  const { page, order } = searchParamsCache.parse(await searchParams);

  const t = await getTranslations("Catalog");

  const categoryData = await getCategoryBySlugs((await params).slug);

  const headerText = categoryData ? categoryData.name[(await params).locale] : t('katalog');

  const products: getProductResult = await getProductByCategory({
    slug: (await params).slug,
    city: (await params).city,
    orderBy: order as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
    page
  })

  const cities: MappedCityType[] = await getCity();

  const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot();

  const urlProductsByCategory = `/api-mapping/product/by_category/?category=${(await params).slug}&order=${order}&page=${page}&city=${(await params).city}`

  const urlCity = `/api-mapping/city`
  const urlCategoryRoot = `/api-mapping/category/root`
  const fallback = {
    [urlProductsByCategory]: products,
    [urlCity]: cities,
    [urlCategoryRoot]: categoryRoot
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={80}
          headerContent={
            <HeaderText
              text={
                headerText
              }
            />
          }

          content={
            <Flex vertical={true} gap={20} style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
              <ProductCatalog params={await params} />
            </Flex>
          }

          footerContent={
            <FooterMobile />
          }

        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
