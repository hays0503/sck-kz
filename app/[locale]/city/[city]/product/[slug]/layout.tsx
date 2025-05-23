import getProductBySlug, {
  responseTypeProductBySlug,
} from '@/entities/Product/api/getProductBySlug';
import { UrlApiWithDomainV1 } from '@/shared/constant/url';
import basicMetadata from '@/shared/metadata/basicMetadata';
import viewportMetadata from '@/shared/metadata/viewportMetadata';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = viewportMetadata();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, city, locale } = await params;

  const productRes: responseTypeProductBySlug = await getProductBySlug({
    slug,
    city,
  });

  const metadata: Metadata = basicMetadata();

  if ('name' in productRes.data && productRes?.data?.name[locale]) {
    const nameProduct = productRes.data.name[locale];
    if ('desc' in productRes.data && productRes?.data?.desc?.name[locale]) {
      const descriptionProduct = productRes.data.desc?.name[locale];

      return {
        ...metadata,
        openGraph: {
          ...metadata.openGraph,
          title: nameProduct,
          description: descriptionProduct,
        },
        title: nameProduct,
        description: descriptionProduct,
      };
    } else {
      return {
        ...metadata,
        openGraph: {
          ...metadata.openGraph,
          title: nameProduct,
        },
        title: nameProduct,
        description: 'sck.kz',
      };
    }
  } else {
    return {
      ...metadata,
      title: 'sck.kz',
      description: 'sck.kz',
    };
  }
}

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
