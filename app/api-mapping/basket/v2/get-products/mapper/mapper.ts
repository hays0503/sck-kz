
import type {
  MappedBasketItemType,
  MappedBasketType,
} from '../type/MappedBasketType';
import { UrlApiWithDomainV1 } from '@/shared/constant/url';
import { rawProductsTypeV1 } from 'api-mapping/product/_type/rawProductTypeV1';
import { rawBasketType } from '../../_type/rawBasketType';

const mapping = async (data: rawBasketType): Promise<MappedBasketType> => {

  if (!data?.basket_items) return { items: [] };

  const url_by_ids = `${UrlApiWithDomainV1.getProducts}by_ids/${data.basket_items.join(',')}`;
  const basket_items = (await (await fetch(url_by_ids)).json()) as rawProductsTypeV1[]

  const mappedData: MappedBasketItemType[] = basket_items.map(
    (item: rawProductsTypeV1) => {
      // Цена
      const price = item.price
        ? Object.values(item.price).sort((a, b) => b - a)[0]
        : 0;
      const oldPrice_p = item.old_price_p
        ? Object.values(item.old_price_p).sort((a, b) => a - b)[0]
        : null;
      const oldPrice_c = item.old_price_c
        ? Object.values(item.old_price_c).sort((a, b) => a - b)[0]
        : null;
      const oldPrice = oldPrice_p || oldPrice_c;
      const discount =
        item.discount_amount_p || item.discount_amount_c;

      return {
        count: data.basket_items?.reduce((acc, id) => (id === item.id ? acc + 1 : acc), 0) ?? 0,
        prod: {
          id: item.id,
          slug: item.slug,
          name: {
            ru: item.name_product,
            en: item.additional_data.EN,
            kk: item.additional_data.KZ,
          },
          img: item.list_url_to_image,
          rating: item.average_rating,
          price: price,
          oldPrice: oldPrice,
          reviews: item.reviews_count,
          discount: discount,
        },
      };
    },
  );
  return {
    items: mappedData,
  };
};

export default mapping;
