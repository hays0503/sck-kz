import type { rawProductsTypeV1 } from "api-mapping/product/_type/rawProductTypeV1";

export interface rawBasketItemType {
    count: number;
    price: number;
    prod_id: number;
    prod: rawProductsTypeV1;
    name: string;
    slug: string;
    url: string;
    urlapi: string;
    gift_prod_id: number;
  }
  
  export interface rawBasketType {
    uuid_id: string | null;
    user_id: number | null;
    completed: boolean;
    basket_items: rawBasketItemType[]|null|[];
    gift_items: rawProductsTypeV1[]|null|[];
  }
  