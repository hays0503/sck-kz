"use client";

import LogoSCK from "@/shared/ui/LogoSCK/LogoSCK";
import { Flex } from "antd";
import React, { CSSProperties } from "react";

interface IHeaderMobileProps {
  readonly SelectCity: React.FC;
  readonly ChangeLanguage: React.FC;
  readonly SearchProduct: React.FC;
  readonly CatalogDesktop: React.FC
  readonly UserCabinet: React.FC
}


const HeaderDesktop: React.FC<IHeaderMobileProps> = ({
  SelectCity, SearchProduct, ChangeLanguage, CatalogDesktop, UserCabinet
}) => {
  const HeaderMobileStyle: CSSProperties = {
    width: "100%",
  };
  return (
    <Flex vertical={true} style={HeaderMobileStyle}>
      <Flex justify="space-between" align="center" style={{
        width: "100%",
        height: "40px"
      }}
      >
        <SelectCity />
        <Flex gap={10} justify="center" align="center" wrap="wrap">
          <ChangeLanguage />
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
        <UserCabinet/>
      </Flex>


    </Flex>
  );
}
export default HeaderDesktop;