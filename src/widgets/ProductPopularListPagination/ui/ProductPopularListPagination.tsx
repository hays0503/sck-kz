"use client";

import useGetProductPopulatesSWR from "@/entities/Product/model/getProductPopulatesSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Typography } from "antd";
import { parseAsInteger, useQueryState } from "nuqs";
import { Level1, Level2 } from "./SubComponent";
import { MappedPopularProductType } from "api-mapping/product/by_populates";
import { POPULATES_PRODUCTS } from "@/shared/constant/populates";
import { useTranslations } from "next-intl";

const { Title } = Typography

// interface ProductPopularListPaginationProps{

// }


const ProductPopularListPagination: React.FC = () => {
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
    <Flex vertical={true} gap={5} align="center" justify="space-evenly" style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#f5f5f5",
      padding: "5px"
    }}>
      <Flex vertical align="start" justify="center" style={{ width: "100%" }}>
        <Title level={5} style={{ verticalAlign:"middle",margin:0}}>{tt('populyarnye')}</Title>
      </Flex>
      <Flex justify={"center"} align={"center"} style={{ width: "100%" }}>
        <Level1 Products={PopulatesProducts} />
      </Flex>
      {
        PopulatesProductsLen > POPULATES_PRODUCTS.POPULATES_PER_PAGE &&
        <Level2 pageSize={POPULATES_PRODUCTS.POPULATES_PER_PAGE} total={PopulatesProductsLen} current={currentPage} onChange={setCurrentPage} />
      }
    </Flex>
  );
}

export default ProductPopularListPagination