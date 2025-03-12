"use client";
import { Flex } from "antd";
import { Level1, Level2, Level3 } from "./SubComponents";
import { useUser } from "@/entities/User";
import { Suspense } from "react";

const ProfileMobile: React.FC = () => {
  const { isAnonymous, info } = useUser();
  return (
    <Flex gap={10} vertical={true} style={{
      width: "100%",
      backgroundColor: "#f5f5f5",
      paddingLeft: "10px",
      paddingRight: "10px"
    }}>
      <Suspense>
        <Level1 infoUser={info} IsAnonymous={isAnonymous} />
      </Suspense>
      <Level2 infoUser={info} IsAnonymous={isAnonymous} />
      <Level3 />
    </Flex>
  );
};
export default ProfileMobile;
