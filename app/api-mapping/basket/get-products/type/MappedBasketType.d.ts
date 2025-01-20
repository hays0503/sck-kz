import { MappedProductType } from "api-mapping/product/_type";

export interface MappedBasketType {
    readonly items: MappedBasketItemType[]|[];
}

export type MappedBasketItemType = {
    readonly count:number,   
    readonly prod:MappedProductType
}