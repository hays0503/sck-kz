import React, { forwardRef, ReactNode } from 'react';
import { TagProps } from 'antd';
import { motion, HTMLMotionProps } from 'framer-motion';

// Приводим motion(Tag) к компоненту, ожидающему props для span
// const MotionTag = motion(Tag) as React.ComponentType<HTMLMotionProps<'span'> & TagProps>;

const tagVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 0.95 },
};

type AnimatedTagProps = TagProps & HTMLMotionProps<'span'> & {
  children?: ReactNode;
};

// Используем forwardRef с типом HTMLSpanElement, так как Tag рендерится как <span>

const AnimatedTag = forwardRef<HTMLSpanElement, AnimatedTagProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <motion.span
      ref={ref}
      variants={tagVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.span>
  );
});

export default AnimatedTag;
AnimatedTag.displayName = 'AnimatedTag';