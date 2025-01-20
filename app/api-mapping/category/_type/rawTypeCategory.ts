export interface rawTypeCategory {
    readonly id:                number;
    readonly additional_data:   rawTypeAdditionalData;
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
    readonly children:          rawTypeCategory[]|[];
}

export interface rawTypeAdditionalData {
    readonly [key: string]: string;
}
