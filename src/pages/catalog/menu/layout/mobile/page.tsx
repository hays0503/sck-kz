"use server";

import { getCategoryRoot } from "@/entities/Category";
import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getCategorySlugs from "@/entities/Category/api/getCategorySlugs";
import { SearchProduct } from "@/features/search-products";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";
import { CatalogMenu } from "@/widgets/CatalogMenu/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";
import { unstable_cache } from "next/cache";

interface CategoryMenuPageProps {
  readonly params: {
    locale: string;
    city: string;
    slug: string;
  };
}

// Функция для статической генерации путей
export async function generateStaticParams() {
  const allCategory = await getCategorySlugs();
  return allCategory
    ? allCategory.results.map((category: string) => ({ slug: category }))
    : [];
}

async function CatalogMenuPage({ params }: CategoryMenuPageProps) {
  const { slug, locale, city } = await params;

  // Ключи для кэширования
  const urlAllCategory = `/api-mapping/category/all/?city=${city}`;
  const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`;

  // Оптимизированные вызовы API с кэшированием
  const [allCategory, categoryRoot] = await Promise.all([
    unstable_cache(() => getCategoryAll(city), [urlAllCategory], { revalidate: 600 })(),
    unstable_cache(() => getCategoryRoot(city), [urlCategoryRoot], { revalidate: 600 })(),
  ]);

  // Поиск категории по slug
  const categoryFind = findCategory(allCategory.results, (category) => category.slug === slug);
  const headerText = categoryFind ? categoryFind.name[locale] : "Каталог";

  // Фоллбек для клиента
  const fallback = { [urlAllCategory]: allCategory };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText text={headerText} SearchProduct={SearchProduct} />}
          content={
            <Flex vertical gap={10} justify="center" align="center" style={{ width: "100%", marginTop: "10px" }}>
              <BannerMobileSlider category={categoryRoot?.results || []} />
              <CatalogMenu slugCategory={slug} />
            </Flex>
          }
          footerContent={<FooterMobile defaultKey="2" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}

export default CatalogMenuPage;
