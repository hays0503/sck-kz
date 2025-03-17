import {
  MappedBasketItemType,
  MappedBasketType,
} from 'api-mapping/basket/v1/get-products/type/MappedBasketType';

const deserializationToRawBasket = (data: MappedBasketType, uuid: string) => {
  const rawBasket = data.items.map((item: MappedBasketItemType) => {
    return new Array(item.count).fill(item.prod.id);
  });

  return {
    basket_items: rawBasket.flat(),
    uuid_id: uuid,
  };
};

export default deserializationToRawBasket;
