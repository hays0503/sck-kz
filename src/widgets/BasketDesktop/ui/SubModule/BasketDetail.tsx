
import beautifulCost from "@/shared/tools/beautifulCost";
import { Divider, Flex, Typography } from "antd";
import { MappedBasketType } from "api-mapping/basket/v2/get-products/type/MappedBasketType";
import { useTranslations } from "next-intl";
import React from "react";

const { Text, Title } = Typography;

interface IBasketDetailProps {
  readonly Products: MappedBasketType 
  readonly ToOrder: React.ReactNode
}

const BasketDetail: React.FC<IBasketDetailProps> = ({ Products, ToOrder }) => {
  const t = useTranslations("BasketDetail");

  const allPrice = Products.items.reduce((acc, item) => {
    const price = item.prod.price;
    return acc + (price ?? 0) * item.count;
  }, 0);

  const allDiscount = Products.items.reduce((acc, item) => {
    const price = item.prod.price;
    const discountPrice = item.prod.oldPrice;
    return acc + (discountPrice ?? price ?? 0) * item.count;
  }, 0);

  const deltaPrice = allPrice - allDiscount;

  const deltaPriceString = beautifulCost(deltaPrice);

  const allDiscountString = beautifulCost(allDiscount);

  const allPriceString = beautifulCost(allPrice);

  const Discount = () => {
    return (
      <>
        {deltaPrice !== 0 && (
          <Flex align="center" justify="space-between" style={{ width: "95%" }}>
            <Text
              style={{
                color: "#808185",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                letterSpacing: "-0.084px",
              }}
            >
              {t("ekonomiya")}
            </Text>
            <Text
              style={{
                color: "#19B28D",
              }}
            >{`${deltaPriceString}`}</Text>
          </Flex>
        )}
      </>
    );
  };

  return (
    <Flex
      vertical={true}
      gap={10}
      style={{
        width: "100%", backgroundColor: "inherit",
        border: "0.33px solid #d9d9d9", borderRadius: "8px", padding: "24px"
      }}
    >
      <Flex>
        <Title level={5}>{t("detali-zakaza")}</Title>
      </Flex>
      <Flex align="center" justify="space-between" style={{ width: "95%" }}>
        <Text
          style={{
            color: "#808185",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "22px",
            letterSpacing: "-0.084px",
          }}
        >
          {`${Products.items.length} ${t("tovarov-na-summu")}`}
        </Text>
        <Text>{allPriceString}</Text>
      </Flex>
      <Discount />
      <Divider />
      <Flex align="center" justify="space-between" style={{ width: "95%" }}>
        <Text
          style={{
            color: "#808185",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "22px",
            letterSpacing: "-0.084px",
          }}
        >
          {`${t("total")}:`}
        </Text>
        <Text>{allDiscountString}</Text>
      </Flex>
      {ToOrder}
    </Flex>
  );
};

export default BasketDetail;
