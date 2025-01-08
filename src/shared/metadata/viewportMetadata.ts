import type { Viewport } from "next";

const viewportMetadata = (): Viewport => {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#ffffff",
  } as Viewport;
};

export default viewportMetadata;