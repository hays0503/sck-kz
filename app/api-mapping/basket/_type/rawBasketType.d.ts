import type { rawProductsType } from "api-mapping/product/_type/rawProductType";

export interface rawBasketItemType {
    count: number;
    price: number;
    prod_id: number;
    prod: rawProductsType;
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
    gift_items: rawProductsType[]|null|[];
  }
  