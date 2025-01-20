import { Flex, Typography } from "antd"
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties } from "react";

const { Text } = Typography;

export const MainLabel: React.FC<{styleActive?: CSSProperties}> = ({styleActive}) => {
    const t = useTranslations();
    return (
        <Flex vertical={true} gap={"10px"} align="center">
          <Flex align="center" justify="center" style={{ width: 43, height: 24,backgroundColor:"#FFC00E",borderRadius:3 }}>
          <Image src="/logo.svg" alt="logo" height={24} width={43} />
          </Flex>
          <Text style={styleActive}>{t("glavnaya")}</Text>
        </Flex>
      )
}