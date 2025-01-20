import { getCategorySlugs } from "api-mapping/category/slugs/api/getCategorySlugs";



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