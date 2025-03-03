import basicMetadata from "@/shared/metadata/basicMetadata";
import viewportMetadata from "@/shared/metadata/viewportMetadata";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = basicMetadata();
export const viewport: Viewport = viewportMetadata();

export default function GuaranteesLayout({children}: {children: React.ReactNode}) {
    return children;
}