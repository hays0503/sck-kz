import {
  MappedBasketItemType,
  MappedBasketType,
} from 'api-mapping/basket/v1/get-products/type/MappedBasketType';

const addProduct = (
  basket: MappedBasketType,
  prod_id: number,
): MappedBasketType => {
  const isHaveProductId: boolean = basket.items.some(
    (item: MappedBasketItemType) => item.prod.id === prod_id,
  );

  if (isHaveProductId) {
    const baskets: MappedBasketItemType[] = basket.items.map(
      (item: MappedBasketItemType) => {
        if (item.prod.id === prod_id) {
          return {
            prod: item.prod,
            count: item.count + 1,
          } as MappedBasketItemType;
        }
        return item;
      },
    );
    return { items: baskets };
  } else {
    return {
      items: [
        ...basket.items,
        { count: 1, prod: { id: prod_id } } as MappedBasketItemType,
      ],
    };
  }
};
export default addProduct;
