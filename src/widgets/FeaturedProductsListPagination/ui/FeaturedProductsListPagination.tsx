"use client";

import useGetProductByIdsSWR from "@/entities/Product/model/getProductByIdsSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { MappedPopularProductType, orderByType } from "api-mapping/product/populates";
import { Level1, Level2 } from "./SubComponent";
import { FEATURED_PRODUCTS } from "@/shared/constant/featured-products";
import { parseAsInteger, useQueryState } from "nuqs";
import { SortingProducts } from "@/features/sorting-products";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { Dispatch } from "react";
import useGetProductsIdsByFavoriteSWR from "@/entities/Product/model/getProductsIdsByFavoriteSWR";

const { Title } = Typography;

const RenderFeaturedProducts: React.FC<{ FeaturedProductsIds: number[], order: orderByType, page: number }> = ({ FeaturedProductsIds, order, page }) => {
    const t = useTranslations("RenderFeaturedProducts");
    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [sortOrder] = useQueryState("order", { defaultValue: order??"stocks__price" });
    const cityEn = useGetCityParams();
    const { data, isLoading, error } = useGetProductByIdsSWR({
        ids: FeaturedProductsIds || [],
        city: cityEn,
        orderBy: sortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
        page
    })

    if (!data && isLoading) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div>{t('error')} {error.message}</div>;
    }

    const Products = data?.results || [];
    const ProductsLen = data?.len || 0;

    const {  Text } = Typography;

    interface RenderProps {
        Products: MappedPopularProductType[],
        ProductsLen: number,
        CurrentPage: number,
        SetCurrentPage: Dispatch<React.SetStateAction<number>>
    }

    const Render: React.FC<RenderProps> = ({
        Products, ProductsLen, CurrentPage, SetCurrentPage
    }) => {
        const router = useRouter();
        const t = useTranslations("Render");
        return (
            <>
                {ProductsLen <= 0 && <>
                    <Flex vertical>
                        <Flex vertical align="center" justify="" style={{ width: "100%", height: "100%" }}>
                            <Text strong style={{ textAlign: "center" }}>{t('v-vybrannom-gorode-net-tovarov-iz-dannoi-kategorii-ili-ikh-uzhe-raskupili-vernites-pozdnee')}</Text>
                            <Button
                                style={{ padding: "20px", backgroundColor: "#4954f0", color: "#FFFF", zIndex: 999 }}
                                onClick={() => router.back()}
                            >
                                {t('nazad')}
                            </Button>
                        </Flex>
                        <Flex>
                            <Image src="/logo.svg" fill alt="logo" />
                        </Flex>
                    </Flex>
                </>}
                {ProductsLen > 0 && <>
                        <Flex style={{ width: "100%", background: "#FFF" }} justify="space-between">
                        <SortingProducts url={`/city/${cityEn}/featured-products`} />
                    </Flex>
                    <Flex
                        vertical={true}
                        align="center"
                        justify="space-evenly"
                        gap={10} style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}>

                        <Level1 Products={Products} />
                        <Level2
                            pageSize={FEATURED_PRODUCTS.PRODUCTS_PER_PAGE}
                            total={ProductsLen}
                            current={CurrentPage}
                            onChange={SetCurrentPage} />
                    </Flex>
                </>}
            </>
        );
    }

    return <Render Products={Products} ProductsLen={ProductsLen} CurrentPage={currentPage} SetCurrentPage={setCurrentPage}/>
}

const FeaturedProductsListPagination: React.FC<{ order: orderByType, page: number }> = ({ order, page }) => {
    const cityEn = useGetCityParams();
    const t = useTranslations("FeaturedProductsListPagination");
    const { data, isLoading, error } = useGetProductsIdsByFavoriteSWR();

    if (!data && isLoading) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div>{t('title')} {error.message}</div>;
    }

    const FeaturedProductsIds = data?.data;

    if (FeaturedProductsIds.length <= 0) {
        return <Flex vertical gap={10} align="center">
            <Title level={5}>{t('izbrannye-tovary-ne-nai-deny')}</Title>
            <Link href={`/city/${cityEn}/main`} prefetch={true}>{t("na-glavnuyu")}</Link>
        </Flex>
    }

    return <>{FeaturedProductsIds && <RenderFeaturedProducts FeaturedProductsIds={FeaturedProductsIds} order={order} page={page} />}</>
}

export default FeaturedProductsListPagination;

