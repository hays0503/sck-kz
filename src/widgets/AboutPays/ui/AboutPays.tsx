"use client";

import { Card } from "antd"
import { memo } from "react"
import { Typography } from "antd"
import { useTranslations } from "next-intl";

const { Title, Paragraph, Text } = Typography;  


const AboutPays: React.FC = () => {
    const t = useTranslations()
    return (
      <Card>
        <Title level={2}>{t('oplata')}</Title>
        <Paragraph>
          <Title level={4}>
            {t('oplata-nalichnymi-pri-poluchenii-zakaza')}
          </Title>
          <Text>
            {t(
              'oplata-nalichnymi-vozmozhna-lichno-v-ruki-kureru-pri-dostavke-na-dom-v-moment-polucheniya-zakaza-oplata-proizvoditsya-isklyuchitelno-v-nacionalnoi-valyute-v-podtverzhdenie-oplaty-my-vydaem-vam-tovarnyi-chek',
            )}
          </Text>
        </Paragraph>
        <Paragraph>
          <Title level={4}>
            {t('oplata-nalichnymi-pri-poluchenii-zakaza')}
          </Title>
          <Text>
            {t(
              'oplata-nalichnymi-vozmozhna-lichno-v-ruki-kureru-pri-dostavke-na-dom-v-moment-polucheniya-zakaza-oplata-proizvoditsya-isklyuchitelno-v-nacionalnoi-valyute-v-podtverzhdenie-oplaty-my-vydaem-vam-tovarnyi-chek-0',
            )}
          </Text>
        </Paragraph>
        <Paragraph>
          <Title level={4}>
            {t('oplata-kartoi-onlayn')}
          </Title>
          <Text>
            {t('oplata-kartoi-onlain-vozmozhna-pri-oformlenii-zakaza-na-saite-dlya-etogo-neobkhodimo-zapolnit-formu-zakaza-i-vybrat-oplatu-kartoi-onlain')}
          </Text>
        </Paragraph>
      </Card>
    );
}

export default memo(AboutPays)