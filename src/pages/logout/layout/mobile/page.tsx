"use server";
import { Logout } from "@/features/logout";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";

import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";
import { getTranslations } from "next-intl/server";


const LogoutPage = async (
//   {
//   params,
// }: {
//   params: { locale: string; city: string };
// }
) => {
  const t = await getTranslations("Logout");
  const fallback = {};
  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={
            <Flex vertical={true} gap={10} justify="center" align="center">
              <HeaderText text={t("logout")} />
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
