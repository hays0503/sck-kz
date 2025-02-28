"use client";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import { Button, Typography } from "antd";
import { useLocale } from "next-intl";
import { CSSProperties } from "react";
const { Text } = Typography;
const ButtonNavigation: React.FC<{
  item: string;
  style?: CSSProperties;
  role?: string;
  slug: string
}> = ({ item, style, role,slug }) => {
  const localActive = useLocale();
  const currentCity = useGetCityParams();
  return (
    <>
      <Button
        type="text"
        style={{ ...style, backgroundColor: "#F5F5F5BF", marginRight: "8px" }}
        role={role}
        aria-label={item}
        onClick={() => {
          // перенаправление на страницу с категорией
          window.location.href = `/${localActive}/${currentCity}/catalog/${slug}`;
        }}        
      >
        <Text>{item}</Text>
      </Button>
    </>
  );
};
export default ButtonNavigation;
