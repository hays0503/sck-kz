import { Button, Typography } from 'antd';
import { memo, useMemo } from 'react';
import { FilterOutlined, FilterFilled } from '@ant-design/icons';

const { Text } = Typography;

interface ToggleFilterProps {
  filterHide: boolean;
  onToggle: () => void;
}

const ToggleFilter = memo(({ filterHide, onToggle }: ToggleFilterProps) => {
  const buttonStyle = useMemo(() => ({
    width: '100%',
    backgroundColor: filterHide ? '#4954f0' : '#cb8400',
    height: '40px',
    padding: '8px 16px',
    borderRadius: '12px',
  }), [filterHide]);

  return (
    <Button
      type="primary"
      icon={filterHide ? <FilterOutlined /> : <FilterFilled />}
      onClick={onToggle}
      style={buttonStyle}
    >
      <Text style={{ color: 'white' }}>
        {filterHide ? 'Показать фильтры' : 'Скрыть фильтры'}
      </Text>
    </Button>
  );
});

ToggleFilter.displayName = 'ToggleFilter';
export default ToggleFilter;