import { memo } from 'react';
import { onClickLabelProps, Specification } from './FilterType';
import { Flex, Typography } from 'antd';
import ExpandedSpecification from './ExpandedSpecification';

const { Text } = Typography;

// Элемент характеристики
const SpecificationsRenderItem = ({
  specification,
  onClickLabel,
}: {
  specification: Specification;
  onClickLabel: (props: onClickLabelProps) => void;
}) => (
  <Flex vertical gap={4}>
    <Text strong>{specification.name}</Text>
    <ExpandedSpecification
      specification={specification}
      onClickLabel={onClickLabel}
    />
  </Flex>
);

export default memo(SpecificationsRenderItem);
