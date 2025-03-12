"use client";
import { Button, Flex, Input, message, Typography } from "antd";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useSendSms } from "../model";
import { getSmsAuthToken } from "../api";
import type { GetProps } from "antd";
import { useLocalStorage } from "@undefined/usehooks-ts";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { InputNumberPhoneKz } from "@/shared/ui";
import "./LoginWithSms.css";
import { OTPRef } from "antd/es/input/OTP";
const { Title, Text, Link } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

export default function LoginWithSms({ callbackUrl }: { callbackUrl: string | undefined }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [numberString, setNumberString] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const { smsIdentifier, setPhone, back } = useSendSms();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const [, setUserId] = useLocalStorage("user_id", { user_id: "" });
  const t = useTranslations("LoginWithSms");
  const [text, setText] = useState<string>("");
  const refOtp = useRef(null);

  const city = useGetCityParams();
  const router = useRouter();

  async function autoReadSMS(cb) {
    if (!("OTPCredential" in window)) {
      console.log("WebOTP API не поддерживается в этом браузере.");
      return;
    }
    const ac = new AbortController();
    try {
      const content = await navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      });
      if (content?.code) {
        cb(content.code);
      }
    } catch (e) {
      console.error("Ошибка получения OTP:", e);
    } finally {
      ac.abort();
    }
  }

  useEffect(() => {
    autoReadSMS(setCode);
  }, []);

  useEffect(() => {
    refOtp.current?.focus();
  }, [smsIdentifier]);

  const SendSmsTo = () => {
    if (numberString.replace(/\D/g, "").length === 10) {
      const number = "8" + numberString.replace(/\D/g, "");
      setPhone(number);
    }
  };
  const SendCodeInSms = () => {
    if (smsIdentifier) {
      getSmsAuthToken(code, smsIdentifier).then((response) => {
        if (response.statusCode === 201) {
          setAccessToken({ token: response.data.access.token });
          setRefreshToken({ token: response.data.refresh.token });
          setUserId({ user_id: response.data.access.user_id });
          if (callbackUrl) {
            window.open(callbackUrl);
          }
          router.push(`/city/${city}/profile`);
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
    if (text.length === 4) {
      if (refOtp.current) refOtp.current.blur();
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <Flex
      style={{
        width: "100%",
      } as CSSProperties}
      vertical={true}
      gap={10}
      justify="center"
      align="center"
    >
      {contextHolder}
      <Title
        style={{
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-0.6%",
          textAlign: "center",
        }}
      >
        {!smsIdentifier ? t("t-vvedite-nomer-telefona") : t("vvedite-kod-iz-sms")}
      </Title>
      {smsIdentifier && (
        <Text
          style={{
            color: "#8C8C8C",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "-0.6%",
            textAlign: "center",
          }}
        >
          {t("my-otpravili-kod-podtverzhdeniya-na-nomer")}
        </Text>
      )}
      {smsIdentifier && (
        <Text
          style={{
            color: "#4954F0",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "-0.6%",
            textAlign: "center",
          }}
        >
          +7{numberString}
        </Text>
      )}
    </Flex>
  );
}
