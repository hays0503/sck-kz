import { Flex, Space, Typography } from "antd";

import { RightOutlined } from "@ant-design/icons";
import styles from "./CatalogNavigation.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import React from "react";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { Link } from "@/i18n/routing";
const { Text } = Typography;

interface CatalogHoveredProps {
  setHoveredElement: (Category: MappedCategoryType) => void;
  Category: MappedCategoryType;
  isHover: boolean;
}

const CatalogHovered: React.FC<React.HTMLAttributes<HTMLLIElement> & CatalogHoveredProps> = (props) => {
  const { setHoveredElement, Category, isHover } = props;
  const localActive = useLocale();
  const currentCity = useGetCityParams();
  const text = Category.name?.[localActive] ?? "";
   return (
    <li
      onMouseEnter={() => {
        setHoveredElement(Category);
      }}
      role="hover-element"
      className={`${styles.navigationElement} ${styles.listElementHover}`}
      style={{
        color: isHover ? "#ffa600" : "#000000",
      }}
    >
      <Flex justify="space-between" align="baseline">
        <Space>
          {Category.img[0] && (
            <Image
              alt="image icon"
              priority={true}
              width={32}
              height={32}
              src={Category.img[0]}
            />
          )}
          <Link
            href={`/city/${currentCity}/catalog/category-slug/${Category.slug}`}
            style={{
              color: isHover ? "#ffa600" : "#000000",
            }}
          >
            <Text
              style={{
                color: isHover ? "#ffa600" : "#000000",
              }}
              role="navigation-item"
            >
              {text}
            </Text>
          </Link>
        </Space>
        <RightOutlined />
      </Flex>
    </li>
  );
};

export default CatalogHovered;
