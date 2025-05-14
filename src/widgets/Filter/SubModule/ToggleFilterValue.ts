import {
  onClickLabelProps,
  SelectFilteredType,
  // SelectFilteredValueType,
} from './FilterType';

export const toggleFilterValue = async (
  prev: SelectFilteredType[],
  {
    type_id,
    type_name,
    additional_data_type,
    value_id,
    value_name,
    additional_data_value,
  }: onClickLabelProps,
): Promise<SelectFilteredType[]> => {
  // Отдаём тяжёлую логику в event loop (асинхронно)
  return await new Promise<SelectFilteredType[]>((resolve) => {
    setTimeout(() => {
      const existing = prev.find((t) => t.id === type_id);

      if (!existing) {
        resolve([
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
        ]);
        return;
      }

      const has = existing.values.find((v) => v.id === value_id);

      if (has) {
        const newVals = existing.values.filter((v) => v.id !== value_id);
        resolve(
          newVals.length === 0
            ? prev.filter((t) => t.id !== type_id)
            : prev.map((t) =>
                t.id === type_id
                  ? { ...t, values: newVals, additional_data: additional_data_type }
                  : t,
              ),
        );
        return;
      }

      resolve(
        prev.map((t) =>
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
        ),
      );
    }, 0); // минимальная задержка, чтобы операция была асинхронной
  });
};
