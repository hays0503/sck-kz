"use server";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { FooterMobile } from "@/widgets/FooterMobile";
import { HeaderText } from "@/shared/ui";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { FeaturedProductsListPagination } from "@/widgets/FeaturedProductsListPagination/ui";
import { LayoutMain } from "@/widgets/LayoutMain";
import { CSSProperties } from "react";

type FeaturedProductsPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
    city: string;
  }>;
  searchParams: Promise<SearchParams>;
};

export default async function FeaturedProductsPage(props: FeaturedProductsPageProps) {
  const { searchParams } = await props;
  const { page, order } = searchParamsCache.parse(await searchParams);
  const t = await getTranslations("FeaturedProductsPage");
  return (
    <ProvidersServer>
      <ProvidersClient fallback={{}}>
        <LayoutMain
          headerContent={
            <HeaderText
              text={
                t('izbrannye-tovary')
              }
            />
          }

          content={<FeaturedProductsListPagination order={order} page={page} style={{
            "--sck-columns-on-page": "2"
          } as CSSProperties}/>}

          footerContent={
            <FooterMobile defaultKey="4" />
          }

        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
