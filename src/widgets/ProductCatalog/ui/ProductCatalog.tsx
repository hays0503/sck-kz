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
import { MappedPopularProductType } from "api-mapping/product/by_populates";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { FilterType } from "@/features/new-product-filter/ui/SubModule/FilterValueCheckBox";

const { Text } = Typography;

interface ProductsCatalogProps {
  readonly params: { slug: string };

  readonly filter: FilterType[]
  readonly productIds?: number[]|null
}


interface WrapperOnDefaultProps {
  slug: string,

  CurrentPage: number,
  SetCurrentPage: Dispatch<React.SetStateAction<number>>,


  ActiveFilterProductIds: number[],
  SetActiveFilterProductIds: Dispatch<React.SetStateAction<number[]>>,

  SortOrder: string

  filter: FilterType[]
}

const WrapperOnDefault: React.FC<WrapperOnDefaultProps> = (params) => {

  const { slug, SortOrder, CurrentPage } = params;
  const t = useTranslations("Status");
  const cityEn = useGetCityParams()
  const { data, isLoading, error } = useGetProductByCategorySWR({
    category: slug,
    city: cityEn,
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

  filter: FilterType[]
}

const Render: React.FC<RenderProps> = ({
  slug,
  Products,
  ActiveFilterProductIds,
  SetActiveFilterProductIds,
  ProductsLen,
  CurrentPage,
  SetCurrentPage,
  filter
}) => {
  const router = useRouter();
  const t = useTranslations("Render");
  const cityEn = useGetCityParams();
  return (
    <>
      {ProductsLen <= 0 && <>
        <Flex vertical style={{ width: "100%", height: "300px" }}>
          <Flex vertical align="center" justify="" style={{ width: "100%", height: "100%" }}>
            <Text strong style={{ textAlign: "center" }}>{t('v-vybrannom-gorode-net-tovarov-iz-dannoi-kategorii-ili-ikh-uzhe-raskupili-vernites-pozdnee')}</Text>
            <Button
              style={{ padding: "20px", backgroundColor: "#4954f0", color: "#FFFF", zIndex: 999 }}
              onClick={() => router.back()}
            >
              {t('nazad')}
            </Button>
          </Flex>
          <Flex justify="center" style={{ width: "100%", height: "250px" }}>
            <Image src="/logo.svg" alt="logo" height={250} width={250} />
          </Flex>
        </Flex>
      </>}
      {ProductsLen > 0 && <><Flex style={{ width: "100%", background: "#FFF" }} justify="space-between">
        <SortingProducts url={`/city/${cityEn}/catalog/category-slug/${slug}`} />
        <Filter
          dataSpecifications={filter}
          dropFilter={() => { SetActiveFilterProductIds([]); SetCurrentPage(1); } }
          filterActive={ActiveFilterProductIds}
          setFilterActive={SetActiveFilterProductIds} 
          SetCurrentPage={SetCurrentPage} />
      </Flex>
        <Flex
          vertical={true}
          align="center"
          justify="space-evenly"
          gap={10} style={{ width: "100%", height: "100%", backgroundColor: "transparent", padding: "5px" }}>

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


const ProductCatalog: React.FC<ProductsCatalogProps> = ({ params, filter, productIds }) => {
  const { slug } = params;
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [sortOrder] = useQueryState("order", { defaultValue: "stocks__price" });


  const [activeFilterProductIds, setActiveFilterProductIds] = useState<number[]>(productIds??[])

  const renderMode = activeFilterProductIds.length <= 0;

  const renderParams: WrapperOnDefaultProps = {
    filter: filter,

    slug: slug,

    CurrentPage: currentPage,
    SetCurrentPage: setCurrentPage,

    ActiveFilterProductIds: activeFilterProductIds,
    SetActiveFilterProductIds: setActiveFilterProductIds,

    SortOrder: sortOrder
  }

  return <>{renderMode ? <WrapperOnDefault {...renderParams} /> : <WrapperOnFilter {...renderParams} />}</>
};

export default ProductCatalog;
