"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Typography } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale } from "next-intl";
import Image from "next/image";

const { Title } = Typography;

const RowCategory: React.FC<{ item: MappedCategoryType, root?: boolean }> = ({ item, root }) => {
  const selectCity = useGetCityParams();
  const localActive = useLocale();

  const isRoot = root || item.children.length === 0;
  const url = isRoot
    ? `/city/${selectCity}/catalog/category-slug/${item.slug}`
    : `/city/${selectCity}/catalog/menuV2/${item.slug}`;

  const name = item.name[localActive] ?? item.name.ru;

  const width = 29
  const maxWidth = 150

  const img = item.img?.[0] ? item.img?.[0] : null;

  return <Flex component={'li'} style={
    {
      width: `${width}dvw`,
      height: `${width}dvw`,
      maxHeight:`${maxWidth}px`,
      maxWidth:`${maxWidth}px`,
      backgroundColor: "#efefef",
      borderRadius: "10px",
      overflow: "hidden",
    }}>
    <Link style={{
      width: "100%", height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",

    }} href={url} >
      <Flex style={{paddingTop:"5px",paddingLeft:"10px"}}>
        <Title level={5} style={{ color: "gray" }}>{name}</Title>
      </Flex>
      <Flex align="flex-start" justify="flex-end" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {img && <Image src={img} alt={name} width={80} height={80} />}
      </Flex>
    </Link>
  </Flex>
};

export default RowCategory;
