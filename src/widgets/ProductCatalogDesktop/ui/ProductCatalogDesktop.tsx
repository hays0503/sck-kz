"use client";

import { useGetProductByCategorySWR } from "@/entities/Product/model";
import { PRODUCT } from "@/shared/constant/product";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { Level1, Level2 } from "./SubComponent";
import { SortingProducts } from "@/features/sorting-products";
import useGetProductByIdsSWR from "@/entities/Product/model/getProductByIdsSWR";
import { Dispatch, memo, useRef, useState } from "react";
import { MappedPopularProductType } from "api-mapping/product/populates";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import FilterDesktop from "@/features/new-product-filter/ui/FilterDesktop";
import { useResizeObserver } from "@undefined/usehooks-ts";
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

// eslint-disable-next-line react/display-name
const WrapperOnDefault: React.FC<WrapperOnDefaultProps> = memo((params) => {
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
})

interface WrapperOnFilter extends WrapperOnDefaultProps {
  ActiveFilterProductIds: number[]
}

// eslint-disable-next-line react/display-name
const WrapperOnFilter: React.FC<WrapperOnFilter> = memo((params) => {
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
})

interface RenderProps extends WrapperOnDefaultProps {
  Products: MappedPopularProductType[],
  ProductsLen: number,
}

// eslint-disable-next-line react/display-name
const Render: React.FC<RenderProps> = memo(({
  Slug, Products, ActiveFilterProductIds, SetActiveFilterProductIds, ProductsLen, CurrentPage, SetCurrentPage
}) => 
{
  const router = useRouter();
  const t = useTranslations("Render");
  const cityEn = useGetCityParams();
  const catalogRef = useRef<HTMLDivElement>(null);
    
  const { height: catalogHeight = 500 } = useResizeObserver({
    ref: catalogRef,
    box: "border-box",
  });

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
        <Flex
          style={{ width: "100%", height: "auto", backgroundColor: "transparent" }}>
          <FilterDesktop
            height={catalogHeight}
            category={Slug}
            filterActive={ActiveFilterProductIds}
            setFilterActive={SetActiveFilterProductIds}
            dropFilter={() => {
              SetActiveFilterProductIds([])
              SetCurrentPage(1)
            }}
          />
          <Flex
            ref={catalogRef}
            gap={25}
            vertical align="end" justify="end"
            style={{ width: "100%", height: "auto" }}>
            <SortingProducts url={`/city/${cityEn}/catalog/category-slug/${Slug}`} />
            <Level1 Products={Products} />
            {
              ProductsLen > PRODUCT.PRODUCT_PER_PAGE &&
              <Level2 pageSize={PRODUCT.PRODUCT_PER_PAGE} total={ProductsLen} current={CurrentPage} onChange={SetCurrentPage} />
            }
          </Flex>

        </Flex>
      </>}
    </>
  );
})


const ProductCatalogDesktop: React.FC<ProductsCatalogProps> = ({ params }) => {
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

  console.log("activeFilterProductIds=>",activeFilterProductIds)

  return <>{renderMode ? <WrapperOnDefault {...renderParams} /> : <WrapperOnFilter {...renderParams} />}</>
};

export default ProductCatalogDesktop;
