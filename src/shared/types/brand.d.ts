export interface Brands {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly name_brand:      string;
}

export interface AdditionalData {
    readonly en: string;
    readonly kk: string;
}
