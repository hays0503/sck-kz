"use client";

import useGetProductByIdsSWR from "@/entities/Product/model/getProductByIdsSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { MappedPopularProductType, orderByType } from "api-mapping/product/by_populates";
import { Level1, Level2 } from "./SubComponent";
import { FEATURED_PRODUCTS } from "@/shared/constant/featured-products";
import { parseAsInteger, useQueryState } from "nuqs";
import { SortingProducts } from "@/features/sorting-products";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { CSSProperties, Dispatch } from "react";
import useGetProductsIdsByFavoriteSWR from "@/entities/Product/model/getProductsIdsByFavoriteSWR";

const { Title, Text } = Typography;

const RenderFeaturedProducts: React.FC<{
    FeaturedProductsIds: number[],
    order: orderByType,
    page: number,
    style?: CSSProperties
}> = ({ FeaturedProductsIds, order, page, style }) => {
    const t = useTranslations("RenderFeaturedProducts");
    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [sortOrder] = useQueryState("order", { defaultValue: order ?? "stocks__price" });
    const cityEn = useGetCityParams();

    const { data, isLoading, error } = useGetProductByIdsSWR({
        ids: Array.isArray(FeaturedProductsIds) ? FeaturedProductsIds : [],
        city: cityEn,
        orderBy: sortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
        page
    });

    if (!data && isLoading) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div>{t('error')} {error.message}</div>;
    }

    const Products = data?.results || [];
    const ProductsLen = data?.len || 0;

    const Render: React.FC<{
        Products: MappedPopularProductType[],
        ProductsLen: number,
        CurrentPage: number,
        SetCurrentPage: Dispatch<React.SetStateAction<number>>
    }> = ({ Products, ProductsLen, CurrentPage, SetCurrentPage }) => {
        const router = useRouter();
        const t = useTranslations("Render");

        return (
            <>
                {ProductsLen <= 0 ? (
                    <Flex vertical>
                        <Flex vertical align="center" style={{ width: "100%", height: "100%" }}>
                            <Text strong style={{ textAlign: "center" }}>
                                {t('v-vybrannom-gorode-net-tovarov-iz-dannoi-kategorii-ili-ikh-uzhe-raskupili-vernites-pozdnee')}
                            </Text>
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
                ) : (
                    <Flex vertical style={{
                        ...style,
                        width: "100%",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        height: "80dvh",
                        overflowX: "hidden",
                        overflowY: "scroll",
                        border: "0.33px solid  #D9D9D9",
                    }}>
                        <Flex style={{ width: "100%", background: "#FFF" }} justify="space-between">
                            <SortingProducts url={`/city/${cityEn}/featured-products`} />
                        </Flex>
                        <Flex
                            vertical
                            align="center"
                            justify="space-evenly"
                            gap={10}
                            style={{
                                width: "100%",
                                height: "fit-content",
                                backgroundColor: "transparent"
                            }}
                        >
                            <Level1 Products={Products} />
                            {ProductsLen > FEATURED_PRODUCTS.PRODUCTS_PER_PAGE && (
                                <Level2
                                    pageSize={FEATURED_PRODUCTS.PRODUCTS_PER_PAGE}
                                    total={ProductsLen}
                                    current={CurrentPage}
                                    onChange={SetCurrentPage}
                                />
                            )}
                        </Flex>
                    </Flex>
                )}
            </>
        );
    };

    return (
        <Render
            Products={Products}
            ProductsLen={ProductsLen}
            CurrentPage={currentPage}
            SetCurrentPage={setCurrentPage}
        />
    );
};

const FeaturedProductsListPagination: React.FC<{
    order: orderByType,
    page: number,
    style?: CSSProperties
}> = ({ order, page, style }) => {
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

    if (!Array.isArray(FeaturedProductsIds) || FeaturedProductsIds.length === 0) {
        return (
            <Flex vertical gap={10} align="center" style={style}>
                <Title level={5}>{t('izbrannye-tovary-ne-nai-deny')}</Title>
                <Link href={`/city/${cityEn}/main`} prefetch>{t("na-glavnuyu")}</Link>
            </Flex>
        );
    }

    return (
        <RenderFeaturedProducts
            FeaturedProductsIds={FeaturedProductsIds}
            order={order}
            page={page}
            style={style}
        />
    );
};

export default FeaturedProductsListPagination;
