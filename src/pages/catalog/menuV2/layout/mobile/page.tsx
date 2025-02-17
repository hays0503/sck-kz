"use server";

import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getCategorySlugs from "@/entities/Category/api/getCategorySlugs";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { CatalogMenu } from "@/widgets/CatalogMenuLikeKaspi";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";

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

  const urlAllCategory = `/api-mapping/category/all`;
  const {results:allCategory} = await getCategoryAll();

  const fallback = {
    [urlAllCategory]:allCategory,
  }

  const categoryFind = findCategory(allCategory, (category)=>category.slug===slug);

  const headerText = categoryFind ? categoryFind.name[locale] : "Каталог";


  return (
    <ProvidersServer>
       <ProvidersClient fallback={fallback}>
         <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={95}
          headerContent={<HeaderText text={headerText} />}
          content={<CatalogMenu slugCategory={slug} />}
          footerContent={<FooterMobile defaultKey="2" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );


} 

export default CatalogMenuPage