"use client";

import { SWRConfig } from "swr";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense, useEffect } from "react";
import '@ant-design/v5-patch-for-react-19';
import { useLocalStorage, useReadLocalStorage } from "@undefined/usehooks-ts";
import timeCalculate from "@/entities/User/model/timeCalculate";
import { verifyAuth } from "@/entities/User/model/useIsAnonymous";

export function ProvidersClient({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}) {
  const [AccessToken, setAccessToken] = useLocalStorage<{
    expires_at: Date | undefined;
    issued_at: Date | undefined;
    token: string | undefined;
  } | undefined>("accessToken", { expires_at: undefined, token: undefined, issued_at: undefined });

  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>("refreshToken");

  useEffect(() => {
    if (AccessToken?.expires_at && AccessToken?.issued_at) {
      if(timeCalculate(new Date(AccessToken?.expires_at))){
        if(RefreshToken?.token){
          verifyAuth(RefreshToken?.token).then((response) => {
            if (response.isVerified && response.data) {
              setAccessToken(response.data?.access);
            }
          })
        }
      }
    }
    return () => {};
  
  }, [AccessToken?.expires_at, AccessToken?.issued_at,RefreshToken?.token, setAccessToken]);

  return (
    <SWRConfig value={{ fallback }}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
    </SWRConfig>
  );
}
