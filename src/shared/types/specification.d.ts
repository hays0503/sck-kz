

export type Specification  = {
    id:                  number;
    name_specification:  NameSpecification;
    value_specification: ValueSpecification;
    product:             number;
}

export interface NameSpecification {
    id:                 number;
    additional_data:    AdditionalData;
    name_specification: string;
}

export interface AdditionalData {
    EN: string;
    KZ: string;
}

export interface ValueSpecification {
    id:                  number;
    additional_data:     AdditionalData;
    value_specification: string;
}


export type SpecificationNameSpecificationParams = {
    (object:Specification | null,currentLang: "ru" | "en" | "kk" | string): string|undefined;
    (object:NameSpecification,currentLang: "ru" | "en" | "kk" | string): string|undefined;
};

export type SpecificationValueSpecificationParams = {
    (object:Specification | null,currentLang: "ru" | "en" | "kk" | string): string|undefined;
    (object:ValueSpecification,currentLang: "ru" | "en" | "kk" | string): string|undefined;
};