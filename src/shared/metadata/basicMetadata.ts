import { Metadata } from "next";

const basicMetadata = (): Metadata => {
  return {
    title: "sck.kz",
    description: "Зона уникальных цен sck.kz",
    manifest: "/manifest.json",
  } as Metadata;
};

export default basicMetadata;
