import { Flex } from 'antd';
import {
  onClickLabelProps,
  SelectFilteredType,
  Specification,
} from './FilterType';
import Section from './Section';
import { AnimatePresence, motion } from 'framer-motion';
import SpecificationsRenderItem from './SpecificationsRenderItem';
import { memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const SpecificationsRenderList = ({
  selectedFilters,
  specifications,
  onClickLabel,
}: {
  selectedFilters: SelectFilteredType[];
  specifications: Specification[];
  onClickLabel: (props: onClickLabelProps) => void;
}) => {
  const t = useTranslations('SpecificationsRenderList');
  // Мемоизация функции onClickLabel для предотвращения лишних рендеров
  const memoOnClickLabel = useCallback(onClickLabel, [onClickLabel]);

  return <Section title={t('characteristics')}>
    <Flex vertical gap={16} wrap>
      <AnimatePresence initial={false}>
        {specifications.map((spec: Specification) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <SpecificationsRenderItem
              selectedFilters={selectedFilters}
              specification={spec}
              onClickLabel={memoOnClickLabel}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  </Section>;
};

export default memo(SpecificationsRenderList);