'use server';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { HeaderText } from '@/shared/ui';
import { FooterMobile } from '@/widgets/FooterMobile';
import { LayoutMain } from '@/widgets/LayoutMain';
import { ProfileMobile } from '@/widgets/ProfileMobile';
import { setRequestLocale } from 'next-intl/server';

const ProfilePage = async (props: { params: { locale: string } }) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return (
    <ProvidersServer>
      <ProvidersClient fallback={{}}>
        <LayoutMain
          headerContent={<HeaderText />}
          content={<ProfileMobile />}
          footerContent={<FooterMobile defaultKey='4' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProfilePage;
