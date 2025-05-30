import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata, Viewport } from "next";
import {setRequestLocale} from 'next-intl/server';
import { Inter } from "next/font/google";
import { locales, routing } from "@/i18n/routing";
import basicMetadata from "@/shared/metadata/basicMetadata";
import {notFound} from 'next/navigation';
import viewportMetadata from "@/shared/metadata/viewportMetadata";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();


export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;


  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
