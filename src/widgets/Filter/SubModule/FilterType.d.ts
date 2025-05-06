import { rawProductsTypeV2 } from "api-mapping/product/_type/rawProductTypeV2";

// Типы для фильтров
export type Value = {
  id: number;
  value: string;
  count: number;
};
export type BrandElement = {
  id: number;
  name: string;
  count: number;
};
export type Specification = {
  id: number;
  name: string;
  values: Value[];
};
export type SelectFilteredValueType = {
  id: number;
  value: string;
  count: number;
};
export type SelectFilteredType = {
  id: number;              // type_id
  name: string;            // type_name
  values: SelectFilteredValueType[];
};
export type onClickLabelProps = {
  type_id: number;
  type_name: string;
  value_id: number;
  value_name: string;
};
export type FacetResponse = {
  category?: BrandElement[];
  brands?: BrandElement[];
  specifications?: Specification[];
  products?: rawProductsTypeV2[];
};