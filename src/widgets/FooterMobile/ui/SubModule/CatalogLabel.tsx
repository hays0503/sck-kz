import { Flex, Typography } from "antd"
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

const { Text } = Typography;

export const CatalogLabel: React.FC<{ styleActive: CSSProperties, styleActiveBg: string, styleActiveAccent: string }> = ({ styleActive, styleActiveBg, styleActiveAccent }) => {
    const t = useTranslations();
    return <Flex vertical={true} gap={"10px"} align="center">
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.75 13V13.12C3.68 13.12 4.25 13.61 4.25 14.66V15H6.25V13H2.75ZM10.25 9H18.25V7H10.25V9ZM22.25 5H10.25V3H22.25V5ZM2.25 12C2.25 11.45 2.7 11 3.25 11H7.25C7.8 11 8.25 11.45 8.25 12V16C8.25 16.55 7.8 17 7.25 17H3.25C2.7 17 2.25 16.55 2.25 16V12ZM2.75 5V5.12C3.68 5.12 4.25 5.61 4.25 6.66V7H6.25V5H2.75ZM2.25 4C2.25 3.45 2.7 3 3.25 3H7.25C7.8 3 8.25 3.45 8.25 4V8C8.25 8.55 7.8 9 7.25 9H3.25C2.7 9 2.25 8.55 2.25 8V4Z"
                fill={styleActiveBg}
            />
            <path
                d="M12.9901 17.8502L12.4001 13.1502L17.1001 13.7402L16.5401 14.2902C16.1501 14.6802 16.1501 15.3202 16.5401 15.7102L18.8401 18.0002L17.2501 19.5902L14.9601 17.2902C14.5701 16.9002 13.9401 16.9002 13.5401 17.2902L12.9901 17.8502ZM11.3801 11.0102C10.6701 10.9202 10.1801 11.4702 10.2601 12.1202L11.2601 20.1202C11.3701 20.9902 12.3701 21.3002 12.9601 20.7102L14.2501 19.4102L16.5401 21.7102C16.9401 22.1002 17.5701 22.1002 17.9601 21.7102L20.9601 18.7102C21.3501 18.3202 21.3501 17.6802 20.9601 17.2902L18.6701 15.0002L19.9601 13.7102C20.5701 13.1002 20.2201 12.1102 19.3801 12.0102L11.3801 11.0102Z"
                fill={styleActiveAccent}
            />
        </svg>
        <Text style={styleActive}>{t("katalog")}</Text>
    </Flex>
}