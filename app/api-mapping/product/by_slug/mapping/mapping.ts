import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import { MappedProductType } from "api-mapping/product/_type";
import {
  MappedProductDetailDescType,
  MappedProductDetailSpecificationType,
  MappedProductDetailType,
} from "api-mapping/product/_type/productDetail";
import { rawProductsTypeV1 } from "api-mapping/product/_type/rawProductTypeV1";
import {
  rawProductsTypeV2,
  rawSpecificationV2,
} from "api-mapping/product/_type/rawProductTypeV2";
import { default as mappingForMappedList } from "../../_mapping/mapping";
import { rawResult } from "api-mapping/product/populates/type/rawTypePopulates";

const mapping = async (
  rawData: rawProductsTypeV2,
  cityRu: string,
  cityEn: string
): Promise<MappedProductDetailType> => {
  const priceInfo = rawData?.stocks?.[cityRu] ?? {};

  const price = priceInfo?.price ?? 0;
  const oldPrice = priceInfo?.price_before_discount != priceInfo?.price ? priceInfo?.price_before_discount : null;

  const quantity = priceInfo?.quantity ?? 0;

  //Сбор основных данных
  const mainData = {
    id: rawData?.id,
    slug: rawData?.slug,
    name: {
      ru: rawData?.name_product ?? "",
      en: rawData?.additional_data?.EN ?? "",
      kk: rawData?.additional_data?.KZ ?? "",
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
        ru: specification?.name_specification?.name_specification ?? "",
        en: specification?.name_specification?.additional_data.EN ?? "",
        kk: specification?.name_specification?.additional_data.KZ ?? "",
      },
      value: {
        ru: specification?.value_specification?.value_specification ?? "",
        en: specification?.value_specification?.additional_data?.EN ?? "",
        kk: specification?.value_specification?.additional_data?.KZ ?? "",
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
    const url = `${UrlApiWithDomainV1.getDescription}${idDesc}`;

    const descFetch = await fetch(url)
      .then((res) => res.json() as Promise<descType>)
      // .catch((e) => console.error(e));

    desc = {
      name: {
        ru: descFetch?.body_description ?? "",
        en: descFetch?.additional_data_to_desc?.EN ?? "",
        kk: descFetch?.additional_data_to_desc?.KZ ?? "",
      },
    };
  }

  let relatedProducts = [] as MappedProductType[];
  if(rawData?.related_products_url !== "http://185.100.67.246:8888/api/v2/products_v2/filter_by_ids/?ids="){
    const urlRelatedProducts = `${rawData.related_products_url}&city=${cityEn}`;
    console.log("urlRelatedProducts=>",urlRelatedProducts);
    const relatedProductsFetch = await fetch(urlRelatedProducts)
      .then((res) => res.json() as Promise<{ count: number; results: rawResult[] }>)
      // .catch((e) => console.error(e));

    console.log("relatedProductsFetch=>",relatedProductsFetch);

    if (relatedProductsFetch) {
      relatedProducts = mappingForMappedList(
        relatedProductsFetch.count,
        relatedProductsFetch.results,
        cityRu
      ).results;      
    }

  }

  const MappedData = {
    ...mainData,
    article: rawData?.vendor_code,
    quantity: quantity,
    categoryId: rawData?.category?.id,
    specifications: specificationsProduct,
    reviews: [],
    desc: desc,
    relatedProducts: relatedProducts,
    configuration: [],
  } as MappedProductDetailType;

  // console.log("MappedData", MappedData);

  return MappedData;
};

export default mapping;
