import { memo } from 'react';
import {
  onClickLabelProps,
  SelectFilteredType,
  SelectFilteredValueType,
  Specification,
  Value,
} from './FilterType';
import { Button, Flex, Tag, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import ColorBall, { getHexColorsFromRussian } from './colors';
import { CloseOutlined } from '@ant-design/icons';
import { useLocale } from 'next-intl';
const { Text } = Typography;

const tagMotionProps = {
  initial: { opacity: 0, scale: 0.8, x: 20 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.8, x: -20 },
  transition: { duration: 0.2 },
};

const selectedName = (data: Specification, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['kk'] != ''
        ? data?.additional_data?.['kk']
        : data.name;
    case 'en':
      return data?.additional_data?.['en'] != ''
        ? data?.additional_data?.['en']
        : data.name;
    default:
      return data?.name;
  }
};

const selectedValue = (data: Value, locale: string) => {
  switch (locale) {
    case 'kk':
      return data?.additional_data?.['kk'] != ''
        ? data?.additional_data?.['kk']
        : data.value;
    case 'en':
      return data?.additional_data?.['en'] != ''
        ? data?.additional_data?.['en']
        : data.value;
    default:
      return data.value;
  }
};

const RenderTagsList: React.FC<{
  selectedFilters: SelectFilteredType[];
  onClickLabel: (props: onClickLabelProps) => void;
  onClear: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}> = ({
  selectedFilters,
  onClickLabel,
  onClear,
  leftContent,
  rightContent,
}) => {
  const isShowDropFilter = selectedFilters.length > 0;
  const locale = useLocale();
  return (
    <Flex
      gap={5}
      style={{
        width: '100%',
        background: '#f5f5f5',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding:'5px'
      }}
    >
      {leftContent}

      {/* Прокручиваемый список тегов */}
      <Flex
        gap={10}
        justify='flex-start'
        align='center'
        style={{
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <AnimatePresence initial={false}>
          {isShowDropFilter && (
            <Button
              type='primary'
              style={{
                width: '100%',
                maxWidth: '50px',
                borderWidth: '1px',
                borderStyle: 'solid',
                background: '#fdde45',
                height: '40px',
                padding: '8px 16px',
                borderRadius: '12px',
              }}
              onClick={onClear}
            >
              <CloseOutlined style={{ color: '#E53935' }} />
            </Button>
          )}
          {selectedFilters?.map((filter: SelectFilteredType) => (
            <motion.div
              key={filter.id}
              layout
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
              }}
              {...tagMotionProps}
            >
              <Text
                strong
                style={{ fontSize: '16px' }}
              >{`${selectedName(filter, locale)}:`}</Text>
              {filter.values.map((value: SelectFilteredValueType) => {
                const colors = getHexColorsFromRussian(value.value);
                return (
                  <div key={value.id}>
                    <Tag
                      closable
                      style={{
                        display: 'flex',
                        border: 'none',
                        backgroundColor: '#fdde45',
                        padding: '10px',
                        borderRadius: '12px',
                      }}
                      onClose={(e) => {
                        e.preventDefault();
                        onClickLabel({
                          type_id: filter.id,
                          type_name: filter.name,
                          value_id: value.id,
                          value_name: value.value,
                          additional_data_type: filter.additional_data,
                          additional_data_value: value.additional_data,
                        });
                      }}
                    >
                      {colors.length > 0 && <ColorBall colors={colors} />}
                      <Text
                        style={{
                          color: 'inherit',
                          backgroundColor: 'inherit',
                          fontSize: '16px',
                        }}
                      >
                        {`${selectedValue(value, locale)}`}
                      </Text>
                    </Tag>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>

      {rightContent}
    </Flex>
  );
};

export default memo(RenderTagsList);
