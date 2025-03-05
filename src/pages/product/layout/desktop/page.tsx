"use server"

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
import { JSX } from "react";
import { FooterSCK } from "@/widgets/FooterSCK";
import { getTranslations } from "next-intl/server";
import getProductBySlug from "@/entities/Product/api/getProductBySlug";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import Link from "next/link";
import { ProductDetailDesktop } from "@/widgets/ProductDetailDesktop";

interface IProductPageProps {
    params: {
        locale: string;
        city: string;
        slug: string;
    };
}

type ProductPageComponent = (props: IProductPageProps) => Promise<JSX.Element>;

const ProductPage: ProductPageComponent = async (props) => {

    const { slug, city } = await props.params;
    const t = await getTranslations("NotFound");

    const productData = await getProductBySlug({ slug, city });
    if (productData.statusCode !== STATUS_CODE.OK) return <ErrorPage
        fallback={{}}
        content={<h4>{t('tovar-udalen-ili-polnostyu-rasprodan-v-etom-gorode-no-v-nashem-magazine-vas-zhdet-tysyacha-drugikh-tovarov')}</h4>}
        city={city}
    />;

    const cities: MappedCityType[] = await getCity();

    const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot();

    const urlCity = `/api-mapping/city`
    const urlCategoryRoot = `/api-mapping/category/root`
    const fallback = {
        [`/api-mapping/product/by_slug/?slug=${slug}&city=${city}`]: productData.data,
        [urlCity]: cities,
        [urlCategoryRoot]: categoryRoot
    };




    return <DefaultPage fallback={fallback} slug={slug} />
}

interface IDefaultPageProps {
    fallback: object, slug: string
}

const DefaultPage: React.FC<IDefaultPageProps> = ({ fallback, slug }) => <ProvidersServer>
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
            content={<ProductDetailDesktop slug={slug} />}
            footerContent={<FooterSCK />}
        />
    </ProvidersClient>
</ProvidersServer>

interface IErrorPageProps {
    fallback: object, content: JSX.Element, city: string
}

const ErrorPage: React.FC<IErrorPageProps> = async ({ fallback, city, content }) => {
    const t = await getTranslations("NotFound");
    return <ProvidersServer>
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
                content={<Flex align="center" justify="center" style={{ width: "100%" }} gap={10} vertical>
                    {content}
                    <Link href={`/city/${city}/main`}>{t('vernutsya-na-glavnuyu')}</Link>
                </Flex>}
                footerContent={<FooterSCK />}
            />
        </ProvidersClient>
    </ProvidersServer>
}


export default ProductPage;