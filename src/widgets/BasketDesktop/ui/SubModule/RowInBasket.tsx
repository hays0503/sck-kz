import { Flex, Typography } from "antd";
import { MappedBasketItemType } from "api-mapping/basket/get-products/type/MappedBasketType";
import Image from "next/image";
import { CSSProperties, JSX } from "react";
import style from "./BasketDesktop.module.css";
import beautifulCost from "@/shared/tools/beautifulCost";

const { Text } = Typography;

interface IProductsInBasketProps {
  readonly BasketItem: MappedBasketItemType
  readonly IncBasketSlot: JSX.Element
  readonly DecBasketSlot: JSX.Element
}

const RowInBasket: React.FC<IProductsInBasketProps> = (
  { BasketItem, IncBasketSlot, DecBasketSlot }
) => {
  const { prod, count } = BasketItem;
  const name = prod.name["ru"] ?? "Название продукта";
  const priceString = prod.price;
  const discountPrice = prod.oldPrice;
  const stylePrice: CSSProperties = {
    color: discountPrice ? "red" : "black",
  };


  return (
    <Flex gap={10} style={{ width: "100%" }}>
      <Flex
        align="center"
        justify="center"
        style={{ width: "30%", display: "flex" }}
      >
        <Image
          src={prod.img[0]}
          alt={name}
          width={80}
          height={100}
          style={{
            objectFit: "scale-down",
            objectPosition: "center",
          }}
        />
      </Flex>
      <Flex vertical style={{ width: "70%" }}>
        <Text className={style.headerProduct}>
          {name}
        </Text>
        <Flex gap={10} align="baseline" justify="left">
          <Flex>
            <span className={style.priceProduct} style={stylePrice}>
              {beautifulCost(priceString)}
            </span>
          </Flex>

          {discountPrice && (
            <Flex>
              <span className={style.discountProduct}>{beautifulCost(discountPrice)}</span>
            </Flex>
          )}
        </Flex>
        <Flex gap={10} align="center" justify="right">
          {IncBasketSlot}
          {/* <DecBasketSlot count={count} prod_id={Product.id} token={token}/> */}
          <Text style={{ color: "gray" }}>{count}</Text>
          {DecBasketSlot}
          {/* <IncBasketSlot prod_id={Product.id} userBasket={userBasket} token={token}/> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RowInBasket;
