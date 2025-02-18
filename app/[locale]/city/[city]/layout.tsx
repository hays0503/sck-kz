
import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { getDataCity, MappedCityType } from "api-mapping/city";
import { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { CSSProperties } from "react";


export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();


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
    <html lang={locale} style={{overflow: "hidden"}}>
      <body className={inter.className} style={{
        overflow: "hidden",
        WebkitOverflowScrolling:"touch"
      }as CSSProperties}>
        <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
