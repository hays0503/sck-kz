import {
  MappedBasketItemType,
  MappedBasketType,
} from 'api-mapping/basket/v1/get-products/type/MappedBasketType';

const deserializationToRawBasket = (data: MappedBasketType, uuid: string) => {
  const rawBasket = data.items.map((item: MappedBasketItemType) => {
    return {
      count: item.count,
      prod_id: item.prod.id,
    };
  });

  return {
    basket_items: rawBasket,
    uuid_id: uuid,
  };
};

export default deserializationToRawBasket;
