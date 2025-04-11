import {
  rawBasketItemType,
  rawBasketType,
} from 'api-mapping/basket/v1/_type/rawBasketType';
import type {
  MappedBasketItemType,
  MappedBasketType,
} from '../type/MappedBasketType';

const mapping = (data: rawBasketType): MappedBasketType => {
  if (!data.basket_items) return { items: [] };
  const mappedData: MappedBasketItemType[] = data.basket_items.map(
    (item: rawBasketItemType) => {
      // Цена
      const price = item.prod.price
        ? Object.values(item.prod.price).sort((a, b) => b - a)[0]
        : 0;
      const oldPrice_p = item.prod.old_price_p
        ? Object.values(item.prod.old_price_p).sort((a, b) => a - b)[0]
        : null;
      const oldPrice_c = item.prod.old_price_c
        ? Object.values(item.prod.old_price_c).sort((a, b) => a - b)[0]
        : null;
      const oldPrice = oldPrice_p || oldPrice_c;
      const discount =
        item.prod.discount_amount_p || item.prod.discount_amount_c;
      return {
        count: item.count,
        prod: {
          id: item.prod_id,
          slug: item.slug,
          name: {
            ru: item.prod.name_product,
            en: item.prod.additional_data.EN,
            kk: item.prod.additional_data.KZ,
          },
          img: item.prod.list_url_to_image,
          rating: item.prod.average_rating,
          price: price,
          oldPrice: oldPrice,
          reviews: item.prod.reviews_count,
          discount: discount,
          brand: {
            ru: 'SCK',
            en: 'SCK',
            kk: 'SCK',
          },
        },
      };
    },
  );
  return {
    items: mappedData,
  };
};

export default mapping;
