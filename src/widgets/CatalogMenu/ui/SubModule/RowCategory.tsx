"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Divider, Flex, Typography } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const { Title } = Typography;

const RowCategory: React.FC<{ item: MappedCategoryType, root?: boolean }> = ({ item, root }) => {
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
    : `/city/${selectCity}/catalog/menu/${item.slug}`;

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
            backgroundColor: "white",
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
              <Flex align="normal" gap={10} style={{ height: "100%" }}>
                {item.img[0] ? (
                  <Image
                    src={item.img[0]}
                    alt={name ?? ""}
                    width={24}
                    height={24}
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
        {/* {!isRoot && (
          <Button
            type="text"
            shape="circle"
            onClick={() =>
              router.push(`/city/${selectCity}/catalog/menu/${item.slug}`)
            }
            style={{ padding: 0 }}
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.263993 0.263605C-0.0874782 0.615078 -0.0874767 1.18493 0.263996 1.5364L4.7276 5.99998L0.263993 10.4636C-0.0874782 10.8151 -0.0874767 11.3849 0.263996 11.7364C0.615469 12.0879 1.18532 12.0879 1.53679 11.7364L6.63679 6.63637C6.98826 6.2849 6.98826 5.71505 6.63679 5.36358L1.53679 0.263602C1.18531 -0.0878686 0.615464 -0.0878673 0.263993 0.263605Z"
                fill="#A6A2A2"
              />
            </svg>
          </Button>
        )} */}
      </li>
      <Divider variant="solid" type="vertical" />
    </>
  );
};

export default RowCategory;
