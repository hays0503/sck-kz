"use client";

import { useUser } from "@/entities/User";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Title, Text } = Typography;

const DataTag: React.FC<{ header: string, content: React.ReactNode }> = (props) => {
  const { header, content } = props
  return (
    <Flex
      vertical={true}
      gap={10}
      style={{ width: "100%", margin: "10px 0 10px 0", padding: "10px", backgroundColor: "#fff" }}
    >
      <Title level={5}>{header}</Title>
      {content}
    </Flex>
  );
};

export default function UserMobile() {
  const cityEn = useGetCityParams();
  const t = useTranslations("UserMobile");
  const { isAnonymous, info } = useUser();

  const isGuest = isAnonymous;

  const enterGuest = () => {
    return <Flex vertical={true} gap={5} align="center" style={{ width: "100%" }}>
      <DataTag header={""} content={<Flex gap={5} vertical align="center" justify="center" style={{ width: "100%" }}>
        <Title level={4} >{t('gost')}</Title> <Link href={`/city/${cityEn}/login`}>{t('authorization')}</Link>
        </Flex>} />

    </Flex>
  }

  if (isGuest) {
    return enterGuest();
  }

  return <Flex vertical={true} gap={10}>

    {
      info?.username && <DataTag header={t('login')}
        content={<Text>{info?.username}</Text>}
      />
    }
    {
      info?.avatar_path && <DataTag header={t('avatar')}
        content={<Image width={100} height={100} alt="avatar" src={`${info.avatar_path === "avatar_default.png" ? "/sck-user.svg" : info.avatar_path}`} />}
      />
    }
    {
      info?.phone && <DataTag header={t('phoneNumber')}
        content={<Text>{info?.phone.phone_number}</Text>}
      />
    }
    {
      info?.email && <DataTag header="Email"
        content={<Text>{info?.email}</Text>}
      />
    }

  </Flex>;
}
