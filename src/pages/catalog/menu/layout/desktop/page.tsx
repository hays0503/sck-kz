"use server"

import { SearchParams } from "nuqs";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { LayoutMainDesktop } from "@/widgets/LayoutMainDesktop";
import { SelectCity } from "@/features/select-city";
import { ChangeLanguage } from "@/features/change-language";
import { SearchProduct } from "@/features/search-products";
import { HeaderDesktop } from "@/widgets/HeaderDesktop";
import { CatalogDesktop } from "@/widgets/CatalogDesktop";
import { UserCabinet } from "@/widgets/UserCabinet";
import { BasketButton } from "@/widgets/BasketButton";
import { Flex } from "antd";
import { FooterSCK } from "@/widgets/FooterSCK";
import { CatalogMenu } from "@/widgets/CatalogMenu";
import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";

type PageProps = {
    params: Promise<{
        slug: string;
        locale: string;
        city: string;
    }>;
    searchParams: Promise<SearchParams>;
};

const CatalogMenuPage: React.FC<PageProps> = async ({params}) => {

    const {slug} = await params;

    const urlAllCategory = `/api-mapping/category/all`;
    const {results:allCategory} = await getCategoryAll();
    const categoryRoot:{results:MappedCategoryWithoutChildrenType[]}|undefined = await getCategoryRoot();
  
    const fallback = {
      [urlAllCategory]:allCategory,
    }
  
    // const categoryFind = findCategory(allCategory, (category)=>category.slug===slug);
  
    // const headerText = categoryFind ? categoryFind.name[locale] : "Каталог";

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
                        />}
                    content={<Flex vertical={true} gap={5}>
                        <BannerMobileSlider category={categoryRoot?.results || []} />
                        <CatalogMenu slugCategory={slug} />
                    </Flex>}
                    footerContent={<FooterSCK/>}
                />
            </ProvidersClient>
        </ProvidersServer>
    );

}

export default CatalogMenuPage