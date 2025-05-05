// components/ExpandedSpecification.tsx
import React, { useState, useCallback } from 'react';
import { Divider, Flex, Typography, Tag } from 'antd';
import { RenderList, Value } from './RenderList';

const { Title } = Typography;

interface ExpandedSpecificationProps {
  name: string;
  values: Value[];
  onClick: (v: Value) => void;
}

export const ExpandedSpecification: React.FC<ExpandedSpecificationProps> = ({ name, values, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);

  const visibleItems = isExpanded ? values : values.slice(0, 5);
  const showToggle = values.length > 5;

  return (
    <Flex vertical gap={16} style={{ padding: '16px' }}>
      <Title level={4} style={{ margin: 0 }}>{name}</Title>
      <Divider style={{ margin: 0 }} />
      <Flex wrap style={{ rowGap: 10, columnGap: 10 }}>
        <RenderList data={visibleItems} onClick={onClick} />
        {showToggle && (
          <Tag onClick={toggleExpanded} style={{ cursor: 'pointer' }}>
            ...
          </Tag>
        )}
      </Flex>
    </Flex>
  );
};
