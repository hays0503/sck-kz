import { rawProductsTypeV2 } from "api-mapping/product/_type/rawProductTypeV2";

// Типы для фильтров
export type Value = {
  id: number;
  value: string;
  count: number;
  additional_data: Record<string, string | null>;
};
export type BrandElement = {
  id: number;
  name: string;
  count: number;
  additional_data: Record<string, string | null>;
};
export type Specification = {
  id: number;
  name: string;
  values: Value[];
  additional_data: Record<string, string | null>;
};
export type SelectFilteredValueType = {
  id: number;
  value: string;
  count: number;
  additional_data: Record<string, string | null>;
};
export type SelectFilteredType = {
  id: number;              // type_id
  name: string;            // type_name
  values: SelectFilteredValueType[];
  additional_data: Record<string, string | null>;
};
export type onClickLabelProps = {
  type_id: number;
  type_name: string;
  additional_data_type: Record<string, string | null>;
  value_id: number;
  value_name: string;
  additional_data_value: Record<string, string | null>;
};
export type FacetResponse = {
  category?: BrandElement[];
  brands?: BrandElement[];
  specifications?: Specification[];
  products?: rawProductsTypeV2[];
};