export interface iCity {
    readonly id:              number;
    readonly additional_data: AdditionalData;
    readonly name_city:      string;
}

export interface AdditionalData {
    readonly en: string;
    readonly kk: string;
}
