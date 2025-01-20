"use client";

import { SWRConfig } from "swr";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense } from "react";
import '@ant-design/v5-patch-for-react-19';

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

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
