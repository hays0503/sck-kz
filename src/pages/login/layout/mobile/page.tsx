"use server";
import { LoginWithGoogle } from "@/features/login-with-google";
import { LoginWithSms } from "@/features/login-with-sms";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import LogoSCK from "@/shared/ui/LogoSCK/LogoSCK";

import { LayoutCustom } from "@/widgets/LayoutCustom";
import { Flex } from "antd";
import { getTranslations } from "next-intl/server";


const LoginPage = async ({
  params,
}: {
  params: { locale: string; city: string; link: string[]|undefined };
}) => {
  const fallback = {};
  
  const urlCallback = params?.link && `/${params?.link.join("/")}`; 

  const t = await getTranslations();

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={70}
          headerContent={
            <Flex vertical={true} gap={10} justify="center" align="center">
              <HeaderText text={t("login")} />
            </Flex>
          }
          content={
            <Flex
              vertical={true}
              gap={10}
              justify="center"
              align="center"
              style={{ width: "100%" }}
            >
              <LogoSCK size="large" />
              <Flex
                vertical={true}
                gap={10}
                justify="center"
                align="stretch"
                style={{ width: "100%" }}
              >
                <LoginWithSms callbackUrl={urlCallback} />
              </Flex>
              <LoginWithGoogle callbackUrl={urlCallback} />
            </Flex>
          }
          footerContent={<></>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default LoginPage;
