export interface Products {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number }|null;
    readonly average_rating:    number | null;
    readonly reviews_count:     number;
    readonly discount_amount_p: null | string;
    readonly discount_amount_c: null | string;
    readonly old_price_p:       { [key: string]: number } | null;
    readonly old_price_c:       { [key: string]: number } | null;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly vendor_code:       string;
    readonly name_product:      string;
    readonly category:          number;
    readonly brand:             number;
    readonly configuration:     number[];
    readonly related_product:   number[];
    readonly present:           number[];
    readonly services:          number[];
    readonly list_url_to_image: string[];
}

export interface AdditionalData {
    readonly EN: string;
    readonly KZ: string;
}

export interface TagProd {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
}
