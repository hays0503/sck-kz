"use client"
import { LoginWithGoogle } from "@/features/login-with-google"
import { LoginWithSms } from "@/features/login-with-sms"
import LogoSCK from "@/shared/ui/LogoSCK/LogoSCK"
import { Flex, Typography } from "antd"
import { useTranslations } from "next-intl"
import { CSSProperties } from "react"


const { Text } = Typography

interface LoginMobileProps{
    urlCallback?: string
    style?: CSSProperties
}

const LoginMobile: React.FC<LoginMobileProps> = ({ urlCallback,style }) => {
    const t = useTranslations("LoginPage");
    const TextStyle = {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: "400",
        letterSpacing: "-0.6%",
        color: "#8C8C8C",
        textAlign: "center"
    } as CSSProperties
    return <>
        <Flex
            vertical={true}
            gap={35}
            justify="center"
            align="center"
            style={{ width: "100%", height: "100%", padding: "25px",...style }}
        >            
            <LogoSCK size="large" />
            <Flex
                vertical={true}
                justify="center"
                align="stretch"
                style={{ width: "100%" }}
            >
                <LoginWithSms callbackUrl={urlCallback} />
            </Flex>
            <Flex vertical={true} gap={20} justify="center" align="center" style={{ width: "100%"}}>
                <Text style={TextStyle}>{t('ili-voidite-cherez')}</Text>
                <LoginWithGoogle callbackUrl={urlCallback} />
                <Text style={{ ...TextStyle, width: "95%" }}>{t('nazhimaya-knopku-poluchit-sms-kod-ya-podtverzhdayu-chto-oznakomlen-i-soglasen-s-usloviyami-politiki-konfidencialnosti')}</Text>
            </Flex>
        </Flex>
    </>
}

export default LoginMobile