import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';
import { BrandElement, onClickLabelProps } from './FilterType';
import Section from './Section';
import { Flex, Tag, Typography } from 'antd';
import AnimatedTag from './AnimatedTag';

const {Text} = Typography

// Специальные ID для категорий и брендов
const CATEGORY_FILTER_TYPE_ID = -1;

// --- Кликалка для категорий ---
const CategoriesRenderListTags: React.FC<{
  categories: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ categories, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);
  const renderData = useMemo(
    () => (isExpanded ? categories : categories.slice(0, 5)),
    [isExpanded, categories],
  );
  const showToggle = categories.length > 5;

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
              style={{ cursor: 'pointer',display:'flex',gap:'5px' }}
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
              color={isExpanded ? 'red' : '#9999'}
              style={{ color: 'black', cursor: 'pointer' }}
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
