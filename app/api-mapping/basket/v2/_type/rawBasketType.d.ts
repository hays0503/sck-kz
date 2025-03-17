import type { rawProductsTypeV1 } from "api-mapping/product/_type/rawProductTypeV1";
  
  export interface rawBasketType {
    uuid_id: string | null;
    user_id: number | null;
    completed: boolean;
    basket_items: number[]|null|[];
    gift_items: rawProductsTypeV1[]|null|[];
  }
  