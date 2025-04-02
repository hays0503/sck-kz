import { UrlApiWithDomainV1, UrlApiWithDomainV2 } from '@/shared/constant/url';
import { MappedProductType } from 'api-mapping/product/_type';
import {
  MappedProductDetailDescType,
  MappedProductDetailReviewsType,
  MappedProductDetailSpecificationType,
  MappedProductDetailType,
} from 'api-mapping/product/_type/productDetail';
import { rawProductsTypeV1 } from 'api-mapping/product/_type/rawProductTypeV1';
import {
  rawProductsTypeV2,
  rawSpecificationV2,
} from 'api-mapping/product/_type/rawProductTypeV2';
import { default as mappingForMappedList } from '../../_mapping/mapping';
import { rawResult } from 'api-mapping/product/by_populates/type/rawTypePopulates';


const Placeholder = (text: string,placeholder: string,info:string): string => {
  if(!text)
    return placeholder+` Смотри:(${info})`
  if(text == 'null')
    return placeholder+` Смотри:(${info})`
  if(text == 'undefined')
    return placeholder+` Смотри:(${info})`
  if(text == 'NaN')
    return placeholder+` Смотри:(${info})`
  if(text == 'Infinity')
    return placeholder+` Смотри:(${info})`
  if(text == '')
    return placeholder+` Смотри:(${info})`

  return text
}

const mapping = async (
  rawData: rawProductsTypeV2,
  cityRu: string,
  // cityEn: string,
): Promise<MappedProductDetailType> => {
  const priceInfo = rawData?.stocks?.[cityRu] ?? {};

  const price = priceInfo?.price ?? 0;
  const oldPrice =
    priceInfo?.price_before_discount != priceInfo?.price
      ? priceInfo?.price_before_discount
      : null;

  const quantity = priceInfo?.quantity ?? 0;

  //Сбор основных данных
  const mainData = {
    id: rawData?.id,
    slug: rawData?.slug,
    name: {
      ru: Placeholder(rawData?.name_product,'Перевод не установлен ru',"Название на русском"),
      en: Placeholder(rawData?.additional_data?.EN,'Перевод не установлен en',"Название на английском"),
      kk: Placeholder(rawData?.additional_data?.KZ,'Перевод не установлен kz',"Название на казахском"),
    },
    img: rawData?.images.map((image) => image.image),
    rating: rawData?.avg_rating,
    price,
    oldPrice,
    discount: rawData?.discount?.amount,
  };
  const specificationsProduct: MappedProductDetailSpecificationType[] | [] =
    rawData?.specifications?.map((specification: rawSpecificationV2) => ({
      name: {
        ru: Placeholder(specification?.name_specification?.name_specification,'Перевод не установлен ru',`Название спецификации id:${specification?.name_specification?.id}`),
        en: Placeholder(specification?.name_specification?.additional_data.EN,'Перевод не установлен en',`Название спецификации id:${specification?.name_specification?.id}`),
        kk: Placeholder(specification?.name_specification?.additional_data.KZ ,'Перевод не установлен kz',`Название спецификации id:${specification?.name_specification?.id}`),
      },
      value: {
        ru: Placeholder(specification?.value_specification?.value_specification,'Перевод не установлен ru',`Значение спецификации id:${specification?.value_specification?.id}`),
        en: Placeholder(specification?.value_specification?.additional_data?.EN,'Перевод не установлен en',`Значение спецификации id:${specification?.value_specification?.id}`),
        kk: Placeholder(specification?.value_specification?.additional_data?.KZ,'Перевод не установлен kz', `Значение спецификации id:${specification?.value_specification?.id}`),
      },
    })) ?? [];

  const url_by_ids = `${UrlApiWithDomainV1.getProducts}by_ids/${rawData?.id}`;
  const idDesc = (
    (await (await fetch(url_by_ids)).json()) as rawProductsTypeV1[]
  )?.[0].description;

  let desc: MappedProductDetailDescType | null = null;
  type descType = {
    body_description: string;
    additional_data_to_desc: Record<string, string>;
  };
  if (idDesc) {
    const url = `${UrlApiWithDomainV1.getProductDescription}${idDesc}`;

    const descFetch = await fetch(url).then(
      (res) => res.json() as Promise<descType>,
    );
    // .catch((e) => console.error(e));

    desc = {
      name: {
        ru: Placeholder(descFetch?.body_description,'Перевод не установлен ru',"Описание на русском"),
        en: Placeholder(descFetch?.additional_data_to_desc?.EN,'Перевод не установлен en',"Описание на английском"),
        kk: Placeholder(descFetch?.additional_data_to_desc?.KZ,'Перевод не установлен kz',"Описание на казахском"),
      },
    };
  }

  let relatedProducts = [] as MappedProductType[];
  if (
    rawData?.related_products_url !==
    `${UrlApiWithDomainV2.getProducts}/filter_by_ids/?ids=`
  ) {
    const urlRelatedProducts = `${rawData.related_products_url}&city=${cityRu}/`;
    const relatedProductsFetch = await fetch(urlRelatedProducts).then(
      (res) => res.json() as Promise<{ count: number; results: rawResult[] }>,
    );

    if (relatedProductsFetch) {
      relatedProducts = mappingForMappedList(
        relatedProductsFetch.count,
        relatedProductsFetch.results,
        cityRu,
      ).results;
    }
  }

  let configurationProducts = [] as MappedProductType[];
  if (
    rawData?.configuration_url !==
    `${UrlApiWithDomainV2.getProducts}/filter_by_ids/?ids=`
  ) {
    const urlConfigurationProducts = `${rawData.configuration_url}&city=${cityRu}`;
    const configurationProductsFetch = await fetch(
      urlConfigurationProducts,
    ).then(
      (res) => res.json() as Promise<{ count: number; results: rawResult[] }>,
    );

    if (configurationProductsFetch) {
      configurationProducts = mappingForMappedList(
        configurationProductsFetch.count,
        configurationProductsFetch.results,
        cityRu,
      ).results;
    }
  }

  let reviewsProducts = [] as MappedProductDetailReviewsType[];

  // const urlReviewsProducts = `${rawData.reviews_url}`;
  // const configurationProductsFetch = await fetch(urlReviewsProducts).then(
  //   (res) => res.json() as Promise<Reviews[] | []>,
  // );

  if (rawData?.reviews.length > 0) {
    reviewsProducts = rawData?.reviews.map((review) => ({
      rating: review.rating,
      review: review.review,
      createdAt: review.created_at,
    } as MappedProductDetailReviewsType))
  }

  const MappedData = {
    ...mainData,
    article: rawData?.vendor_code,
    quantity: quantity,
    categoryId: rawData?.category?.id,
    specifications: specificationsProduct,
    reviews: reviewsProducts,
    desc: desc,
    relatedProducts: relatedProducts,
    configuration: configurationProducts,
  } as MappedProductDetailType;

  // console.log("MappedData", MappedData);

  return MappedData;
};

export default mapping;
