import { memo, useCallback, useMemo, useState } from 'react';
import { BrandElement, onClickLabelProps } from './FilterType';
import Section from './Section';
import { Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedTag from './AnimatedTag';

const BRAND_FILTER_TYPE_ID = -2;

const { Text } = Typography;

// --- Кликалка для брендов ---
const BrandsRenderListTags: React.FC<{
  brands: BrandElement[];
  onClickLabel: (props: onClickLabelProps) => void;
}> = ({ brands, onClickLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);
  const renderData = useMemo(
    () => (isExpanded ? brands : brands.slice(0, 5)),
    [isExpanded, brands],
  );
  const showToggle = brands.length > 5;

  return (
    <Section title='Бренды'>
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
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

export default memo(BrandsRenderListTags);
