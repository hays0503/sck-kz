import { Tag } from 'antd';
import { motion } from 'framer-motion';

// Анимированный Tag
const tagVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 0.95 },
};
const AnimatedTag: React.FC<React.ComponentProps<typeof Tag>> = ({
  children,
  ...props
}) => (
  <motion.div
    key={props.key}
    variants={tagVariants}
    initial='hidden'
    animate='visible'
    exit='exit'
    layout
    transition={{ duration: 0.2 }}
  >
    <Tag {...props}>{children}</Tag>
  </motion.div>
);

export default AnimatedTag;