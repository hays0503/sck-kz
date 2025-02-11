"use client";

import { SWRConfig } from "swr";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";
import '@ant-design/v5-patch-for-react-19';
import HyperDX from '@hyperdx/browser';

export function ProvidersClient({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}) {



  HyperDX.init({
    apiKey: process.env.HYPERDX_API_KEY ?? "",
    service: 'SCK-FRONTEND',
    tracePropagationTargets: [/api/i, /api-mapping/i], // Set to link traces from frontend to backend requests
    consoleCapture: true, // Capture console logs (default false)
    advancedNetworkCapture: true, // Capture full HTTP request/response headers and bodies (default false)
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
