import { Flex, Typography } from "antd"
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

const { Text } = Typography;

export const ProfileLabel: React.FC<{ styleActive: CSSProperties, styleActiveBg: string, styleActiveAccent: string }> = ({ styleActive, styleActiveBg, styleActiveAccent }) => {
    const t = useTranslations("ProfileLabel");
    return  <Flex vertical={true} gap={"10px"} align="center">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4 12.78V10.57C10.71 10.3 9.98 10.12 9.22 10.04V9.93C11.59 9.54 13.4 7.48 13.4 5C13.4 2.24 11.16 0 8.4 0C5.64 0 3.4 2.24 3.4 5C3.4 7.48 5.21 9.54 7.58 9.93V10.04C4.39 10.36 1.7 12.52 0.67 15.5C0.28 16.63 0.18 17.85 0.08 19.05L0 20H2.01L2.08 19.05C2.17 17.85 2.26 16.71 2.75 15.66C3.81 13.39 5.97 12 8.4 12C9.47 12 10.49 12.27 11.4 12.78ZM5.4 5C5.4 3.34 6.74 2 8.4 2C10.06 2 11.4 3.34 11.4 5C11.4 6.66 10.06 8 8.4 8C6.74 8 5.4 6.66 5.4 5Z"
        fill={styleActiveBg}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8199 18C16.9245 18 17.8199 17.1046 17.8199 16C17.8199 14.8954 16.9245 14 15.8199 14C14.7154 14 13.8199 14.8954 13.8199 16C13.8199 17.1046 14.7154 18 15.8199 18ZM15.8199 20C18.0291 20 19.8199 18.2091 19.8199 16C19.8199 13.7909 18.0291 12 15.8199 12C13.6108 12 11.8199 13.7909 11.8199 16C11.8199 18.2091 13.6108 20 15.8199 20Z"
        fill={styleActiveAccent}
      />
    </svg>

    <Text style={styleActive}>{t("profil")}</Text>
  </Flex>
}