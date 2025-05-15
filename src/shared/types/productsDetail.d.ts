import { iDescription } from "./descriptionProduct";
import { Products } from "./products";

export interface ProductsDetail {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number }|null ;
    readonly average_rating:    number;
    readonly reviews_count:     number;
    readonly discount_amount_p: string|null;
    readonly discount_amount_c: string|null;
    readonly category:          Category;
    readonly brand:             Brand;
    readonly present:           Products[];
    readonly services:          Service[];
    readonly related_product:   Products[];
    readonly configuration:     Products[];
    readonly old_price_p:       { [key: string]: number }|null;
    readonly old_price_c:       { [key: string]: number }|null;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly vendor_code:       string;
    readonly name_product:      string;
    readonly list_url_to_image: string[];
    readonly description: iDescription;
}

export interface AdditionalData {
    readonly en: string;
    readonly kk: string;
}

export interface Brand {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly name_brand:      string;
}

export interface Category {
    readonly id:                number;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_category:     string;
    readonly lft:               number;
    readonly rght:              number;
    readonly tree_id:           number;
    readonly level:             number;
    readonly parent:            number;
    readonly list_url_to_image: string[];
    readonly list_url_to_baner: string[];
}

export interface Configuration {
    readonly id:                number;
    readonly tag_prod:          TagProd[];
    readonly price:             { [key: string]: number };
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

export interface TagProd {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly tag_text:        string;
    readonly font_color:      string;
    readonly fill_color:      string;
}

export interface Service {
    readonly id:              number;
    readonly cities:          City[];
    readonly additional_data: AdditionalData;
    readonly name:            string;
    readonly description:     string;
    readonly price:           string;
}

export interface City {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly name_city:       string;
}
