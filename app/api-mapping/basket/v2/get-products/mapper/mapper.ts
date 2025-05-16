import type {
  MappedBasketItemType,
  MappedBasketType,
} from '../type/MappedBasketType';
import { UrlApiWithDomainV2 } from '@/shared/constant/url';
import { rawBasketType } from '../../_type/rawBasketType';
import {
  rawImage,
  rawResult,
  rawSpecification,
} from 'api-mapping/product/by_populates/type/rawTypePopulates';
import CityEnToRu from '@/shared/constant/city';

const mapping = async (
  data: rawBasketType,
  cityEn: string,
): Promise<MappedBasketType> => {
  if (!data) return { items: [] };
  if (!data.uuid_id) return { items: [] };
  if (data.basket_items?.length === 0) return { items: [] };
  if (!data?.basket_items) return { items: [] };

  const url_by_ids = `${UrlApiWithDomainV2.getProducts}filter_by_ids/?ids=${data.basket_items.join(',')}`;
  const basketRawItems = await (await fetch(url_by_ids)).json() as { results: rawResult[] };
  const cityRu: string = (CityEnToRu[cityEn] as string) ?? 'Караганда';
  const mappedData: MappedBasketItemType[] = basketRawItems.results.map(
    (product: rawResult) => {
      const price = product?.stocks?.[cityRu]?.price ?? 0;
      const oldPrice =
        product?.stocks?.[cityRu]?.price !=
        product?.stocks[cityRu]?.price_before_discount
          ? product.stocks?.[cityRu]?.price_before_discount
          : null;
      const discount = product?.discount?.amount ?? null;
      const count = data.basket_items?.reduce(
        (acc, id) => (id === product.id ? acc + 1 : acc),
        0,
      ) ?? 0;

      return {
        count,
        prod: {
          id: product?.id,
          slug: product?.slug,
          name: {
            ru: product?.name_product,
            en: product?.additional_data?.en,
            kk: product?.additional_data?.kk,
          },
          img:product?.images?.map((image: rawImage) => image.image).reverse() ??[],
          rating:typeof product?.avg_rating === 'number' ? product?.avg_rating : 0, // Приведение к number
          price: price,
          oldPrice: oldPrice,
          reviews: product?.reviews_count,
          discount: discount,
          brand: {
            ru: product?.brand?.name_brand ?? null,
            en: product.brand?.additional_data?.en ?? null,
            kk: product.brand?.additional_data?.kk ?? null,
          },
          tags: product?.tags ?? [],
          specifications: product?.specifications?.map((specification: rawSpecification) => ({
                name: {
                  ru: specification?.name_specification?.name_specification,
                  en: specification?.name_specification?.additional_data?.en,
                  kk: specification?.name_specification?.additional_data?.kk,
                },
                value: {
                  ru: specification?.value_specification?.value_specification,
                  en: specification?.value_specification?.additional_data?.en,
                  kk: specification?.value_specification?.additional_data?.kk,
                },
              })) ?? [],
        },
      };
    },
  );
  return {
    items: mappedData,
  };
};

export default mapping;
