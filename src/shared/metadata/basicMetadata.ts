import { Metadata } from "next";

const basicMetadata = (): Metadata => {
  return {
    title: "sck.kz",
    description: "Зона уникальных цен sck.kz",
    manifest: "/manifest.json",
    icons: "/icon/android-chrome-192x192.png"
  } as Metadata;
};

export default basicMetadata;
