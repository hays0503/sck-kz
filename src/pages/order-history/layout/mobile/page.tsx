'use server';

import { ProvidersClient } from '@/shared/providers/providersClient';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { HeaderText } from '@/shared/ui';
import { FooterMobile } from '@/widgets/FooterMobile';
import { LayoutMain } from '@/widgets/LayoutMain';
import { OrderHistory } from '@/widgets/OrderHistory';
import { setRequestLocale } from 'next-intl/server';

const OrderHistoryPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const fallback = {};
  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText />}
          content={<OrderHistory isMobileDevice={true} />}
          footerContent={<FooterMobile defaultKey='4' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default OrderHistoryPage;
