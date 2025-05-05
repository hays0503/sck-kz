// components/RenderList.tsx
import React from 'react';
import { Tag, Typography, Flex } from 'antd';

const { Text } = Typography;

export interface Value {
  id: number;
  value: string;
  count: number;
}

interface RenderListProps {
  data?: Value[];
  onClick?: (v: Value) => void;
}

export const RenderList: React.FC<RenderListProps> = React.memo(({ data, onClick }) => (
  <>
    {data?.map(({ id, value, count }) => (
      <Tag key={id} onClick={onClick ? () => onClick({ id, value, count }) : undefined}>
        <Flex gap={4}>
          <Text>{value}</Text>
          <Text style={{ color: '#808185', opacity: 0.5 }}>({count})</Text>
        </Flex>
      </Tag>
    ))}
  </>
));

RenderList.displayName = 'RenderList';