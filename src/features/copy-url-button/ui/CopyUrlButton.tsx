import React from "react";
import { Button, message } from "antd";
import { CopyOutlined } from '@ant-design/icons';
import { useTranslations } from "next-intl";
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
      /></>
  );
};

export default CopyUrlButton;