export type rawDiscountedProducts = {
    readonly count:    number;
    readonly next:     null;
    readonly previous: null;
    readonly results:  rawResults;
}

export type rawResults = {
    readonly brands_to_filter: rawBrandsToFilter[];
    readonly cat_to_filter:    rawCatToFilter[];
    readonly spec_to_filter:   rawSpecToFilter[];
    readonly prod:             rawProd[];
}

export type rawBrandsToFilter = {
    readonly brand__id:               number;
    readonly brand__name_brand:       string;
    readonly brand__logobrand__image: string;
}

export type rawCatToFilter = {
    readonly category__id:                   number;
    readonly category__name_category:        string;
    readonly category__slug:                 string;
    readonly category__categoryimage__image: null;
}

export type rawProd = {
    readonly id:                   number;
    readonly vendor_code:          string;
    readonly slug:                 string;
    readonly name_product:         string;
    readonly additional_data:      rawAdditionalData;
    readonly category:             rawCategory;
    readonly brand:                rawBrand;
    readonly images:               rawImage[];
    readonly avg_rating:           number | null;
    readonly reviews_count:        number;
    readonly stocks:               { [key: string]: Stock };
    readonly discount:             Discount;
    readonly tags:                 Tag[];
    readonly specifications:       Specification[];
    readonly reviews:              Review[];
    readonly reviews_url:          string;
    readonly description:          Description;
    readonly related_products_url: string;
    readonly configuration_url:    string;
}

export type rawAdditionalData = {
    readonly en: string;
    readonly kk: string;
    readonly ru: string;
    [key: string]: string | null;
}

export type rawBrand = {
    readonly id:              number;
    readonly name_brand:      string;
    readonly additional_data: rawAdditionalData;
    readonly logo:            rawLogo[];
}

export type rawLogo = {
    readonly image: string;
}

export type rawCategory = {
    readonly id:                   number;
    readonly name_category:        string;
    readonly slug:                 string;
    readonly parent:               number;
    readonly parent_category_name: string;
    readonly additional_data:      rawAdditionalData;
}

export type rawDescription = {
    readonly id:                      number;
    readonly additional_data:         rawAdditionalData;
    readonly title_description:       string;
    readonly additional_data_to_desc: rawAdditionalData;
    readonly body_description:        string;
}

export type rawDiscount = {
    readonly id:          number;
    readonly name:        string;
    readonly amount:      string;
    readonly description: string;
}

export type rawImage = {
    readonly ind:   number;
    readonly image: string;
}

export type rawReview = {
    readonly id:         number;
    readonly rating:     number;
    readonly review:     string;
    readonly created_at: Date;
}

export type rawSpecification = {
    readonly id:                  number;
    readonly name_specification:  rawNameSpecification;
    readonly value_specification: rawValueSpecification;
    readonly ind:                 number;
    readonly product:             number;
}

export type rawNameSpecification = {
    readonly id:                 number;
    readonly additional_data:    rawAdditionalData;
    readonly name_specification: string;
}

export type rawValueSpecification = {
    readonly id:                  number;
    readonly additional_data:     rawAdditionalData;
    readonly value_specification: string;
}

export type rawStock = {
    readonly price:                   number;
    readonly price_before_discount:   number;
    readonly quantity:                number;
    readonly edge:                    boolean;
    readonly transportation_cost:     null;
    readonly estimated_delivery_days: null;
}

export type rawTag = {
    readonly id:              number;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
    readonly additional_data: rawAdditionalData;
}

export type rawSpecToFilter = {
    readonly specifications__name_specification__name_specification:   string;
    readonly specifications__value_specification__value_specification: string;
}
