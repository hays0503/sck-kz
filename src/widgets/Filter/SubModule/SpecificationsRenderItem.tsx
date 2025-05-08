import { memo } from 'react';
import { onClickLabelProps, SelectFilteredType, Specification } from './FilterType';
import { Flex, Typography } from 'antd';
import ExpandedSpecification from './ExpandedSpecification';

const { Text } = Typography;

// Элемент характеристики
const SpecificationsRenderItem = ({
  selectedFilters,
  specification,
  onClickLabel,
}: {
  selectedFilters: SelectFilteredType[];
  specification: Specification;
  onClickLabel: (props: onClickLabelProps) => void;
}) => (
  <Flex vertical gap={4}>
    <Text strong>{specification.name}</Text>
    <ExpandedSpecification
      selectedFilters={selectedFilters}
      specification={specification}
      onClickLabel={onClickLabel}
    />
  </Flex>
);

export default memo(SpecificationsRenderItem);
