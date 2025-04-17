import { MappedProductType } from "api-mapping/product/_type";
import { MappedProductDetailSpecificationType } from "api-mapping/product/_type/productDetail";

export interface MappedBasketType {
    readonly items: MappedBasketItemType[]|[];
}

export type MappedBasketItemType = {
    readonly count:number,   
    readonly prod:MappedProductType & {
      specifications: MappedProductDetailSpecificationType[] | [] | null
    }
}