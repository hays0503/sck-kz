

// Declare the ksWidgetInitializer variable
declare const ksWidgetInitializer: {
  reinit: () => void;
};
import { useTranslations } from "next-intl";
import Script from "next/script";
import { useState } from "react";
import { Modal, Button, Input, Flex } from "antd";
import { useLocalStorage } from "@undefined/usehooks-ts";
import { getSmsAuthToken, useSendSms } from "@/features/login-with-sms";
import type { GetProps } from "antd";
import { InputNumberPhoneKz } from "@/shared/ui";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import CityEnToRu from "@/shared/constant/city";
type OTPProps = GetProps<typeof Input.OTP>;

export default function Credit({
  prod_article,
}: {
  prod_article: number|string 
}) {
  const t = useTranslations("Credit");

  const [rerender, setRerender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberString, setNumberString] = useState<string>("");
  const [smsCode, setSmsCode] = useState<string>("");
  const [isMaskVisible, setIsMaskVisible] = useState(true);
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const { smsIdentifier, setPhone } = useSendSms();

  const cityEn = useGetCityParams();
  const cityRu = CityEnToRu[cityEn];


  const kaspiCity: Record<string, number> = {
    Абай: 353220100,
    Акколь: 113220100,
    Аксай: 273620100,
    Аксу: 551610000,
    Актау: 471010000,
    Актобе: 151010000,
    Алматы: 750000000,
    Алтай: 634820100,
    Аральск: 433220100,
    Аркалык: 391610000,
    Арысь: 511610000,
    Астана: 710000000,
    Атырау: 231010000,
    Аягоз: 633420100,
    Байконыр: 431910000,
    Балхаш: 351610000,
    Бейнеу: 473630100,
    Есик: 194020100,
    Жанаозен: 471810000,
    Жаркент: 195620100,
    Жезказган: 351810000,
    Жетысай: 514420100,
    Житикара: 394420100,
    Зайсан: 634620100,
    Кандыагаш: 154820100,
    Караганда: 351010000,
    Каратау: 316220100,
    Каскелен: 195220100,
    Кентау: 612010000,
    Кокшетау: 111010000,
    Конаев: 191610000,
    Костанай: 391010000,
    Кульсары: 233620100,
    Курчатов: 632210000,
    Кызылорда: 431010000,
    Ленгер: 515820100,
    Лисаковск: 392010000,
    Павлодар: 551010000,
    Петропавловск: 591010000,
    Риддер: 156420100,
    Рудный: 392410000,
    Сарань: 352210000,
    Сарыагаш: 515420100,
    Сатпаев: 352310000,
    Семей: 632810000,
    Степногорск: 111810000,
    Талгар: 196220100,
    Талдыкорган: 191010000,
    Тараз: 311010000,
    Текели: 192610000,
    Темиртау: 352410000,
    Туркестан: 512610000,
    Уральск: 271010000,
    "Усть-Каменогорск": 631010000,
    Уштобе: 195020100,
    "Форт-Шевченко": 475220100,
    Хромтау: 156020100,
    Шардара: 616420100,
    Шахтинск: 352810000,
    Шемонаиха: 636820100,
    Шиели: 117055900,
    Шу: 316621100,
    Шымкент: 511010000,
    Щучинск: 117020100,
    Экибастуз: 552210000,
    "п. Глубокое": 634030100,
    "п. Железинка": 554230100,
    "п. Жетыбай": 474239100,
    "п. Курык": 474230100,
    "п. Тобыл": 395430100,
    "п. Шетпе": 474630100,
    "с. Аксукент": 515230100,
    "с. Алга": 153220100,
    "с. Зачаганск": 271035100,
    "с. Кордай": 314851205,
    "с. Косшы": 116651100,
    "с. Узынагаш": 194230100,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sendSms = () => {
    if (numberString.replace(/\D/g, "").length === 10) {
      const number = "8" + numberString.replace(/\D/g, "");
      setPhone(number);
    }
  };

  const verifyCode = () => {
    if (smsIdentifier) {
      getSmsAuthToken(smsCode, smsIdentifier).then((response) => {
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        setIsMaskVisible(false);

        // Инициализация кнопки Kaspi после успешной проверки кода
        setTimeout(() => {
          // Перерисовываем кнопку
          if (typeof ksWidgetInitializer !== "undefined") {
            ksWidgetInitializer.reinit();
          }
        }, 1000); // Задержка для рендеринга кнопки
      });
    }
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setSmsCode(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const isSmsCodeValid = smsCode.length === 4;

  return (
    <div style={{ position: "relative", width: "100%", height: "100px" }}>
      <div
        className="ks-widget"
        data-template="button"
        data-merchant-sku={prod_article}
        data-merchant-code="BUGA"
        data-city={String(kaspiCity[cityRu] ?? "591010000")}
      ></div>
      {isMaskVisible && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100px",
            backgroundColor: "transparent",
            zIndex: 10,
          }}
          onClick={handleOpenModal}
        />
      )}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        title={t("pozhaluista-ispolzuite-dlya-registracii-vash-kaspi-nomer")}
      >
        {!smsIdentifier ? (
          <Flex vertical>
            <InputNumberPhoneKz
              numberString={numberString}
              setNumberString={setNumberString}
            />
            <Button
              type="primary"
              onClick={sendSms}
              disabled={numberString.replace(/\D/g, "").length !== 10}
            >
              {t("poluchit-sms-kod")}
            </Button>
          </Flex>
        ) : (
          <Flex vertical>
            <Input.OTP variant="filled" length={4} {...sharedProps} />
            <Button
              type="primary"
              onClick={verifyCode}
              disabled={!isSmsCodeValid}
            >
              {t('oformit-tovar')}
            </Button>
          </Flex>
        )}
        <Flex style={{ position: "relative", width: "100%", height: "100%" }}>
          <div
            className="ks-widget"
            data-template="button"
            data-merchant-sku={prod_article}
            data-merchant-code="BUGA"
            data-city={String(kaspiCity[cityRu] ?? "591010000")}
          ></div>
          <div
            className="forte-btn"
            data-merchant-id="A2YN7r1ivpxijOlp1E"
            data-articul={prod_article}
            data-city-id={"KZ-SEV-591010000"}
            data-theme="dark"
          ></div>
          {isMaskVisible && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                zIndex: 10,
              }}
              onClick={handleOpenModal}
            />
          )}
        </Flex>
      </Modal>
      <Script
        onReady={() => setRerender(!rerender)}
        id="KS-Widget"
        src="https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js"
      />
      <Script
        onReady={() => setRerender(!rerender)}
        type="text/javascript"
        src="https://cdn-1.forte.kz/assets/forte-market-scripts/buy-credit.js"
      />
    </div>
  );
}