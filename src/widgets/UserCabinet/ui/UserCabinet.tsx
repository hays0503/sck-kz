"use client";

import { Button } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

 const UserCabinet: React.FC = () => {
  const t = useTranslations("UserCabinet");
  return (
    <Button
      icon={<Image src="/login.svg" width={32} height={32} alt="login" />}
      size="large"
    >
      {t('lichnyi-kabinet')}
    </Button>
  )
}

export default UserCabinet;