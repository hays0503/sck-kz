import { MappedProductType } from "./product"

export interface MappedProductDetailSpecificationType {
    readonly name: { readonly [key: string]: string },
    readonly value: { readonly [key: string]: string }
}

export interface MappedProductDetailReviewsType {
    readonly rating: number,
    readonly review: string
    readonly createdAt: Date
}

export interface MappedProductDetailDescType {
    name: { readonly [key: string]: string },
}

export interface MappedProductDetailType extends MappedProductType {
    readonly article: string
    readonly quantity: number
    readonly categoryId: number
    
    readonly specifications: MappedProductDetailSpecificationType[]|[],
    readonly reviews: MappedProductDetailReviewsType[]|[]
    readonly desc:MappedProductDetailDescType|null
    readonly relatedProducts: MappedProductType[]|[]
    readonly configuration: MappedProductType[]|[]
}