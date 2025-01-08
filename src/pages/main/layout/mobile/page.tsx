import { SearchParams } from "nuqs";
import { searchParamsCache } from "./searchParams";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";

type PageProps = {
  params: {
    slug: string;
    locale: string;
    city: string;
  };
  searchParams: Promise<SearchParams>;
};
export default async function HomePage({ params, searchParams }: PageProps) {
  const { page } = searchParamsCache.parse(await searchParams);


  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={{}}>
        <main>{page}</main>
      </ProvidersClient>
    </ProvidersServer>
  );
}
