'use client';
import { Collapse, Flex, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import RenderActiveTags, {
  ActiveFilterType,
} from './SubModule/RenderActiveTags';
import { Specification } from '@/shared/types/specification';
import Link from 'next/link';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;


const FilterMobile: React.FC<{ specifications: Specification[] }> = ({
  specifications,
}) => {
  const [activeKey, setActiveKey] = useState<ActiveFilterType[]>([]);

  const grouped = useMemo(() => {
    const result: Record<
      string,
      {
        count: number;
        values: Map<string, { id: number; productIds: number[] }>;
      }
    > = {};

    for (const {
      name_specification,
      value_specification,
      product,
    } of specifications) {
      const name = name_specification?.name_specification?.trim();
      const value = value_specification?.value_specification?.trim();
      const id = value_specification?.id;

      if (!name || !value) continue;

      if (!result[name]) result[name] = { count: 0, values: new Map() };

      result[name].count += 1;

      if (!result[name].values.has(value)) {
        result[name].values.set(value, { id, productIds: [product] });
      } else {
        result[name].values.get(value)!.productIds.push(product);
      }
    }

    return Object.entries(result).sort((a, b) => b[1].count - a[1].count);
  }, [specifications]);

  const isSelectedType = useCallback(
    (type_id: number) => activeKey.some((item) => item.type_id === type_id),
    [activeKey],
  );

  const isSelectedValue = useCallback(
    (type_id: number, value_id: number) =>
      activeKey.some(
        (item) =>
          item.type_id === type_id &&
          item.values.some((v) => v.value_id === value_id),
      ),
    [activeKey],
  );

  const onClickLabel = useCallback(
    (
      type_name: string,
      type_id: number,
      value_name: string,
      value_id: number,
    ) => {
      setActiveKey((prev) => {
        const existing = prev.find((item) => item.type_id === type_id);

        if (existing) {
          const exists = existing.values.some((v) => v.value_id === value_id);
          const updatedValues = exists
            ? existing.values.filter((v) => v.value_id !== value_id)
            : [...existing.values, { value_name, value_id }];

          const updated = prev.map((item) =>
            item.type_id === type_id
              ? { ...item, values: updatedValues }
              : item,
          );

          return updated.filter((item) => item.values.length > 0);
        }

        return [
          ...prev,
          { type_name, type_id, values: [{ value_name, value_id }] },
        ];
      });
    },
    [],
  );

  const ExpandsText: React.FC<{ Node: React.ReactNode }> = ({ Node }) => {
    const [expanded, setExpanded] = useState(false);

    if (!expanded) {
      return (
        <InfoCircleOutlined
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '16px',
            color: '#999',
          }}
        />
      );
    }

    return <>{Node}</>;
  };

  const collapseItems = useMemo(
    () =>
      grouped.flatMap(([name, { count, values }]) => {
        const type_id = specifications?.find(
          (s) => s?.name_specification?.name_specification.trim() === name,
        )?.name_specification.id;

        if (!type_id) return [];

        return [
          {
            key: name,
            label: (
              <Text
                style={{
                  color: isSelectedType(type_id) ? 'red' : 'inherit',
                }}
              >
                {`${name} — (${count}) = id:${type_id}`}
              </Text>
            ),
            children: (
              <ul style={{ paddingLeft: '1rem' }}>
                {[...values.entries()]
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([value, { id, productIds }]) => {
                    return (
                      <Flex
                        key={id}
                        gap={5}
                        style={{
                          cursor: 'pointer',
                          color: isSelectedValue(type_id, id)
                            ? 'red'
                            : 'inherit',
                        }}
                        wrap
                      >
                        <Text
                          style={{
                            color: 'inherit',
                          }}
                          onClick={() => onClickLabel(name, type_id, value, id)}
                        >
                          {value}
                        </Text>
                        <ExpandsText
                          Node={
                            <Flex gap={5} wrap>
                              <Text style={{ color: '#999' }}>
                                id:{productIds.length},
                              </Text>
                              <Text style={{ color: '#999' }}>
                                {productIds.length}{' '}
                                {productIds.length === 1
                                  ? 'товар,'
                                  : 'товаров,'}
                              </Text>
                              <Flex gap={5} wrap>
                                {productIds
                                  .filter(
                                    (id, index, arr) =>
                                      id != null && arr.indexOf(id) === index,
                                  ) // убираем null и дубликаты
                                  .map((id) => (
                                    <Link
                                      key={String(id)}
                                      href={`https://sck.kz/admin/app_products/products/${id}/change/`}
                                      target='_blank'
                                    >
                                      {id}
                                    </Link>
                                  ))}
                              </Flex>
                            </Flex>
                          }
                        />
                      </Flex>
                    );
                  })}
              </ul>
            ),
          },
        ];
      }),
    [grouped, specifications, isSelectedType, isSelectedValue, onClickLabel],
  );

  const url = `http://185.100.67.246:8888/categories/facets/?${activeKey
    .map(
      ({ type_id, values }) =>
        `spec_${type_id}=${values.map(({ value_id }) => value_id).join(',')}`,
    )
    .join('&')}`;

  return (
    <Flex vertical gap={12} style={{ width: '100%' }}>
      <Link
        href={url}
        target='_blank'
        style={{
          textWrap: 'balance',
          overflowWrap: 'break-word',
          padding: '10px',
        }}
      >
        {url}
      </Link>
      <RenderActiveTags activeKey={activeKey} onClickTag={onClickLabel} />
      <Collapse accordion items={collapseItems} />
    </Flex>
  );
};

export default FilterMobile;
