// Основной компонент ExpandedSpecification

import { memo, useCallback, useMemo, useState } from 'react';
import {
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
  Specification,
} from './FilterType';
import { Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import ColorBall, { getHexColorsFromRussian } from './colors';
import AnimatedTag from './AnimatedTag';
const { Text } = Typography;
const ExpandedSpecification = ({
  selectedFilters,
  specification,
  onClickLabel,
}: {
  selectedFilters: SelectFilteredType[];
  specification: Specification;
  onClickLabel: (props: onClickLabelProps) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  const renderData = useMemo(
    () =>
      isExpanded ? specification.values : specification.values.slice(0, 5),
    [isExpanded, specification],
  );

  const showTagExpanded = specification.values.length > 5;

  const selectedId =
    selectedFilters
      .find((f: SelectFilteredType) => f.id === specification.id)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [];

  return (
    <Flex wrap gap={8}>
      <AnimatePresence initial={false}>
        {renderData.map(({ id, value, count }) => {
          const colors = getHexColorsFromRussian(value); // Извлекаем цвета из value

          return (
            <AnimatedTag
              key={id}
              onClick={() =>
                onClickLabel({
                  type_id: specification.id,
                  type_name: specification.name,
                  value_id: id,
                  value_name: value,
                })
              }
              style={{
                border: 'none',
                padding: '10px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: selectedId.includes(id)
                  ? '#fdde45'
                  : '#bebebe26',
              }}
            >
              <Flex gap={4}>
                {colors.length > 0 && <ColorBall colors={colors} />}
                {/* Отображаем шарик, если есть цвета */}
                <Text>{value}</Text>
                <Text style={{ color: '#808185', opacity: '0.5' }}>
                  ({count})
                </Text>
              </Flex>
            </AnimatedTag>
          );
        })}
      </AnimatePresence>
      {showTagExpanded && (
        <motion.div layout>
          <Tag
            onClick={toggleExpanded}
            color={isExpanded ? 'red' : '#bebebe26'}
            style={{
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              padding: '10px',
              borderRadius: '12px',
            }}
          >
            {isExpanded ? 'Скрыть' : '...'}
          </Tag>
        </motion.div>
      )}
    </Flex>
  );
};

export default memo(ExpandedSpecification);
