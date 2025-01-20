export interface rawCity {
    readonly id:              number;
    readonly additional_data: rawAdditionalData;
    readonly name_city:      string;
}

export interface rawAdditionalData {
    readonly [key: string]: string;
}
