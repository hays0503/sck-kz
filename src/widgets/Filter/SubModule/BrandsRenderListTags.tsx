import { memo, useCallback, useMemo, useState } from 'react';
import {
  BrandElement,
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
} from './FilterType';
import Section from './Section';
import { Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedTag from './AnimatedTag';

export const BRAND_FILTER_TYPE_ID = -2;

const { Text } = Typography;

// --- Кликалка для брендов ---
const BrandsRenderListTags: React.FC<{
  selectedFilters: SelectFilteredType[];
  brands: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ selectedFilters, brands, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);
  const renderData = useMemo(
    () => (isExpanded ? brands : brands.slice(0, 5)),
    [isExpanded, brands],
  );
  const showToggle = brands.length > 5;

  const selectedId =
    selectedFilters
      .find((f: SelectFilteredType) => f.id === BRAND_FILTER_TYPE_ID)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [];

  return (
    <Section title='Бренды'>
      <Flex wrap gap={10}>
        <AnimatePresence initial={false} mode="wait">
          {renderData.map(({ id, name, count }) => (
            <AnimatedTag
              key={id}
              onClick={() =>
                onClickLabel({
                  type_id: BRAND_FILTER_TYPE_ID,
                  type_name: 'Бренды',
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

export default memo(BrandsRenderListTags);
