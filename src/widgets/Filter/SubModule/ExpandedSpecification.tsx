// Основной компонент ExpandedSpecification

import { memo, useCallback, useMemo, useState } from 'react';
import {
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
  Specification,
  Value,
} from './FilterType';
import { Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import ColorBall, { getHexColorsFromRussian } from './colors';
import AnimatedTag from './AnimatedTag';
import { useLocale } from 'next-intl';
const { Text } = Typography;

const selectedValue = (data: Value, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['KZ'] != ''
        ? data?.additional_data?.['KZ']
        : data.value;
    case 'en':
      return data?.additional_data?.['EN'] != ''
        ? data?.additional_data?.['EN']
        : data.value;
    default:
      return data.value;
  }
};

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
  // Мемоизированный обработчик переключения раскрытия
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);

  const locale = useLocale();
  // Мемоизированные данные для отображения
  const renderData = useMemo(
    () =>
      isExpanded ? specification.values : specification.values.slice(0, 5),
    [isExpanded, specification],
  );

  const showTagExpanded = specification.values.length > 5;

  // Мемоизированные id выбранных значений
  const selectedId = useMemo(
    () => selectedFilters
      .find((f: SelectFilteredType) => f.id === specification.id)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [],
    [selectedFilters, specification.id]
  );

  // Мемоизированная функция для генерации onClick
  const handleTagClick = useCallback(
    (data: Value) => () => {
      const propsData: onClickLabelProps = {
        type_id: specification.id,
        type_name: specification.name,
        value_id: data.id,
        value_name: data.value,
        additional_data_type: data.additional_data,
        additional_data_value: data.additional_data,
      };
      onClickLabel(propsData);
    },
    [onClickLabel, specification.id, specification.name]
  );

  // Мемоизированные стили для AnimatedTag
  const getTagStyle = useCallback((isSelected: boolean) => ({
    whiteSpace: 'normal',
    border: 'none',
    padding: '10px',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#fdde45' : '#bebebe26',
  }), []);

  return (
    <Flex wrap gap={8}>
      <AnimatePresence initial={false}>
        {renderData.map((data: Value) => {
          const colors = getHexColorsFromRussian(data.value); // Извлекаем цвета из value

          return (
            <AnimatedTag
              key={data.id}
              // Мемоизированный обработчик клика по тегу
              onClick={handleTagClick(data)}
              style={getTagStyle(selectedId.includes(data.id))}
            >
              <Flex gap={4} wrap>
                {colors.length > 0 && <ColorBall colors={colors} />}
                {/* Отображаем шарик, если есть цвета */}
                <Text>
                  {selectedValue(data, locale)}
                  <Text style={{ color: '#808185', opacity: '0.5' }}>
                    ({data.count})
                  </Text>
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
