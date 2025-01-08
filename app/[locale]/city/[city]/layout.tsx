import basicMetadata from "@/shared/metadata/basicMetadata";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

export const metadata: Metadata = basicMetadata();

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
