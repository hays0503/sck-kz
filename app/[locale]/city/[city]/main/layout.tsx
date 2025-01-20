import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});


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
        {children}
      </body>
    </html>
  );
}
