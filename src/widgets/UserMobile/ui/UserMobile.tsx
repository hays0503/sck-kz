"use client";

import { useUser } from "@/entities/User";
import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

const DataTag:React.FC<{header:string, content:string}> = (props) => {
  const {header, content} = props
  return (
    <Flex
      vertical={true}
      gap={10}
      style={{ width: "100%", margin: "10px 0 10px 0", padding: "10px", backgroundColor: "#fff" }}
    >
      <Title level={5}>{header}</Title>
      <Text>{content}</Text>
    </Flex>
  );
};

export default function UserMobile() {

  const { info } = useUser();

  return <Flex vertical={true} gap={10}>
    {
      info?.detail && <DataTag header="О себе" content={info?.detail}/>
    }
    {
      info?.phoneNumber?.phoneNumber && <DataTag header="Телефон" content={info?.phoneNumber?.phoneNumber}/>
    }
    {
      info?.emails?.[0]?.email && <DataTag header="Email" content={info?.emails?.[0]?.email}/>
    }
    {
      info?.user?.first_name && <DataTag header="Имя" content={info?.user?.first_name}/>
    }
    {
      info?.user?.last_name && <DataTag header="Фамилия" content={info?.user?.last_name}/>
    }
    {
      info?.user?.active && <DataTag header="Активен" content={info?.user?.active ? "Да" : "Нет"}/>
    }
  </Flex>;
}
