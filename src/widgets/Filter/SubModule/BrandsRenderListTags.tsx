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
import { useLocale, useTranslations } from 'next-intl';

export const BRAND_FILTER_TYPE_ID = -2;

const { Text } = Typography;

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
  const t = useTranslations('BrandsRenderListTags');
  const showToggle = brands.length > 5;
  const locale = useLocale();
  const selectedId =
    selectedFilters
      .find((f: SelectFilteredType) => f.id === BRAND_FILTER_TYPE_ID)
      ?.values.map((v: SelectFilteredValueType) => v.id) ?? [];

  return (
    <Section title={t('brands')}>
      <Flex wrap gap={10}>
        <AnimatePresence initial={false}>
          {renderData.map((_data) => (
            <AnimatedTag
              key={_data.id}
              onClick={() => {
                const data: onClickLabelProps = {
                  type_id: BRAND_FILTER_TYPE_ID,
                  type_name: 'Бренды',
                  value_id: _data.id,
                  value_name: _data.name,
                  additional_data_type: {
                    KZ: 'Бренды',
                    EN: 'Brands',
                  },
                  additional_data_value: _data.additional_data,
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
                backgroundColor: selectedId.includes(_data.id)
                  ? '#fdde45'
                  : '#bebebe26',
              }}
            >
              <Text>{selectedName(_data,locale)}</Text>
              <Text style={{ color: '#808185', opacity: '0.5' }}>
                ({_data.count})
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
