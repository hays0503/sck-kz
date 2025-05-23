import { memo } from 'react';
import { onClickLabelProps, SelectFilteredType, Specification } from './FilterType';
import { Flex, Typography } from 'antd';
import ExpandedSpecification from './ExpandedSpecification';
import { useLocale } from 'next-intl';

const { Text } = Typography;

// Мемоизированная функция для вычисления имени характеристики
import { useMemo } from 'react';

const selectedName = (data: Specification, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['kk']!=''?data?.additional_data?.['kk']:data.name;
    case 'en':
      return data?.additional_data?.['en']!=''?data?.additional_data?.['en']:data.name;
    default:
      return data?.name;
  }
};

// Элемент характеристики
const SpecificationsRenderItem = ({
  selectedFilters,
  specification,
  onClickLabel,
}: {
  selectedFilters: SelectFilteredType[];
  specification: Specification;
  onClickLabel: (props: onClickLabelProps) => void;
}) => {
  const locale = useLocale();
  // Мемоизация имени характеристики для предотвращения лишних вычислений
  const specName = useMemo(() => selectedName(specification, locale), [specification, locale]);
  return <Flex vertical gap={4}>
    <Text strong>{specName}</Text>
    <ExpandedSpecification
      selectedFilters={selectedFilters}
      specification={specification}
      onClickLabel={onClickLabel}
    />
  </Flex>
};

export default memo(SpecificationsRenderItem);
