export type rawProductsTypeV2 = {
    readonly id:                 number;
    readonly vendor_code:        string;
    readonly slug:               string;
    readonly name_product:       string;
    readonly additional_data:    rawAdditionalDataV2;
    readonly category:           rawCategoryV2;
    readonly brand:              rawBrandV2;
    readonly images:             rawImageV2[];
    readonly related_edges:      rawRelatedEdgeV2[];
    readonly avg_rating:         number;
    readonly reviews_count:      number;
    readonly stocks:             { [key: string]: rawStockV2 };
    readonly discount:           rawDiscountV2;
    readonly tags:               rawTagV2[];
    readonly specifications:     rawSpecificationV2[];
    readonly reviews:            rawReviewV2[];
    readonly reviews_url:        string;
    readonly desc_url:           string;
    readonly related_products_url: string;
    readonly configuration_url:   string;
}


export type rawAdditionalDataV2 = {
    readonly en: string;
    readonly kk: string;
}

export type rawBrandV2 = {
    readonly id:             number;
    readonly name_brand:      string;
    readonly additional_data: rawAdditionalDataV2;
}

export type rawCategoryV2 = {
    readonly id:                 number;
    readonly name_category:       string;
    readonly slug:               string;
    readonly parent:             number;
    readonly parent_category_name: string;
    readonly additional_data:     rawAdditionalDataV2;
}

export type rawDiscountV2 = {
    readonly id:          number;
    readonly name:        string;
    readonly amount:      string;
    readonly description: string;
}

export type rawImageV2 = {
    readonly image: string;
}

export type rawRelatedEdgeV2 = {
    readonly city_from:              string;
    readonly city_to:                string;
    readonly estimated_delivery_days: number;
    readonly estimated_delivery_date: Date;
    readonly transportation_cost:    number;
    readonly is_active:              boolean;
    readonly expiration_date:        Date;
}

export type rawReviewV2 = {
    readonly id:        number;
    readonly rating:    number;
    readonly review:    string;
    readonly created_at: Date;
}

export type rawSpecificationV2 = {
    readonly id:                 number;
    readonly name_specification:  rawNameSpecificationV2;
    readonly value_specification: rawValueSpecificationV2;
    readonly product:            number;
}

export type rawNameSpecificationV2 = {
    readonly id:                number;
    readonly additional_data:    rawAdditionalDataV2;
    readonly name_specification: string;
}

export type rawValueSpecificationV2 = {
    readonly id:                 number;
    readonly additional_data:     rawAdditionalDataV2;
    readonly value_specification: string;
}

export type rawStockV2 = {
    readonly price:                 number;
    readonly price_before_discount:   number;
    readonly quantity:              number;
    readonly edge:                  boolean;
    readonly transportation_cost:    number | null;
    readonly estimated_delivery_days: number | null;
}

export type rawTagV2 = {
    readonly id:             number;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
    readonly additional_data: rawAdditionalDataV2;
}
