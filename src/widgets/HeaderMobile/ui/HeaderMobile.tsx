"use client";

import { Flex} from "antd";
import React, { CSSProperties } from "react";

interface IHeaderMobileProps {
  readonly SelectCity: React.FC;
  readonly ChangeLanguage: React.FC;
  readonly SearchProduct: React.FC;
}


const HeaderMobile: React.FC<IHeaderMobileProps> = ({ 
  SelectCity, SearchProduct,ChangeLanguage
 }) => {
  const HeaderMobileStyle: CSSProperties = {
    width: "100%",
    borderBottom: "1px solid #41414145",
  };
  return (
    <Flex vertical={true} style={HeaderMobileStyle}>
      <Flex justify="space-around" align="center" style={{ 
        width: "100%",
        height:"67px",
        background: "linear-gradient(180deg,#ffc600,rgb(255, 255, 255))" }}>
        <SelectCity/>
        <Flex gap={10} justify="center" align="center" wrap="wrap">
          <ChangeLanguage/>
        </Flex>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        style={{ width: "100%" }}
      >
        <SearchProduct/>
      </Flex>    

     
    </Flex>
  );
}
export default HeaderMobile;