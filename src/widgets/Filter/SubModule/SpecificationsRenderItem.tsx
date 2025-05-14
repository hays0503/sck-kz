import { memo } from 'react';
import { onClickLabelProps, SelectFilteredType, Specification } from './FilterType';
import { Flex, Typography } from 'antd';
import ExpandedSpecification from './ExpandedSpecification';
import { useLocale } from 'next-intl';

const { Text } = Typography;

const selectedName = (data: Specification, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['KZ']??data?.name;
    case 'en':
      return data?.additional_data?.['EN']??data?.name;
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
  return <Flex vertical gap={4}>
    <Text strong>{selectedName(specification, locale)}</Text>
    <ExpandedSpecification
      selectedFilters={selectedFilters}
      specification={specification}
      onClickLabel={onClickLabel}
    />
  </Flex>
};

export default memo(SpecificationsRenderItem);
