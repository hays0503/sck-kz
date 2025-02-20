"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Typography } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

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

  return <motion.div
          whileHover={{
            scale: 1.03, // Легкое увеличение при наведении
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", // Более выраженная тень
            transition: { duration: 0.3, ease: "easeOut" }, // Плавный переход
          }}
          whileTap={{
            scale: 0.98, // Слегка уменьшаем при нажатии
            y: 3, // Легкий сдвиг вниз
            boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.15)", // Эффект вдавливания
            transition: { duration: 0.2, ease: "easeInOut" }, // Плавное нажатие
          }} style={
    {
      border:'1px solid #ffc00e4d',
      width: `${width}dvw`,
      height: `${width}dvw`,
      maxHeight: `${maxWidth}px`,
      maxWidth: `${maxWidth}px`,
      borderRadius: "10px",
      overflow: "hidden",
      background: `linear-gradient(140deg, rgb(255 191 14 / 53%) 0%, rgba(255, 255, 255, 1) 100%)`
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
  </motion.div>
};

export default RowCategory;
