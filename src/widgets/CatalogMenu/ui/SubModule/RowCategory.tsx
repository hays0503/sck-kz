"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Divider, Flex, Typography } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const { Title } = Typography;

const RowCategory: React.FC<{ item: MappedCategoryType, root?: boolean,v2flag?:boolean  }> = ({ item, root,v2flag  }) => {
  const selectCity = useGetCityParams();
  const localActive = useLocale();
  const RowStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "100%",
  };
  const isRoot = root || item.children.length === 0;
  const url = isRoot
    ? `/city/${selectCity}/catalog/category-slug/${item.slug}`
    : v2flag?`/city/${selectCity}/catalog/menuV2/${item.slug}`:`/city/${selectCity}/catalog/menu/${item.slug}`;

  const name = item.name[localActive] ?? item.name.ru;


  return (
    <>
      <li style={RowStyle}>
        <motion.div
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
          }}
          style={{
            width: "100%",
            height: "100%",
            // background:"linear-gradient(140deg, rgba(255, 191, 14, 0.84) 0%, rgba(255,255,255,1) 100%)",
            border: "1px solid #d7d7d7",
            borderRadius: "8px", // Закругленные углы для более плавного вида
            padding: "12px",
            cursor: "pointer",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)", // Тень по умолчанию
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <Link href={url} prefetch={true} style={{ width: "100%", height: "100%" }}>
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={10} style={{ height: "100%" }}>
                {item.img[0] ? (
                  <Image
                    src={item.img[0]}
                    alt={name ?? ""}
                    width={36}
                    height={36}
                  />
                ) : (
                  <div style={{ width: 24, height: 24 }}></div>
                )}
                <Title level={5} style={{ fontWeight: "600", margin: 0,color:root ? "#328fbf" : "black" }}>
                  {root ? `Посмотреть все товары категории: ${name}` : name}
                </Title>
              </Flex>

              {!isRoot && <Image src="/arrow.svg" alt="arrow" width={36} height={36} />}
            </Flex>
          </Link>

        </motion.div>

      </li>
      <Divider variant="solid" type="vertical" />
    </>
  );
};

export default RowCategory;
