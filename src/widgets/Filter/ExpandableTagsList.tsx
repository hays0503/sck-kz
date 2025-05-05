// components/ExpandableTagsList.tsx
import React, { useState, useCallback } from 'react';
import { Flex, Tag, Divider, Typography } from 'antd';

const { Title } = Typography;

type TagData = {
  id?: number;
  name?: string;
};

interface ExpandableTagsListProps {
  title?: string;
  items: TagData[];
  onClick?: (item: TagData) => void;
}

export const ExpandableTagsList: React.FC<ExpandableTagsListProps> = ({ title, items, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), []);

  const visibleItems = isExpanded ? items : items.slice(0, 5);
  const showToggle = items.length > 5;

  return (
    <Flex vertical gap={16} style={{ padding: '16px' }}>
      {title && <Title level={4} style={{ margin: 0 }}>{title}</Title>}
      {title && <Divider style={{ margin: 0 }} />}
      <Flex wrap style={{ rowGap: 10, columnGap: 10 }}>
        {visibleItems.map(({ id, name }) => (
          <Tag key={id} onClick={onClick ? () => onClick({ id, name }) : undefined}>
            {name}
          </Tag>
        ))}
        {showToggle && (
          <Tag onClick={toggleExpanded} style={{ cursor: 'pointer' }}>
            ...
          </Tag>
        )}
      </Flex>
    </Flex>
  );
};
