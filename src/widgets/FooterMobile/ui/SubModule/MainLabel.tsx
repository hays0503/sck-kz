import { Flex, Typography } from "antd"
import { Property } from "csstype";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

const { Text } = Typography;

type TLength = (string & {}) | 0
interface MainLabelProps {
  styleActive?: CSSProperties
  styleActiveBg: string,
  text?: string
  size?: Property.Width<TLength | undefined>
}

export const MainLabel: React.FC<MainLabelProps> = ({ styleActive, text, size = 5, styleActiveBg }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg"
               width={size}
                height={size}
                viewBox="0 0 24 24">
                  
        <path 
          fill={styleActiveBg} 
          d="M9.922 16.37c0-1.561 0-2.599 2.078-2.59 2.078.008 2.079 1.029 2.078 2.59v1.562c0 1.036 0 1.467.304 1.771s.735.304 1.774.304c2.078 0 3.117 0 3.636-.519s.52-2.26.52-5.195c0-1.038.023-3.629-.372-4.499-.372-.82-1.29-2.016-2.745-3.283C15.406 4.955 12.988 3.383 12 3.383S8.593 4.955 6.805 6.51C5.349 7.778 4.432 8.973 4.059 9.794c-.395.87-.371 3.46-.371 4.499 0 2.936 0 4.676.52 5.195.519.52 1.558.52 3.636.52 1.039 0 1.47 0 1.774-.305.304-.304.304-.735.304-1.771z">
        </path>
      </svg>
      </Flex>
      <Text style={{
        ...{ ...styleActive },
        textAlign: "center",
        lineHeight: "1em",
        minWidth: '50px'
      }}>
        {t("glavnaya")} {text && <><br />{text}</>}
      </Text>
    </Flex>
  )
}