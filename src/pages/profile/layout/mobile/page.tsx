"use server"
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProfileMobile } from "@/widgets/ProfileMobile";
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
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={70}
          headerContent={<HeaderText text={t('profil')}/>}
          content={<ProfileMobile/>}
          footerContent={<FooterMobile defaultKey="4"/>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProfilePage;
