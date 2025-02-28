"use client";

import { CSSProperties, useState } from "react";
import { CatalogPopover } from "./SubComponents/CatalogPopover";
import { useTranslations } from "next-intl";
import { Divider, Flex, Typography } from "antd";
import styles from "./CatalogDesktop.module.scss";
import useGetCategoryAllSWR from "@/entities/Category/model/getCategoryAllSWR";

const { Text } = Typography;

export default function CatalogDesktop() {
  const [isOpen, setIsOpen] = useState(true);
    const CatalogStyleText: CSSProperties = {
    color: "white",
    // padding:"5px"
  };

  const t = useTranslations("CatalogDesktop");

  const { data, isLoading, error } = useGetCategoryAllSWR();

  if (!data && isLoading) {
    return <div>Загрузка</div>
  }

  if (error) {
    return <div>Ошибка</div>
  }

  const CategoriesData = data?.results ?? [];

  return (<Flex>
    {CategoriesData && <CatalogPopover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      CategoriesData={CategoriesData}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          cursor: "pointer",
          borderRadius: "4px",
          backgroundColor: "#3F54CF",
          width:"max-content",
        }}
      >
        <div
          className={
            isOpen ? styles.animationHoverOn : styles.animationHoverOff
          }
        ></div>
        <Divider
          type="vertical"
          dashed={true}
          plain={true}
          style={{ borderColor: "white", height: "36px" }}
        />
        <Flex justify="center" align="center" style={{ width: "100%", height: "100%",padding:"0px 10px" }}>
          <Text style={CatalogStyleText}>{t("catalog")}</Text>
        </Flex>
      </Flex>
    </CatalogPopover>}</Flex>
  )
}
