import React from "react";
import { Button,  message } from "antd";
import { ShareAltOutlined } from '@ant-design/icons';
import { useTranslations } from "next-intl";

const ShareButton = () => {
  const [messageApi, contextHolder] = message.useMessage(); // API для уведомлений
  const t = useTranslations("ShareButton");
  const shareCurrentUrl = () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .then(() => {
          messageApi.success(t('ssylka-uspeshno-otpravlena'), 2); // Успешное уведомление
        })
        .catch(() => {
          messageApi.error(t('ne-udalos-otpravit-ssylku'), 2); // Уведомление об ошибке
        });
    } else {
      messageApi.info(
        t('funkciya-podelitsya-ne-podderzhivaetsya-v-vashem-brauzere'),
        2
      );
    }
  };

  return (
    <>
      {contextHolder} {/* Контекст уведомлений */}
      <Button
        type="default"
        onClick={shareCurrentUrl}
        icon={
            <ShareAltOutlined />
        }/>
    </>
  );
};

export default ShareButton;
