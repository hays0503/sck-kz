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

  const componentColor0 = `#fcb900`;
  // const componentColor1 = `#423795`;
  // const componentColor2 = `#873695`;
  // const componentColor3 = `#a93695`;
  // const componentColor4 = `#dc2329`;
  const componentColor5 = `#FFFFFF`;
  // const componentColor6 = `#fcb9007a`;

  

  return <Flex component={'li'} style={
    {
      // border:'1px solid rgb(232, 232, 232)',
      width: `${width}dvw`,
      height: `${width}dvw`,
      maxHeight: `${maxWidth}px`,
      maxWidth: `${maxWidth}px`,
      // backgroundColor: "#fcb900",
      borderRadius: "10px",
      overflow: "hidden",
      // background: `linear-gradient(45deg,
      //           ${componentColor1} 25%,
      //           ${componentColor2} 50%,
      //           ${componentColor3} 75%,
      //           ${componentColor4} 100%)`
      background: `linear-gradient(90deg,
      ${componentColor0} 1%,      
      ${componentColor5} 100%)`
    }}>
    <Link style={{
      width: "100%", height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",

    }} href={url} >
      <Flex style={{ paddingTop: "5px", paddingLeft: "10px" }}>
        <Title level={5} style={{ color: "black" }}>{name}</Title>
      </Flex>
      <Flex align="flex-start" justify="flex-end" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {img && <Image src={img} alt={name} width={80} height={80} />}
      </Flex>
    </Link>
  </Flex>
};

export default RowCategory;
