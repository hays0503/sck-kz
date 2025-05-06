import { memo, useEffect, useRef } from 'react';
import { onClickLabelProps, SelectFilteredType } from './FilterType';
import { Button, Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import ColorBall, { getHexColorsFromRussian } from './colors';

const { Text } = Typography;

const tagMotionProps = {
  initial: { opacity: 0, scale: 0.8, x: 20 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.8, x: -20 },
  transition: { duration: 0.2 },
};

const RenderTagsList: React.FC<{
  selectedFilters: SelectFilteredType[];
  onClickLabel: (props: onClickLabelProps) => void;
  onClear: () => void;
  ToggleFilter?: React.ReactNode;
}> = ({ selectedFilters, onClickLabel, onClear, ToggleFilter }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [selectedFilters]);

  return (
    <Flex
      gap={10}
      vertical
      style={{
        background: '#f5f5f5',
        padding: '16px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Кнопка сброса */}
      <Flex vertical gap={10}>
        {ToggleFilter}
        <Button
          type='primary'
          style={{
            width: '100%',
            backgroundColor: '#4954f0',
            height: '40px',
            padding: '8px 16px',
            borderRadius: '12px',
          }}
          onClick={onClear}
        >
          <Text style={{ color: '#fff' }}>Сбросить фильтры</Text>
        </Button>
      </Flex>

      {/* Прокручиваемый список тегов */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 8,
          paddingBottom: 4,
        }}
      >
        <AnimatePresence initial={false}>
          {selectedFilters.map((filter) => (
            <motion.div
              key={filter.id}
              layout
              style={{ display: 'flex', gap: 4, flexShrink: 0 }}
              {...tagMotionProps}
            >
              <Text strong>{`${filter.name}:`}</Text>
              {filter.values.map(({ id, value }) => {
                const colors = getHexColorsFromRussian(value);
                return (
                  <div key={id}>
                    <Tag
                      closable
                      style={{ display: 'flex' }}
                      onClose={(e) => {
                        e.preventDefault();
                        onClickLabel({
                          type_id: filter.id,
                          type_name: filter.name,
                          value_id: id,
                          value_name: value,
                        });
                      }}
                    >
                      {colors.length > 0 && <ColorBall colors={colors} />}
                      <Text>{value}</Text>
                    </Tag>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Flex>
  );
};

export default memo(RenderTagsList);
