import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';
import {
  BrandElement,
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
} from './FilterType';
import Section from './Section';
import { Flex, Tag, Typography } from 'antd';
import AnimatedTag from './AnimatedTag';

const { Text } = Typography;

// Специальные ID для категорий и брендов
export const CATEGORY_FILTER_TYPE_ID = -1;

// --- Кликалка для категорий ---
const CategoriesRenderListTags: React.FC<{
  selectedFilters: SelectFilteredType[];
  categories: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ selectedFilters, categories, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);
  const renderData = useMemo(
    () => (isExpanded ? categories : categories.slice(0, 5)),
    [isExpanded, categories],
  );
  const showToggle = categories.length > 5;

  const selectedId =
    selectedFilters
      .find((f: SelectFilteredType) => f.id === CATEGORY_FILTER_TYPE_ID)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [];

  return (
    <Section title='Категории'>
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
          {renderData.map(({ id, name, count }) => (
            <AnimatedTag
              key={id}
              onClick={() =>
                onClickLabel({
                  type_id: CATEGORY_FILTER_TYPE_ID,
                  type_name: 'Категории',
                  value_id: id,
                  value_name: name,
                })
              }
              style={{
                border: 'none',
                padding: '10px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                gap: '5px',
                backgroundColor: selectedId.includes(id)
                  ? '#fdde45'
                  : '#bebebe26',
              }}
            >
              <Text>{name}</Text>
              <Text style={{ color: '#808185', opacity: '0.5' }}>
                ({count})
              </Text>
            </AnimatedTag>
          ))}
        </AnimatePresence>
        {showToggle && (
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
    </Section>
  );
};

export default memo(CategoriesRenderListTags);
