"use server";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";

import { LayoutMain } from "@/widgets/LayoutMain";
import { LoginMobile } from "@/widgets/LoginMobile/ui";
import { getTranslations } from "next-intl/server";

const LoginPage = async ({
  params,
}: {
  params: { locale: string; city: string; link: string[] | undefined };
}) => {
  const fallback = {};

  const urlCallback = params?.link && `/${params?.link.join("/")}`;

  const t = await getTranslations("LoginPage");

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText text={t("login")} />}
          content={<LoginMobile urlCallback={urlCallback} />}
          footerContent={<></>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default LoginPage;
