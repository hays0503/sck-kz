import { Flex, Tag, Typography } from 'antd';
import { memo } from 'react';

const { Text } = Typography;

export type ActiveValueType = {
  value_name: string;
  value_id: number;
};

export type ActiveFilterType = {
  type_name: string;
  type_id: number;
  values: ActiveValueType[];
};

const RenderActiveTags = memo(
  ({
    activeKey,
    onClickTag,
  }: {
    activeKey: ActiveFilterType[];
    onClickTag: (
      type_name: string,
      type_id: number,
      value_name: string,
      value_id: number,
    ) => void;
  }) => {
    return (
      <>
        {activeKey.map(({ type_name, type_id, values }) => (
          <Flex
            key={type_id}
            gap={4}
            style={{ width: '100%', overflow: 'auto',padding: '0 10px' }}
            align='flex-start'
            vertical
          >
            <Text style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              {type_name}
            </Text>
            <Flex gap={4} wrap style={{ flex: 1, minWidth: 0 }}>
              {values.map(({ value_id, value_name }) => (
                <Tag
                  key={value_id}
                  onClick={() =>
                    onClickTag(type_name, type_id, value_name, value_id)
                  }
                >
                  {value_name}
                </Tag>
              ))}
            </Flex>
          </Flex>
        ))}
      </>
    );
  },
);
RenderActiveTags.displayName = 'RenderActiveTags';

export default RenderActiveTags;
