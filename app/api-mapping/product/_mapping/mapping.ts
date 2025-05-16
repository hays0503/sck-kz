import { MappedProductType } from 'api-mapping/product/_type';
import { MappedPopularProductType } from '../by_populates/type';
import { rawImage, rawResult } from '../by_populates/type/rawTypePopulates';
import { rawProd } from '../by_discounted/type/rawDiscounted';

const mapping = (
  len: number,
  rawData: rawResult[] | rawProd[],
  city: string,
): { results: MappedPopularProductType[]; len: number } => {
  const product: MappedProductType[] = rawData?.map((product: rawResult | rawProd) => ({
    id: product?.id,
    slug: product?.slug,
    name: {
      ru: product?.name_product,
      en: product?.additional_data?.en,
      kk: product?.additional_data?.kk,
    },
    img: product.images?.map((image: rawImage) => image.image.replace('http://185.100.67.246:8888', 'https://sck.kz')) ?? [],
    rating: typeof product.avg_rating === 'number' ? product?.avg_rating : 0, // Приведение к number
    price: product?.stocks?.[city]?.price ?? 0,
    oldPrice:
      product?.stocks?.[city]?.price !=
      product?.stocks[city]?.price_before_discount
        ? product.stocks?.[city]?.price_before_discount
        : null,
    reviews: product?.reviews_count,
    discount: product?.discount?.amount ?? null,
    tags: product?.tags,
    brand: {
      ru: product?.brand?.name_brand ?? null,
      en: product?.brand?.additional_data?.en,
      kk: product?.brand?.additional_data?.kk,
    }
  }));

  return {
    len: len,
    results: product,
  };
};

export default mapping;
