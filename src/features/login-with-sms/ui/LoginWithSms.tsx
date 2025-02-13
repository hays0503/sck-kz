"use client";
import { Button, Flex, Input, message, Typography } from "antd";
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

export default function LoginWithSms({ callbackUrl }: { callbackUrl: string | undefined }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [numberString, setNumberString] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const { smsIdentifier, setPhone } = useSendSms();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const [, setUserId] = useLocalStorage("user_id", { user_id: "" });
  const t = useTranslations("LoginWithSms");

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

        debugger;
        if (response.statusCode === 201) {
          setAccessToken({ token: response.data.access.token });
          setRefreshToken({ token: response.data.refresh.token });
          setUserId({ user_id: response.data.access.user_id });
          if (callbackUrl) {
            window.open(callbackUrl)
          }
          router.push(`/city/${city}/main`);
        } else {
          messageApi.open({
            type: "error",
            content: t("error"),
          });
        }

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
        width: "100%",
      }}
      vertical={true}
      gap={10}
      justify="center"
      align="center"
    >
      {contextHolder}
      <Title style={{
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>{!smsIdentifier ? t("t-vvedite-nomer-telefona") : t('vvedite-kod-iz-sms')}
      </Title>
      {!smsIdentifier && <Text style={{
        color:"#8C8C8C",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>{t('my-otpravili-kod-podtverzhdeniya-na-nomer')}</Text>}
      {!smsIdentifier && <Text style={{
        color:"#4954F0",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>{numberString}</Text>}
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
          <Button style={{ backgroundColor: "#4954F0", color: "#fff", height: "55px" }} onClick={SendSmsTo}>{t("poluchit-sms-kod")}</Button>
        </Flex>
      ) : (
        <Flex
          vertical={true}
          gap={10}
          style={{
            width: "100%",
          }}
        >

          <Input.OTP variant="filled" length={4} {...sharedProps} type="tel"/>
          <Button style={{ backgroundColor: "#4954F0", color: "#fff" }} onClick={SendCodeInSms}>Авторизоваться</Button>
        </Flex>
      )}
    </Flex>
  );
}
