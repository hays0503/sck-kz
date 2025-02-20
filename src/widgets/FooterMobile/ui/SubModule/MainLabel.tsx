import { Flex, Typography } from "antd"
import { Property } from "csstype";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties } from "react";

const { Text } = Typography;

type TLength = (string & {}) | 0
interface MainLabelProps {
  styleActive?: CSSProperties
  text?: string
  size?: Property.Width<TLength | undefined>
}

export const MainLabel: React.FC<MainLabelProps> = ({ styleActive, text, size = 5 }) => {
  const t = useTranslations("MainLabel");
  const imageContainerStyle: CSSProperties = {
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    height: size,
    contain: "strict",
  }
  return (
    <Flex vertical={true} gap={5} align="center" justify="center">
      <Flex align="center" justify="center" style={imageContainerStyle}>
        <Flex align="center" justify="center" style={{
          borderRadius: 3,
          backgroundColor: "#FFC00E",
          width: "100%",
          height: size
          }}>
          <Image src="/logo.svg" alt="logo" fill />
        </Flex>
      </Flex>
      <Text style={{
        ...{ ...styleActive },
        textAlign: "center",
        lineHeight: "1em"
      }}>
        {t("glavnaya")} {text && <><br />{text}</>}
      </Text>
    </Flex>
  )
}