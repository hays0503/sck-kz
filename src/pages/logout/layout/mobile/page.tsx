"use server";
import { Logout } from "@/features/logout";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";

import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";

const LogoutPage = async (

) => {
  const fallback = {};
  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={
            <Flex vertical={true} gap={10} justify="center" align="center">
              <HeaderText />
            </Flex>
          }
          content={<Logout />}
          footerContent={<></>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default LogoutPage;
