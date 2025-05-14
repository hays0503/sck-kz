import {
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
} from './FilterType';

export const toggleFilterValue = (
  prev: SelectFilteredType[],
  {
    type_id,
    type_name,
    additional_data_type,
    value_id,
    value_name,
    additional_data_value,
  }: onClickLabelProps,
): SelectFilteredType[] => {

  const existing = prev.find((t: SelectFilteredType) => t.id === type_id);
  if (!existing) {
    const returnData: SelectFilteredType[] = [
      ...prev,
      {
        id: type_id,
        name: type_name,
        values: [
          {
            id: value_id,
            value: value_name,
            count: 0,
            additional_data: additional_data_value,
          },
        ],
        additional_data: additional_data_type,
      },
    ];
    return returnData;
  }

  const has = existing.values.find(
    (v: SelectFilteredValueType) => v.id === value_id,
  );

  if (has) {
    const newVals = existing.values.filter(
      (v: SelectFilteredValueType) => v.id !== value_id,
    );
    return newVals.length === 0
      ? prev.filter((t: SelectFilteredType) => t.id !== type_id)
      : prev.map((t: SelectFilteredType) =>
          t.id === type_id
            ? { ...t, values: newVals, additional_data: additional_data_type }
            : t,
        );
  }

  return prev.map((t:SelectFilteredType) =>
    t.id === type_id
      ? {
          ...t,
          values: [
            ...t.values,
            {
              id: value_id,
              value: value_name,
              count: 0,
              additional_data: additional_data_value,
            },
          ],
        }
      : t,
  );
};
