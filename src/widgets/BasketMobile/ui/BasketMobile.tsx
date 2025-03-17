"use client";
import { Flex, Typography } from "antd";
import React from "react";

import { BasketDetail, BasketInfo, ProductsInBasket } from "./SubModule";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { usePathname } from "next/navigation";
import useGetBasketProductsSWR from "@/entities/Basket/model/getBasketProductsSWR";

interface IBasketMobileProps {
  readonly basket_id: string;
}

const { Text } = Typography

const BasketMobile: React.FC<IBasketMobileProps> = ({ basket_id }) => {
  const t = useTranslations("BasketMobile");
  const { data: fetchBasket, error } = useGetBasketProductsSWR(basket_id);
  const accessToken = useReadLocalStorage<{ token: string }>("accessToken");
  const pathname = usePathname();
  const city = useGetCityParams();
  const Empty = () => {
    return (
      <Flex justify="center" align="center" vertical={true}>
        <Typography.Title level={3}>{t("korzina-pusta")}</Typography.Title>
        <Link href={`/city/${city}/main`} prefetch={true}>{t("na-glavnuyu")}</Link>
      </Flex>
    );
  };


  const ToOrder = ({ accessToken }: { accessToken: string | undefined }) => {
    if (accessToken) {
      return (<Flex
        align="center"
        justify="center">
        <Link prefetch={true} href={`/city/${city}/order/${basket_id}`} style={{
          width: "100%",
          height: 50,
          backgroundColor: "#4954F0",
          color: "white",
          borderRadius: 10,
          textAlign: "center",
          alignContent: "center",
        }}>
          {t('oformit-tovar')}
        </Link>
      </Flex>)
    } else {
      return (<Flex
        align="center"
        justify="center">
        <Link prefetch={true} href={`/city/${city}/login-redirect/${pathname}`} style={{
          width: "100%",
          height: 50,
          backgroundColor: "#4954F0",
          color: "white",
          borderRadius: 10,
          textAlign: "center",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          alignItems: "center"
        }}>
          <ShoppingCartOutlined />
          <Text style={{ color: "white" }}>{t('avtorizuites-dlya-prodolzhenie-oformlenie')}</Text>
          <ShoppingCartOutlined />
        </Link>
      </Flex>)
    }
  }

  if (!fetchBasket) {
    return <Empty />
  }

  if (error) {
    return <Empty />;
  }

  return (
    <Flex justify="center" align="center" gap={10} style={{ width: "100%", paddingTop: "10px" }}>
      <Flex vertical={true} style={{ width: "95%" }} gap={10}>
        <ProductsInBasket Products={fetchBasket} />
        <BasketInfo />
        <ToOrder accessToken={accessToken?.token} />
        <BasketDetail Products={fetchBasket} />
      </Flex>
    </Flex>
  );
};

export default BasketMobile;
