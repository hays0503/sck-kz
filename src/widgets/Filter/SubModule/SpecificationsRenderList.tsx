import { Flex } from 'antd';
import { onClickLabelProps, Specification } from './FilterType';
import Section from './Section';
import { AnimatePresence, motion } from 'framer-motion';
import SpecificationsRenderItem from './SpecificationsRenderItem';
import { memo } from 'react';

const SpecificationsRenderList = ({
  specifications,
  onClickLabel,
}: {
  specifications: Specification[];
  onClickLabel: (props: onClickLabelProps) => void;
}) => (
  <Section title='Характеристики'>
    <Flex vertical gap={16}>
      <AnimatePresence>
        {specifications.map((spec) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div layout>
              <SpecificationsRenderItem
                specification={spec}
                onClickLabel={onClickLabel}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  </Section>
);

export default memo(SpecificationsRenderList);
