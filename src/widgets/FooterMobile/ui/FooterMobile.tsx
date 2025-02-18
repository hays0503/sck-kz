"use client";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Tabs, TabsProps } from "antd";
import { CSSProperties, useState } from "react";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { BasketLabel, CatalogLabel, MainLabel, ProfileLabel, returnStyleActive, returnStyleActiveAccent, returnStyleActiveBg } from "./SubModule";



export default function FooterMobile({ defaultKey }: { defaultKey?: string }) {
  const currentCity = useGetCityParams();
  const [current, setCurrent] = useState<string>(defaultKey ?? "1");
  const router = useRouter();

  const uuid_id = useReadLocalStorage<string>("uuid_id");

  const items: TabsProps["items"] = [
    {
      label: <MainLabel styleActive={returnStyleActive("1", current)} />,
      key: "1",
    },
    {
      label: <CatalogLabel
        styleActive={returnStyleActive("2", current)}
        styleActiveBg={returnStyleActiveBg("2", current)}
        styleActiveAccent={returnStyleActiveAccent("2", current)} />,
      key: "2",
    },
    {
      label: <CatalogLabel
        styleActive={returnStyleActive("5", current)}
        styleActiveBg={returnStyleActiveBg("5", current)}
        styleActiveAccent={returnStyleActiveAccent("5", current)}
        text="V2"
        />,
      key: "5",
    },
    {
      label: <BasketLabel
      uuid_id={uuid_id}
      styleActive={returnStyleActive("3", current)}
      styleActiveBg={returnStyleActiveBg("3", current)}
      styleActiveAccent={returnStyleActiveAccent("3", current)}
      />,
      key: "3",
    },
    {
      label: <ProfileLabel
        styleActive={returnStyleActive("4", current)}
        styleActiveBg={returnStyleActiveBg("4", current)}
        styleActiveAccent={returnStyleActiveAccent("4", current)} />,

      key: "4",
    },
  ];

  const TabsProperties: TabsProps = {
    defaultActiveKey: current,
    style: { "--ant-tabs-horizontal-item-gutter": "3.5dvw" } as CSSProperties,
    accessKey: current,
    onTabClick: (key) => setCurrent(key),
    size: "small",
    centered: true,
    tabPosition: "bottom",
    items: items,
  };

  return (
    <Flex
      style={{ width: "100%", height: "100%" }}
      justify="center"
      align="center"
    >
      <Tabs        
        {...TabsProperties}
        onTabClick={(key: string) => {
          // Если выбран профиль
          if (key === "1") {
            router.push(`/city/${currentCity}/main`)
          }
          if (key === "2") {
            router.push(`/city/${currentCity}/catalog/menu/main`)
          }
          if (key === "3") {
            router.push(`/city/${currentCity}/basket/${uuid_id}`)
          }
          if (key === "4") {
            router.push(`/city/${currentCity}/profile`)
          }
          if (key === "5") {
            router.push(`/city/${currentCity}/catalog/menuV2/main`)
          }
        }}
      />
    </Flex>
  );
}
