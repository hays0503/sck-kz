export interface iDescription {
    id:                      number;
    additional_data:         AdditionalData;
    title_description:       string;
    additional_data_to_desc: AdditionalData;
    body_description:        string;
    product:                 number;
}

export interface AdditionalData {
    en: string;
    kk: string;
}
