"use client";
import { Flex } from "antd";
import { Level1, Level2 } from "./SubComponents";
import { useUser } from "@/entities/User";
import React from "react";
import { orderByType } from "api-mapping/product/populates";
import { LoginMobile } from "@/widgets/LoginMobile";
import { UserMobile } from "@/widgets/UserMobile";

const ProfileDesktop: React.FC<{ order: orderByType, page: number }> = ({ order, page }) => {
  const { isAnonymous, info } = useUser();
  const [Content,setContent] = React.useState<React.ReactNode>(!isAnonymous?<LoginMobile urlCallback={'/'}/>:<UserMobile/>);
  return (
    <Flex gap={10} style={{
      width: "100%",
      backgroundColor: "#f5f5f5",
      paddingLeft: "10px",
      paddingRight: "10px"
    }}>
      <Flex vertical={true} gap={5} style={{ width: "40%" }}>
        <Level1 infoUser={info} IsAnonymous={isAnonymous} setContent={setContent} />
        <Level2 infoUser={info} IsAnonymous={isAnonymous} setContent={setContent} page={page} order={order}/>
      </Flex>
      <Flex  style={{ width: "60%" }}>
        {Content}
      </Flex>
        
    </Flex>
  );
};
export default ProfileDesktop;
