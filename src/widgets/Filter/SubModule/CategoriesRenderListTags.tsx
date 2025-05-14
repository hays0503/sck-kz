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
import { useLocale, useTranslations } from 'next-intl';

const { Text } = Typography;

// Специальные ID для категорий и брендов
export const CATEGORY_FILTER_TYPE_ID = -1;

const selectedName = (data: BrandElement, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['KZ']!=''?data?.additional_data?.['KZ']:data.name;
    case 'en':
      return data?.additional_data?.['EN']!=''?data?.additional_data?.['EN']:data.name;
    default:
      return data?.name;
  }
};

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
  const t = useTranslations();
  const showToggle = categories.length > 5;
  const locale = useLocale();
  const selectedId =
    selectedFilters
      .find((f: SelectFilteredType) => f.id === CATEGORY_FILTER_TYPE_ID)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [];

  return (
    <Section title={t('kategorii')}>
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
          {renderData.map((renderForData: BrandElement) => {
            return (
              <AnimatedTag
                key={renderForData.id}
                onClick={() => {
                  const data: onClickLabelProps = {
                    type_id: CATEGORY_FILTER_TYPE_ID,
                    type_name: 'Категории',
                    value_id: renderForData.id,
                    value_name: renderForData.name,
                    additional_data_type: { EN: 'Categories', KZ: 'Санаттар' },
                    additional_data_value: renderForData.additional_data,
                  };
                  onClickLabel(data);
                }}
                style={{
                  border: 'none',
                  padding: '10px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '5px',
                  backgroundColor: selectedId.includes(renderForData.id)
                    ? '#fdde45'
                    : '#bebebe26',
                }}
              >
                <Text>{selectedName(renderForData, locale)}</Text>
                <Text style={{ color: '#808185', opacity: '0.5' }}>
                  ({renderForData.count})
                </Text>
              </AnimatedTag>
            );
          })}
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
