import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});


export default async function CityLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string; city: string };
}) {
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
