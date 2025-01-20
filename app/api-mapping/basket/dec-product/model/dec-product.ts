import {
  MappedBasketItemType,
  MappedBasketType,
} from "api-mapping/basket/get-products/type/MappedBasketType";

const decProduct = (
  basket: MappedBasketType,
  prod_id: number
): MappedBasketType => {
  const isHaveProductId: boolean = basket.items.some(
    (item: MappedBasketItemType) => item.prod.id === prod_id
  );

  if (isHaveProductId) {
    const baskets: MappedBasketItemType[] = basket.items.map(
      (item: MappedBasketItemType) => {
        
        if (item.prod.id === prod_id) {
          return {
            prod: item.prod,
            count: item.count - 1,
          } as MappedBasketItemType;
        }
        return item;
      }
    );

    const filtered = baskets.filter((item) => item.count > 0);

    return { items: filtered } ;
  } else {
    return {
      items: [
        ...basket.items        
      ],
    };
  }
};
export default decProduct;
