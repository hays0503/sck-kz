"use client";

import { Flex, Typography } from "antd";
import React from "react";

interface IHeaderMobileProps {
  readonly SelectCity: React.FC;
  readonly ChangeLanguage: React.FC;
  readonly SearchProduct: React.FC;
}

const { Text } = Typography;

const HeaderMobile: React.FC<IHeaderMobileProps> = ({ 
  SelectCity, SearchProduct,ChangeLanguage
 }) => {
  return (
    <Flex vertical={true} gap={5} style={{ width: "100%" }}>
      <Flex justify="space-around" align="center" style={{ width: "100%" }}>
        <SelectCity/>
        <Flex gap={10} justify="center" align="center" wrap="wrap">
          <Text>{"+7 705 655 00 00"}</Text>
          <ChangeLanguage/>  
        </Flex>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        gap={10}
        style={{ width: "100%" }}
      >
        <SearchProduct/>
      </Flex>    

     
    </Flex>
  );
}
export default HeaderMobile;