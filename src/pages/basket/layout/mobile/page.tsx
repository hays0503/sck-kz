'use server';

import getCity from '@/entities/City/api/getCity';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { HeaderText } from '@/shared/ui';
import { BasketMobile } from '@/widgets/BasketMobile';
import { FooterMobile } from '@/widgets/FooterMobile';
import { LayoutMain } from '@/widgets/LayoutMain';
import { MappedCityType } from 'api-mapping/city';
import { setRequestLocale } from 'next-intl/server';

interface BasketPageProps {
  readonly params: {
    locale: string;
    city: string;
    basket_id: string;
  };
}

async function BasketPage({ params }: BasketPageProps) {
  const { basket_id, locale } = await params;
  setRequestLocale(locale);
  const urlCity = `/api-mapping/city`;
  const cities: MappedCityType[] = await getCity();

  const fallback = {
    [urlCity]: cities,
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText />}
          content={<BasketMobile basket_id={basket_id} />}
          footerContent={<FooterMobile defaultKey='3' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}

export default BasketPage;
