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
import { searchParamsCache } from "./searchParams";
import getProductByCategory, { getProductResult } from "@/entities/Product/api/getProductByCategory";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
import { ProductCatalogDesktop } from "@/widgets/ProductCatalogDesktop";
import { CSSProperties } from "react";
import { FilterType } from "@/features/new-product-filter/ui/SubModule/FilterValueCheckBox";

type PageProps = {
    params: Promise<{
        slug: string;
        locale: string;
        city: string;
    }>;
    searchParams: Promise<SearchParams>;
};

const CatalogPage: React.FC<PageProps> = async (props) => {

    const { params, searchParams } = await props;
    const { page, order } = searchParamsCache.parse(await searchParams);

    const products: getProductResult = await getProductByCategory({
        slug: (await params).slug,
        city: (await params).city,
        orderBy: order as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
        page
    })

    const cities: MappedCityType[] = await getCity();

    const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot((await params).city);

    const urlProductsByCategory = `/api-mapping/product/by_category/?category=${(await params).slug}&order=${order}&page=${page}&city=${(await params).city}`

    const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';
    const urlFilter = `${process.env.HOST_URL}${host_port}/api-mapping/filter/?category=${(await params).slug}`;
    const dataFilter = (await fetch(urlFilter).then((res) => res.json())) as {
        result: FilterType[];
    };


    const urlCity = `/api-mapping/city`
    const urlCategoryRoot = `/api-mapping/category/root/?city=${(await params).city}`
    const fallback = {
        [urlProductsByCategory]: products,
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
                    content={<Flex vertical={true} gap={20} style={{
                        width: "100%",
                        height: "auto",
                        backgroundColor: "#fff",
                        "--sck-columns-on-page": 6
                    } as CSSProperties}>
                        <ProductCatalogDesktop params={await params} filter={dataFilter.result}/>
                        
                    </Flex>}
                    footerContent={<FooterSCK />}
                />
            </ProvidersClient>
        </ProvidersServer>
    );

}

export default CatalogPage