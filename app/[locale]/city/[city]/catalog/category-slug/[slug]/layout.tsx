import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { getCategorySlugs } from "api-mapping/category/slugs/api/getCategorySlugs";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

export async function generateStaticParams() {
  try {
    const slugs = await (await getCategorySlugs()).json();
    if (slugs) {
      return slugs.results.map((slug: string) => ({
        slug: slug,
      }));
    }
    return [];
  }
  catch {
    return [];
  }
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}