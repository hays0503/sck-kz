import React from "react";
import { Button, message } from "antd";
import { CopyOutlined } from '@ant-design/icons';
import { useTranslations } from "next-intl";
import { Typography } from "antd";
import Style from "./CopyUrlButton.module.css";
const {Text} = Typography;
const CopyUrlButton = () => {
  const [messageApi, contextHolder] = message.useMessage(); // API для уведомлений
  const t = useTranslations("CopyUrlButton");
  const copyCurrentUrl = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        messageApi.success(t('ssylka-uspeshno-skopirovana'), 2); // Успешное уведомление
      })
      .catch(() => {
        messageApi.error(t('ne-udalos-skopirovat-ssylku'), 2); // Уведомление об ошибке
      });
  };

  return (
    <>
      {contextHolder} {/* Контекст уведомлений */}
      <Button
        onClick={copyCurrentUrl}
        icon={<CopyOutlined />}
      >
        <Text className={Style.ButtonText}>{t('kopirovat-ssylku')}</Text>
      </Button>
    </>
  );
};

export default CopyUrlButton;