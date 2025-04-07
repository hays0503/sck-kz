"use server"
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { UserMobile } from "@/widgets/UserMobile";

const ProfilePage = async (
) => {
  const fallback = {};

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText/>}
          content={<UserMobile/>}
          footerContent={<FooterMobile defaultKey="4"/>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProfilePage;
