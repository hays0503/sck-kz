"use server";

import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getCategorySlugs from "@/entities/Category/api/getCategorySlugs";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { CatalogMenu } from "@/widgets/CatalogMenuLikeKaspi";
import { CatalogMenu as CatalogMenuDefault } from "@/widgets/CatalogMenu";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { Flex } from "antd";
import { getCategoryRoot } from "@/entities/Category";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";
import { SearchProduct } from "@/features/search-products";
import Image from "next/image";
import { CSSProperties } from "react";

interface CategoryMenuPageProps {
  readonly params: {
    locale: string;
    city: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const allCategory = await getCategorySlugs();
  if (allCategory) {
    return allCategory.results.map((category: string) => ({
      slug: category,
    }));
  } else {
    return [];
  }
}

async function CatalogMenuPage({ params }: CategoryMenuPageProps) {
  const { slug, locale } = await params;

  const urlAllCategory = `/api-mapping/category/all`;
  const { results: allCategory } = await getCategoryAll();
  const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot();
  const fallback = {
    [urlAllCategory]: allCategory,
  }

  const categoryFind = findCategory(allCategory, (category) => category.slug === slug);

  const headerText = categoryFind ? categoryFind.name[locale] : "Каталог";

  const styleText:CSSProperties ={
    fontSize:"28px",
    fontWeight:"bold",
    color:"#ffc00e",
    textDecoration:"none",
    textAlign:"center"
  } 

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText text={headerText} />}
          content={<Flex vertical={true} gap={10} justify="center" align="center" style={{ width: "100%",height:"100%",padding:"5px" }}>
            {!categoryFind && <SearchProduct />}
            {!categoryFind && <BannerMobileSlider category={categoryRoot?.results || []} />}
            {categoryFind ? <CatalogMenu slugCategory={slug} /> : <CatalogMenuDefault slugCategory={slug} v2flag={true} />}
            {
             !categoryFind &&<Flex vertical={true} gap={3} justify="center" align="center" style={{ width: "100%" }}>
                <span style={styleText}>{`Выбирайте лучшее`}</span>
                <Image src="/logo.svg" alt="kaspi" width={300} height={160} />
                <span style={styleText}>{`качество, цена, удобство!`}</span>
              </Flex>
            }
          </Flex>}
          footerContent={<FooterMobile defaultKey="5" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );


}

export default CatalogMenuPage