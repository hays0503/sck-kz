import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();



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

  return (<>{children}</>);
}
