import { Products } from "./products";

export interface iBasketItem {
  count: number;
  price: number;
  prod_id: number;
  prod: Products;
  name: string;
  slug: string;
  url: string;
  urlapi: string;
  gift_prod_id: number;
}

export interface iBasket {
  uuid_id: string | null;
  user_id: number | null;
  completed: boolean;
  basket_items: iBasketItem[]|null|[];
  gift_items: Products[]|null|[];
}
