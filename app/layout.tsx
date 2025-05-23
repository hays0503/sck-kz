
import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();


// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: {children: React.ReactNode}) {
    return children;
}