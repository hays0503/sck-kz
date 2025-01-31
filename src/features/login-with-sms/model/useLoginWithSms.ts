"use client";
import { useEffect, useState } from "react";
import { getSmsAuthToken } from "../api";
import { GetSmsAuthTokenResponse } from "../api/getSmsAuthToken";

const useLoginWithSms = () => {
  const [userData, setData] = useState<GetSmsAuthTokenResponse|null>(null);
  const [dataForSendSms, setDataForSendSms] = useState<
     {
        codeInSms: string;
        phone_number_id: string;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    if (dataForSendSms) {
      (async () => {
        const auth = await getSmsAuthToken(
          dataForSendSms.codeInSms,
          dataForSendSms.phone_number_id
        );
        setData(auth);
      })();
    }
  }, [dataForSendSms]);
  return {
    userData,
    setDataForSendSms,
  };
};

export default useLoginWithSms;
