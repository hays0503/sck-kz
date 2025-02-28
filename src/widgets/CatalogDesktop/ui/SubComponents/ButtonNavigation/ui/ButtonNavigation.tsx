"use client";

import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Typography } from "antd";
import { CSSProperties } from "react";
const { Text } = Typography;
const ButtonNavigation: React.FC<{
  item: string;
  style?: CSSProperties;
  role?: string;
  slug: string
}> = ({ item, style, role,slug }) => {
  const currentCity = useGetCityParams();
  const route = useRouter();
  return (
    <>
      <Button
        type="text"
        style={{ ...style, backgroundColor: "#F5F5F5BF", marginRight: "8px" }}
        role={role}
        aria-label={item}
        onClick={() => {
          // перенаправление на страницу с категорией
          route.push(`/city/${currentCity}/catalog/category-slug/${slug}`);
        }}        
      >
        <Text>{item}</Text>
      </Button>
    </>
  );
};
export default ButtonNavigation;
