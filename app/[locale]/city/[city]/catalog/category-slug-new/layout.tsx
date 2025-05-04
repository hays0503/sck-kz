import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

// export async function generateStaticParams() {
//   console.log('generateStaticParams');
//   const specif = await getSpecif();

//   const specifCacheRu = specif.map((item: Specification) => item.name_specification);
//   const specifCacheEn = specif.map((item: Specification) => item.name_specification.additional_data.EN);
//   const specifCacheKz = specif.map((item: Specification) => item.name_specification.additional_data.KZ);


//   const specifCache = [...specifCacheRu, ...specifCacheEn, ...specifCacheKz];
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}