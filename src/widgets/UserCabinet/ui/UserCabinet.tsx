"use client";

import { useUser } from "@/entities/User";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Text } = Typography;

const UserCabinet: React.FC = () => {
  const t = useTranslations("UserCabinet");
  const { isAnonymous } = useUser();
  const cityEn = useGetCityParams()
  const route = useRouter();
  const onClick = () => {
    if (isAnonymous) {
      route.push(`/city/${cityEn}/login`);
    } else {
      route.push(`/city/${cityEn}/profile`);
    }
  }
  return (
    <Button
      icon={<Image src="/login.svg" width={20} height={20} alt="login" />}
      size="large"
      onClick={onClick}
    >
      <Text style={{
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        letterSpacing: "-0.6px",
        color: "rgba(140, 140, 140, 1)"
      }}>
        {t('lichnyi-kabinet')}
      </Text>
    </Button>
  )
}

export default UserCabinet; 