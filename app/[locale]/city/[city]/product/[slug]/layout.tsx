import { UrlApiWithDomainV1 } from '@/shared/constant/url';
import basicMetadata from '@/shared/metadata/basicMetadata';
import viewportMetadata from '@/shared/metadata/viewportMetadata';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

export async function generateStaticParams() {
  const urlSlugs = `${UrlApiWithDomainV1.getProducts}all/slugs/`;
  const response = await fetch(urlSlugs, { cache: 'force-cache' });

  if (!response.ok) {
    console.log(
      'Проблема с запросом слагов продуктов для прирендера ',
      await response.text(),
    );
    return [];
  }

  const dataSlugs = (await response.json()) as string[];

  return dataSlugs.map((slug: string) => ({
    slug: slug,
  }));
}

export default function ProductSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
