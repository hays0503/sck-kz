"use client";
import { useEffect, useState } from "react";
import { getGoogleUrl } from "../api";

const useLoginWithGoogle = () => {
  const [urlToGoogleAuth, setUrlToGoogleAuth] = useState<string | undefined>(undefined);
  const [googleAuthUrl, setGoogleAuthUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    getGoogleUrl().then(({ url }) => {
      setUrlToGoogleAuth(url);
    });
  }, []); // adding [] to avoid repeated calls

  useEffect(() => {
    if (urlToGoogleAuth) {
      try {
        setGoogleAuthUrl(new URL(urlToGoogleAuth).href);
      } catch (error) {
        console.error("Invalid Google Auth URL", error);
      }
    }
  }, [urlToGoogleAuth]);

  return googleAuthUrl;
};

export default useLoginWithGoogle;
