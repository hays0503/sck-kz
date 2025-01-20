
import basicMetadata from "@/shared/metadata/basicMetadata";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { getDataCity, MappedCityType } from "api-mapping/city";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

export const metadata: Metadata = basicMetadata();

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export async function generateStaticParams() {
  try {
    const response = await getDataCity();

    if (response) {
      return response.results.map((city: MappedCityType) => ({
        city: city['en'],
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}



export default async function CityLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string; city: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
