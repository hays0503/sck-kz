import { Button, Checkbox, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import style from "./BasketMobile.module.css";
import type { CheckboxOptionType, CheckboxProps } from "antd";
import RowInBasket from "./RowInBasket";
import { MappedBasketType } from "api-mapping/basket/get-products/type/MappedBasketType";
import { DecButton, IncButton } from "@/features/operation-in-basket-product";

const { Text } = Typography;
const CheckboxGroup = Checkbox.Group;

interface IProductsInBasketProps {
  readonly Products: MappedBasketType;
}

const ProductsInBasket: React.FC<IProductsInBasketProps> = ({ Products }) => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const t = useTranslations("ProductsInBasket");

  const checkAll = Products.items.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < Products.items.length;

  const onChangeAllChange: CheckboxProps["onChange"] = (e) => {
    if (Products)
      setCheckedList(
        e.target.checked ? Products.items.map((item) => item.prod.id) : []
      );
  };

  const onChange = (list: number[]) => {
    setCheckedList(list);
  };

  const GroupOptions: CheckboxOptionType[] = Products.items.map((item) => ({
    label: (
      <RowInBasket
        BasketItem={item}
        IncBasketSlot={<IncButton prod_id={item.prod.id} />}
        DecBasketSlot={<DecButton prod_id={item.prod.id} count={item.count}/>}
      />
    ),
    value: item.prod.id,
  }));

  return (
    <>
      <Flex
        align="baseline"
        justify="space-between"
        style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
      >
        <Checkbox
          onChange={onChangeAllChange}
          indeterminate={indeterminate}
          checked={checkAll}
        >
          <Text className={style.selectAll}>{t("vybrat-vsyo")}</Text>
        </Checkbox>
        <Button type="text">
          <Text className={style.deletedSelected}>
            {`${t("udalit-vybrannye")} (${checkedList.length})`}
          </Text>
        </Button>
      </Flex>

      <Flex
        vertical={true}
        style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
      >
        <CheckboxGroup
          options={GroupOptions}
          value={checkedList}
          onChange={onChange}
          className={style.container}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        />
      </Flex>
    </>
  );
};

export default ProductsInBasket;
