import { onClickLabelProps, SelectFilteredType } from "./FilterType";


export const toggleFilterValue = (
  prev: SelectFilteredType[],
  { type_id, type_name, value_id, value_name }: onClickLabelProps
): SelectFilteredType[] => {
  const existing = prev.find(t => t.id === type_id);
  if (!existing) {
    return [...prev, {
      id: type_id,
      name: type_name,
      values: [{ id: value_id, value: value_name, count: 0 }],
    }];
  }

  const has = existing.values.find(v => v.id === value_id);
  if (has) {
    const newVals = existing.values.filter(v => v.id !== value_id);
    return newVals.length === 0
      ? prev.filter(t => t.id !== type_id)
      : prev.map(t => (t.id === type_id ? { ...t, values: newVals } : t));
  }

  return prev.map(t => t.id === type_id
    ? { ...t, values: [...t.values, { id: value_id, value: value_name, count: 0 }] }
    : t);
};
