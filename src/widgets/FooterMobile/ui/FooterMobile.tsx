"use client";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Tabs, TabsProps } from "antd";
import { CSSProperties, useState } from "react";
import { BasketLabel, CatalogLabel, MainLabel, ProfileLabel, returnStyleActive, returnStyleActiveAccent, returnStyleActiveBg } from "./SubModule";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import "./FooterMobile.css";
export default function FooterMobile({ defaultKey }: { defaultKey?: string }) {
  const currentCity = useGetCityParams();
  const [current, setCurrent] = useState<string>(defaultKey ?? "1");
  const uuid: string | null = useReadLocalStorage<string>("uuid_id")
  const router = useRouter();
  const sizeConstant = "32px";
  const items: TabsProps["items"] = [
    {
      label: <MainLabel styleActive={returnStyleActive("1", current)} styleActiveBg={returnStyleActiveBg("1", current)} size={sizeConstant} />,
      key: "1",
    },
    {
      label: <CatalogLabel
        styleActive={returnStyleActive("2", current)}
        styleActiveBg={returnStyleActiveBg("2", current)}
        styleActiveAccent={returnStyleActiveAccent("2", current)}
        size={sizeConstant}
      />,
      key: "2",
    },
    // {
    //   label: <CatalogLabel
    //     styleActive={returnStyleActive("5", current)}
    //     styleActiveBg={returnStyleActiveBg("5", current)}
    //     styleActiveAccent={returnStyleActiveAccent("5", current)}
    //     size={sizeConstant}
    //     text="V2"
    //   />,
    //   key: "5",
    // },
    {
      label: <BasketLabel
        styleActive={returnStyleActive("3", current)}
        styleActiveBg={returnStyleActiveBg("3", current)}
        styleActiveAccent={returnStyleActiveAccent("3", current)}
        size={sizeConstant}
      />,
      key: "3",
    },
    {
      label: <ProfileLabel
        styleActive={returnStyleActive("4", current)}
        styleActiveBg={returnStyleActiveBg("4", current)}
        styleActiveAccent={returnStyleActiveAccent("4", current)}
        size={sizeConstant}
      />,
      key: "4",
      style: {
        display: "flex",
        alignItems: "flex-start !important",
      }
    },
    {
      label: <ProfileLabel
        styleActive={returnStyleActive("6", current)}
        styleActiveBg={returnStyleActiveBg("6", current)}
        styleActiveAccent={returnStyleActiveAccent("6", current)}
        size={sizeConstant}
        text="V2"
      />,
      key: "6",
      style: {
        display: "flex",
        alignItems: "flex-start !important",
      }
    },
  ];

  const TabsProperties: TabsProps = {
    className: "footerMobile",
    defaultActiveKey: current,
    style: {
      width: "100%",
      "--ant-tabs-horizontal-item-gutter": "2dvw",
      "--ant-margin": "0px",
    } as CSSProperties,
    accessKey: current,
    onTabClick: (key) => setCurrent(key),
    size: "small",
    centered: true,
    tabPosition: "bottom",
    items: items,
  };

  return (
    <Flex
      style={{ width: "100%", height: "100%", paddingBottom: "5px",background: "linear-gradient(0deg,#ffc600,rgb(255, 255, 255))",borderTop: '1px solid #41414145' }}
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
            router.push(`/city/${currentCity}/basket/${uuid}`)
          }
          if (key === "4") {
            router.push(`/city/${currentCity}/profile`)
          }
          if (key === "5") {
            router.push(`/city/${currentCity}/catalog/menuV2/main`)
          }
          if (key === "6") {
            router.push(`/city/${currentCity}/profileV2`)
          }

        }}
      />
    </Flex>
  );
}
