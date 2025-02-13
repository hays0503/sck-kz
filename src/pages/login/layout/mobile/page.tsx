"use server";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";

import { LayoutCustom } from "@/widgets/LayoutCustom";
import { LoginMobile } from "@/widgets/LoginMobile/ui";
import { Flex} from "antd";
import { getTranslations } from "next-intl/server";

const LoginPage = async ({
  params,
}: {
  params: { locale: string; city: string; link: string[]|undefined };
}) => {
  const fallback = {};
  
  const urlCallback = params?.link && `/${params?.link.join("/")}`; 

  const t = await getTranslations("LoginPage");

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={0}
          headerContent={
            <Flex vertical={true} gap={10} justify="center" align="center">
              <HeaderText text={t("login")} />
            </Flex>
          }
          content={<LoginMobile urlCallback={urlCallback} />}
          footerContent={<></>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default LoginPage;
