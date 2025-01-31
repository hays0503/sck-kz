"use client";
import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useSendSms } from "../model";
import { getSmsAuthToken } from "../api";
import type { GetProps } from "antd";
import { useLocalStorage } from "@undefined/usehooks-ts";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { InputNumberPhoneKz } from "@/shared/ui";

const { Title, Text } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

export default function LoginWithSms({callbackUrl}:{callbackUrl:string|undefined}) {
  const [numberString, setNumberString] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const { smsIdentifier, setPhone } = useSendSms();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const t = useTranslations();

  const city = useGetCityParams();
  const router = useRouter();

  const SendSmsTo = () => {
    if (numberString.replace(/\D/g, "").length === 10) {
      const number = "8" + numberString.replace(/\D/g, "");
      setPhone(number);
    }
  };
  const SendCodeInSms = () => {
    if (smsIdentifier) {
      getSmsAuthToken(code, smsIdentifier).then((response) => {
        // debugger;
        setAccessToken(response.access);
        setRefreshToken(response.refresh);
        if(callbackUrl) {
          window.open(callbackUrl)
        }
        router.push(`/city/${city}/main`);
      });
    }
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setCode(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };


  return (
    <Flex
      style={{
        border: "1px solid #D2D2D2",
        borderRadius: "4px",
        width: "100%",
      }}
      vertical={true}
      gap={10}
      justify="center"
      align="center"
    >
      <Title>
        <Text>{t("t-vvedite-nomer-telefona")}</Text>
      </Title>
      {!smsIdentifier ? (
        <Flex
          vertical={true}
          gap={10}
          style={{
            width: "100%",
          }}
        >
          <InputNumberPhoneKz
            numberString={numberString}
            setNumberString={setNumberString}
          />
          <Button style={{backgroundColor:"#4954F0",color:"#fff"}} onClick={SendSmsTo}>{t("poluchit-sms-kod")}</Button>
        </Flex>
      ) : (
        <Flex
          vertical={true}
          gap={10}
          style={{
            width: "100%",
          }}
        >
          <Input.OTP variant="filled" length={4} {...sharedProps} />
          <Button style={{backgroundColor:"#4954F0",color:"#fff"}}  onClick={SendCodeInSms}>Авторизоваться</Button>
        </Flex>
      )}
    </Flex>
  );
}
