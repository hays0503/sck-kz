import { MappedProductType } from 'api-mapping/product/_type';
import { MappedPopularProductType } from '../by_populates/type';
import { rawImage, rawResult } from '../by_populates/type/rawTypePopulates';

const getLocalizedName = (product: rawResult, lang: string): string | null =>
  product?.additional_data?.[lang] != ''
    ? product?.additional_data?.[lang]
    : null;

const mapping = (
  len: number,
  rawData: rawResult[],
  city: string,
): { results: MappedPopularProductType[]; len: number } => {
  const Populates: MappedProductType[] = rawData?.map((product: rawResult) => ({
    id: product?.id,
    slug: product?.slug,
    name: {
      ru: product?.name_product,
      en: getLocalizedName(product, 'EN'),
      kk: getLocalizedName(product, 'KZ'),
    },
    img: product.images?.map((image: rawImage) => image.image).reverse() ?? [],
    rating: typeof product.avg_rating === 'number' ? product?.avg_rating : 0, // Приведение к number
    price: product?.stocks?.[city]?.price ?? 0,
    oldPrice:
      product?.stocks?.[city]?.price !=
      product?.stocks[city]?.price_before_discount
        ? product.stocks?.[city]?.price_before_discount
        : null,
    reviews: product?.reviews_count,
    discount: product?.discount?.amount ?? null,
  }));

  return {
    len: len,
    results: Populates,
  };
};

export default mapping;
