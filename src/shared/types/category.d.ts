export interface Category {
    readonly id:                number;
    readonly additional_data:   AdditionalData;
    readonly slug:              string;
    readonly name_category:     string;
    readonly lft:               number;
    readonly rght:              number;
    readonly tree_id:           number;
    readonly level:             number;
    readonly parent:            number | null;
    readonly list_url_to_image: string[];
    readonly list_url_to_baner: string[];
    readonly title:             string;
    readonly label:             string;
    readonly value:             string;
    readonly key:               string;
    readonly children:          Category[];
}

export interface AdditionalData {
    readonly EN: string;
    readonly KZ: string;
}
