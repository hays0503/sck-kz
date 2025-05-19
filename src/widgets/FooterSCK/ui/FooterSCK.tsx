"use client";
import { useTranslations } from "next-intl";
import { Col, Flex, Row, Typography } from "antd";
import LogoSCK from "@/shared/ui/LogoSCK/LogoSCK";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

const { Title, Text } = Typography;

const FooterSCK = () => {
  const t = useTranslations("FooterSCK");
  const cityEn = useGetCityParams();
  return (
    <Flex vertical>
      <Flex justify="center" align="center" style={{ padding: "20px" }}>
        <LogoSCK />
      </Flex>
      <Flex justify="center" style={{ width: "100%"}}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Title level={5}>{t("kompaniya")}</Title>
            <ul>
              <li>
                <Link href={`/city/${cityEn}/about`}>
                  <Text>{t("o-nas")}</Text>
                </Link>
              </li>
              <li>
                <Link
                  href={`/city/${cityEn}/about-our-guarantees`}
                >
                   <Text>{t("nashi-garantii")}</Text>
                </Link>
              </li>
              <li>
                <Link href={`/city/${cityEn}/contact`}>
                <Text>{t("kontakty")}</Text>
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={5}>{t("pomosh")}</Title>
            <ul>
              <li>
                <Link href={`/city/${cityEn}/about-pays`}>
                <Text>{t("oplata")}</Text>
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={5}>{t("internet-magazin")}</Title>
            <ul>
              <li>
                <Text>{t("svyazhites-s-nami")}</Text>
              </li>
              <li>
                <Text>+7 705 655 00 00</Text>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={5}>
              TOO «SCK» (ЭсСиКей) Sales Center of Kazakhstan
            </Title>
            <p>
              <Text>{"БИН 160 440 027 443"}</Text>
            </p>
            
            <p>
              <Link href={`/city/${cityEn}/user-agreement`}>
                <Text>{t("polzovatelskoe-soglashenie")}</Text>
              </Link>
            </p>
            <p>
              <Link href={`/city/${cityEn}/about/privacy-policy`}>
                <Text>{t("politika-konfidencialnosti")}</Text>
              </Link>
            </p>
          </Col>
        </Row>
      </Flex>
      <Flex justify="center" align="center" style={{width:"100%"}}>
        <Text>{`© ${new Date().getFullYear()} ${t("sck-essikei-zona-unikalnykh-cen")}`}</Text>
      </Flex>
    </Flex>
  )
}
export default FooterSCK