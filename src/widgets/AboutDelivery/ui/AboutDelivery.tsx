"use client";

import React from "react";
import {
  Typography,
  Card,
  Col,
  Divider,
  Steps,
  Flex,
  Grid
} from "antd";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;


const AboutOurGuarantees = () => {
  const screens = useBreakpoint();
  const {
    xs
  } = screens

  
  const imageContainerStyle = {
    height: "auto", 
    width: xs ? "100%" : "20%",
    minWidth: xs ? "50dvw" : "unset",
    minHeight: xs ? "50dvw" : "unset"
  }

  return (
    <Col>
      <Card>
        <Typography>
          <Title level={2}>Доставка</Title>
          <Flex vertical={xs} >
            <Flex style={{ position: "relative",...imageContainerStyle}}>
              <Image src="/delivery.webp" alt="delivery" fill style={{ objectFit: "contain"}} />
            </Flex>
            <Steps
              initial={0}
              current={-1}
              size="default"
              direction="vertical"
              responsive={true}
              items={[
                {
                  title: 'Подтверждение заказа',
                  description: "Вам звонит оператор, чтобы уточнить детали заказа: верны ли введенные данные. Сообщает стоимость доставки, если она не в черте города.",
                },
                {
                  title: 'Доставка',
                  description: "Курьеры привозят вам товар согласно оговоренным срокам.",
                },
                {
                  title: 'Осмотр товара',
                  description: "Вы осматриваете товар: все ли вас устраивает, нет ли дефектов( вмятин, царапин, трещин).",
                },
                {
                  title: 'Оплата',
                  description: "Если товар вас полностью устраивает, то вы оплачиваете заказ курьеру удобным вам способом — картой или наличными.",
                }
              ]}
            />
          </Flex>

          <Divider />
          <Paragraph style={{ display: "flex", flexDirection: "column" }}>
            <Title level={4}>Стоимость доставки</Title>
            <Text strong>
              Доставка в черте города
            </Text>
            <Text>
              Доставка бесплатная при заказе от 10 000₸.
            </Text>
            <Text>  До 10 000 доставка стоит 1000₸.
            </Text>
            <Text strong>
              Доставка в населенные пункты находящиеся вне черты города
            </Text>
            <Text>
              Доставка платная и рассчитывается операторами. Вы можете уточнить стоимость доставки связавшись с нами или дождавшись звонка от оператора после оформления заказа.
            </Text>
          </Paragraph>
        </Typography>
      </Card>
    </Col >
  );
}
export default AboutOurGuarantees;