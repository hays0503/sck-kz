"use client";

import useGetProductPopulatesSWR from "@/entities/Product/model/getProductPopulatesSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex,Typography } from "antd";
import { parseAsInteger, useQueryState } from "nuqs";
import { Level1, Level2 } from "./SubComponent";
import { MappedPopularProductType } from "api-mapping/product/populates";
import { POPULATES_PRODUCTS } from "@/shared/constant/populates";
import { useTranslations } from "next-intl";
import { ResponsiveAligns, ResponsiveJustify } from "./SubComponent/Level1";

const {Title,Text}= Typography

interface ProductPopularListPaginationProps{
  justify:React.CSSProperties['justifyContent'],
  align:React.CSSProperties['alignItems']
}


const ProductPopularListPagination:React.FC<ProductPopularListPaginationProps> = ({justify,align}) => {
  // Параметры адресной строки для номера страницы
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const t = useTranslations("Status");
  const tt = useTranslations("ProductPopularListPagination");
  const { data, isLoading, error } = useGetProductPopulatesSWR({
    city: useGetCityParams(),
    orderBy: "none_sort",
    page: currentPage
  });

  if (!data && isLoading) {
    return <div>{t('zagruzka')}</div>;
  }

  if (error) {
    return <div>{t('oshibka')}: {error.message}</div>;
  }

  const PopulatesProducts: MappedPopularProductType[] = data?.results ?? [];
  const PopulatesProductsLen: number = data?.len ?? 0;

  return (
    <Flex vertical={true} align="center" justify="space-evenly" gap={10} style={{ 
      width: "100%",
      height: "100%",
      backgroundColor: "#FFF",
      paddingBottom:"25px" }}>
      <Flex vertical align="start" justify="start" style={{ width: "95%",padding:"15px" }}> 
        <Title level={5}>{tt('populyarnye')}</Title>
        <Text style={{ color: "#808185" }}>{tt('uspey-kupit')}</Text>
      </Flex>
      <Flex justify={"center"} align={"center"} style={{width:"100%"}}>
        <Level1 Products={PopulatesProducts} justify={justify as ResponsiveJustify} align={align as ResponsiveAligns}/>
      </Flex>
      {
        PopulatesProductsLen > POPULATES_PRODUCTS.POPULATES_PER_PAGE && 
        <Level2 pageSize={POPULATES_PRODUCTS.POPULATES_PER_PAGE} total={PopulatesProductsLen} current={currentPage} onChange={setCurrentPage}/>
      }
    </Flex>
  );
}

export default ProductPopularListPagination