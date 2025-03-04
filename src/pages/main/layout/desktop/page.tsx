"use server"

import getProductPopulates from "@/entities/Product/api/getProductPopulates";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { getProductResult } from "@/entities/Product/api/getProductByCategory";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
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
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";
import { ProductPopularListPagination } from "@/widgets/ProductPopularListPagination";
import { CSSProperties } from "react";
import { FooterSCK } from "@/widgets/FooterSCK";

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
        orderBy: "none_sort",
        page
    })


    const cities: MappedCityType[] = await getCity();

    const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot();

    const urlPopulates = `/api-mapping/product/populates?page=${page}&order=none_sort&city=${(await params).city}`
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
                    content={<Flex vertical={true} gap={5} style={{
                        "--sck-columns-on-page": 6
                    } as CSSProperties}>
                        <div style={{ width: "100%", height: "3px", backgroundColor: '#eeeff1' }} />
                        <BannerMobileSlider category={categoryRoot?.results || []} />
                        <div style={{ width: "100%", height: "3px", backgroundColor: '#eeeff1' }} />
                        <ProductPopularListPagination/>
                    </Flex>}
                    footerContent={<FooterSCK/>}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}
