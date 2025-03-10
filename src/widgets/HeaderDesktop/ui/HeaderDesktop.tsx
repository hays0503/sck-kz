"use client";

import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import LogoSCK from "@/shared/ui/LogoSCK/LogoSCK";
import { CategoryListMobile } from "@/widgets/CategoryListMobile";
import { Flex,Typography } from "antd";
import { useTranslations } from "next-intl";
import React, { CSSProperties } from "react";

interface IHeaderMobileProps {
  readonly SelectCity: React.FC;
  readonly ChangeLanguage: React.FC;
  readonly SearchProduct: React.FC;
  readonly CatalogDesktop: React.FC
  readonly UserCabinet: React.FC
  readonly BasketButton: React.FC
}

const {Text} = Typography;

const HeaderDesktop: React.FC<IHeaderMobileProps> = ({
  SelectCity,
  SearchProduct,
  ChangeLanguage,
  CatalogDesktop,
  UserCabinet,
  BasketButton
}) => {
  const cityEn = useGetCityParams();  
  const t = useTranslations("HeaderDesktop");
  const HeaderMobileStyle: CSSProperties = {
    width: "100%",
  };
  return (
    <Flex vertical={true} style={HeaderMobileStyle} gap={10}>
      <Flex gap={10} justify="space-between" align="center">
        <Flex gap={15} justify="flex-start" align="center" style={{
          width: "50%",
          height: "40px"
        }}
        >
          <SelectCity />
          <Link href="tel:+77056550000">
            <Text>{"+7 705 655 00 00"}</Text>
          </Link>
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <ChangeLanguage />
          </Flex>
        </Flex>
        <Flex gap={10} justify="flex-end" align="center" style={{ width: "50%", height: "40px" }}>
          <Link href={`/city/${cityEn}/about/delivery`}>
            <Text>{t('dostavka')}</Text>
          </Link>
          <Link href={`/city/${cityEn}/about/payment`}>
            <Text>{t('oplata')}</Text>
          </Link>
          <Link href={`/city/${cityEn}/about/guarantees`}>
            <Text>{t('garantiya')}</Text>
          </Link>
          <Link href={`/city/${cityEn}/about/contact`}>
            <Text>{t('kontakty')}</Text>
          </Link>

        </Flex>
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        style={{ width: "100%" }}
        gap={25}
      >
        <LogoSCK size="small" />
        <CatalogDesktop />
        <SearchProduct />
        <UserCabinet />
        <BasketButton />

      </Flex>

      <Flex style={{ width: "100%", padding: "5px", background: "linear-gradient(90deg,#ffc600,rgba(255, 255, 255, 0))" }}>
        <CategoryListMobile />
      </Flex>

    </Flex>
  );
}
export default HeaderDesktop;