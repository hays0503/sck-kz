'use server';

import { SearchParams } from 'nuqs';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { FooterMobile } from '@/widgets/FooterMobile';
import { HeaderText } from '@/shared/ui';
import { LayoutMain } from '@/widgets/LayoutMain';
import { SearchProduct } from '@/features/search-products';
import { Specification } from '@/shared/types/specification';
import { Flex } from 'antd';
import { FilterMobile } from '@/widgets/FilterMobile';

type PageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export async function getSpecif(): Promise<Specification[]> {
  const res = await fetch('http://185.100.67.246:8888/api/v1/specif/', {
    next: { tags: ['specif'], revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch specifications');
  }

  return res.json();
}

export default async function CatalogPage(props: PageProps) {
  const { params } = await props;
  const specifications = await getSpecif();
  console.log(params)
  return (
    <ProvidersServer>
      <ProvidersClient fallback={{}}>
        <LayoutMain
          headerContent={<HeaderText SearchProduct={SearchProduct} />}
          content={
            <Flex vertical gap={10}>
              <FilterMobile specifications={specifications} />
            </Flex>
          }
          footerContent={<FooterMobile defaultKey='2' />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
