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
  const [text, setText] = useState<string>("");
  const { smsIdentifier, setPhone, back } = useSendSms();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const [, setUserId] = useLocalStorage("user_id", { user_id: "" });
  const t = useTranslations("LoginWithSms");
  const refOtp = useRef<OTPRef>(null);

  const city = useGetCityParams();
  const router = useRouter();

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        } as CredentialRequestOptions)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((otp: any) => {          
          // setCode(otp.code);
          setText(JSON.stringify(otp));                    
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
  }, []);

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
            window.open(callbackUrl)
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
      if(refOtp.current) refOtp.current.blur();
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
      <Title style={{
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>{!smsIdentifier ? t("t-vvedite-nomer-telefona") : t('vvedite-kod-iz-sms')}
      </Title>
      {smsIdentifier && <Text style={{
        color: "#8C8C8C",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>{t('my-otpravili-kod-podtverzhdeniya-na-nomer')}</Text>}
      {smsIdentifier && <Text style={{
        color: "#4954F0",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        letterSpacing: "-0.6%",
        textAlign: "center"
      }}>+7{numberString}</Text>}
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
          gap={20}
          align="center"
          justify="center"
          style={{
            width: "100%"
          } as CSSProperties}
        >
          {/* <Input.OTP

            ref={refOtp}
            style={{ width: "100%", "--ant-input-input-font-size": "14px" } as CSSProperties}
            variant="filled"
            size="large"
            length={4}
            type="tel"
            {...sharedProps} /> */}
            <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="ant-otp-input"
            autoComplete="one-time-code"
            pattern="[0-9]{4}"
            inputMode="numeric"
            />
          <Button style={{ backgroundColor: "#4954F0", color: "#fff", height: "55px", width: "100%" }} onClick={SendCodeInSms}>{t('avtorizovatsya')}</Button>
          <Text>{JSON.stringify(text)}</Text>
          <Link underline onClick={back}>{t('vvesti-drugoi-nomer-telefona')}</Link>
        </Flex>
      )}
    </Flex>
  );
}
