"use client";

import { useGetProductByCategorySWR } from "@/entities/Product/model";
import { PRODUCT } from "@/shared/constant/product";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { Level1, Level2 } from "./SubComponent";
import { SortingProducts } from "@/features/sorting-products";
import { Filter } from "@/features/new-product-filter";
import useGetProductByIdsSWR from "@/entities/Product/model/getProductByIdsSWR";
import { Dispatch, useState } from "react";
import { MappedPopularProductType } from "api-mapping/product/populates";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";

const { Text } = Typography;

interface ProductsCatalogProps {
  params: { slug: string };
}


interface WrapperOnDefaultProps {
  Slug: string,

  CurrentPage: number,
  SetCurrentPage: Dispatch<React.SetStateAction<number>>,


  ActiveFilterProductIds: number[],
  SetActiveFilterProductIds: Dispatch<React.SetStateAction<number[]>>,

  SortOrder: string
}

const WrapperOnDefault: React.FC<WrapperOnDefaultProps> = (params) => {
  const { Slug, SortOrder, CurrentPage } = params;
  const t = useTranslations("Status");
  const { data, isLoading, error } = useGetProductByCategorySWR({
    category: Slug,
    city: useGetCityParams(),
    orderBy: SortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
    page: CurrentPage
  });

  if (!data && isLoading) {
    return <div>{t('zagruzka')}</div>;
  }

  if (error) {
    return <div>{t('oshibka')}: {error.message}</div>;
  }

  const renderProps: RenderProps = {
    ...params,
    Products: data?.results ?? [],
    ProductsLen: data?.len ?? 0,
  }

  return <Render {...renderProps} />
}

interface WrapperOnFilter extends WrapperOnDefaultProps {
  ActiveFilterProductIds: number[]
}

const WrapperOnFilter: React.FC<WrapperOnFilter> = (params) => {
  const { SortOrder, CurrentPage, ActiveFilterProductIds } = params;
  const t = useTranslations("Status");
  const { data, isLoading, error } = useGetProductByIdsSWR({
    ids: ActiveFilterProductIds,
    city: useGetCityParams(),
    orderBy: SortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
    page: CurrentPage
  })

  if (!data && isLoading) {
    return <div>{t('zagruzka')}</div>;
  }

  if (error) {
    return <div>{t('oshibka')}: {error.message}</div>;
  }

  const renderProps: RenderProps = {
    ...params,
    Products: data?.results ?? [],
    ProductsLen: data?.len ?? 0,
  }

  return <Render {...renderProps} />
}

interface RenderProps extends WrapperOnDefaultProps {
  Products: MappedPopularProductType[],
  ProductsLen: number,
}

const Render: React.FC<RenderProps> = ({
  Slug, Products, ActiveFilterProductIds, SetActiveFilterProductIds, ProductsLen, CurrentPage, SetCurrentPage
}) => {
  const router = useRouter();
  const t = useTranslations("Render");
  const cityEn = useGetCityParams();
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
      {ProductsLen > 0 && <><Flex style={{ width: "100%", background: "#FFF" }} justify="space-between">
        <SortingProducts url={`/city/${cityEn}/catalog/category-slug/${Slug}`} />
        <Filter category={Slug} filterActive={ActiveFilterProductIds} setFilterActive={SetActiveFilterProductIds} />
      </Flex>
        <Flex
          vertical={true}
          align="center"
          justify="space-evenly"
          gap={10} style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}>

          <Level1 Products={Products} />
          {
            ProductsLen > PRODUCT.PRODUCT_PER_PAGE &&
            <Level2 pageSize={PRODUCT.PRODUCT_PER_PAGE} total={ProductsLen} current={CurrentPage} onChange={SetCurrentPage} />
          }
        </Flex>
      </>}
    </>
  );
}


const ProductCatalog: React.FC<ProductsCatalogProps> = ({ params }) => {
  const { slug } = params;
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [sortOrder] = useQueryState("order", { defaultValue: "stocks__price" });


  const [activeFilterProductIds, setActiveFilterProductIds] = useState<number[]>([])

  const renderMode = activeFilterProductIds.length <= 0;

  const renderParams: WrapperOnDefaultProps = {
    Slug: slug,

    CurrentPage: currentPage,
    SetCurrentPage: setCurrentPage,

    ActiveFilterProductIds: activeFilterProductIds,
    SetActiveFilterProductIds: setActiveFilterProductIds,

    SortOrder: sortOrder
  }

  return <>{renderMode ? <WrapperOnDefault {...renderParams} /> : <WrapperOnFilter {...renderParams} />}</>
};

export default ProductCatalog;
