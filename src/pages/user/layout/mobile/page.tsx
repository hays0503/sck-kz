"use server"
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { UserMobile } from "@/widgets/UserMobile";
import { getTranslations } from "next-intl/server";

const ProfilePage = async (
//   {
//   params,
// }: {
//   params: { locale: string; city: string };
// }
) => {
  const fallback = {};

  const t = await getTranslations("Profile");

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText text={t('dannye-polzovatelya')}/>}
          content={<UserMobile/>}
          footerContent={<FooterMobile defaultKey="4"/>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProfilePage;
