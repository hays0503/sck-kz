"use client";

import { useGetProductByCategorySWR } from "@/entities/Product/model";
import { PRODUCT } from "@/shared/constant/product";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex } from "antd";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { Level1, Level2 } from "./SubComponent";
import { SortingProducts } from "@/features/sorting-products";
import { Filter } from "@/features/new-product-filter";
import useGetProductByIdsSWR from "@/entities/Product/model/getProductByIdsSWR";
import { useState } from "react";


interface ProductsCatalogProps {
  params: { slug: string };
}

const ProductCatalog: React.FC<ProductsCatalogProps> = ({ params }) => {
  const { slug } = params;
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [sortOrder] = useQueryState("order", { defaultValue: "stocks__price" });
  const t = useTranslations("Status");


  const [activeFilterProductIds, setActiveFilterProductIds] = useState<number[]>([])

  const { data, isLoading, error } = useGetProductByCategorySWR({
    category: slug,
    city: useGetCityParams(),
    orderBy: sortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
    page: currentPage
  });

  const {
    data: dataProductWithFilter,
    // isLoading: isLoadingProductWithFilter,
    // error: errorProductWithFilter
  } = useGetProductByIdsSWR({
    ids: activeFilterProductIds,
    city: useGetCityParams(),
    orderBy: sortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price",
    page: currentPage
  })

  if (!data && isLoading) {
    return <div>{t('zagruzka')}</div>;
  }

  if (error) {
    return <div>{t('oshibka')}: {error.message}</div>;
  }

  const CategoryProducts = data?.results ?? [];
  const CategoryProductsLen: number = data?.len ?? 0;

  const FilterProducts = dataProductWithFilter?.results ?? [];
  const FilterProductsLen: number = dataProductWithFilter?.len ?? 0;

  const filterSelected = activeFilterProductIds.length > 0

  const Products = !filterSelected ? CategoryProducts : FilterProducts;
  const ProductsLen = !filterSelected ? CategoryProductsLen : FilterProductsLen;

  return (
    <>
      <Flex style={{ width: "100%", background: "#FFF" }} justify="space-between">
        <SortingProducts slugCatalog={slug} />
        <Filter category={slug} filterActive={activeFilterProductIds} setFilterActive={setActiveFilterProductIds} />
      </Flex>
      <Flex
        vertical={true}
        align="center"
        justify="space-evenly"
        gap={10} style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}>

        <Level1 Products={Products} />
        <Level2 pageSize={PRODUCT.PRODUCT_PER_PAGE} total={ProductsLen} current={currentPage} onChange={setCurrentPage} />
      </Flex></>
  );
};

export default ProductCatalog;
