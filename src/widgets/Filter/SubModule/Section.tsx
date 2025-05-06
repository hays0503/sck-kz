import { Divider, Flex, Typography } from "antd";
import React, { memo } from "react";


const { Title } = Typography;

// Секция с заголовком
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Flex vertical gap={5}>
    <Title level={4} style={{ margin: 0 }}>
      {title}
    </Title>
    <Divider style={{ margin: 0 }} />
    {children}
  </Flex>
);

export default memo(Section);