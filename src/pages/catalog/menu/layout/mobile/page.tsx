"use server";

import { getCategoryRoot } from "@/entities/Category";
import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getCategorySlugs from "@/entities/Category/api/getCategorySlugs";
import { SearchProduct } from "@/features/search-products";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";
import { CatalogMenu } from "@/widgets/CatalogMenu/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";

interface CategoryMenuPageProps {
  readonly params: {
    locale: string;
    city: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const allCategory = await getCategorySlugs();
  if(allCategory) {
    return allCategory.results.map((category: string) => ({
      slug: category,
    }));
  }else{
    return [];
  }
}

async function CatalogMenuPage({params}: CategoryMenuPageProps) {
  const {slug,locale} = await params;

  const urlAllCategory = `/api-mapping/category/all/?city=${(await params).city}`;
  const {results:allCategory} = await getCategoryAll((await params).city);
  const categoryRoot:{results:MappedCategoryWithoutChildrenType[]}|undefined = await getCategoryRoot((await params).city);

  const fallback = {
    [urlAllCategory]:allCategory,
  }

  const categoryFind = findCategory(allCategory, (category)=>category.slug===slug);

  const headerText = categoryFind ? categoryFind.name[locale] : "Каталог";


  return (
    <ProvidersServer>
       <ProvidersClient fallback={fallback}>
         <LayoutMain
          headerContent={<HeaderText text={headerText} SearchProduct={SearchProduct}/>}
          content={<Flex vertical={true} gap={10} justify="center" align="center" style={{ width: "100%",marginTop:"10px" }}>
            <BannerMobileSlider category={categoryRoot?.results || []} />
            <CatalogMenu slugCategory={slug} />
            </Flex>
            }
          footerContent={<FooterMobile defaultKey="2" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );


} 

export default CatalogMenuPage