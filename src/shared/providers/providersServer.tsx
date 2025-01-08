"use server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/shared/styles/Reset.scss";
import { ConfigProvider } from "antd";
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';
import kzKZ from 'antd/locale/kk_KZ';

export async function ProvidersServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  const locale = messages.locale;

  const antdLocale = () => {
    switch (locale) {
      case 'ru-RU': return ruRU
      case 'en-US': return enUS
      case 'kz-KZ': return kzKZ
      default: return ruRU
    }
  }


  return (

    <AntdRegistry>
      <ConfigProvider theme={{ cssVar: true }} locale={antdLocale()}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ConfigProvider>
    </AntdRegistry>

  );
}
