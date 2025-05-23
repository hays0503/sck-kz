import { AnimatePresence } from 'framer-motion';
import AnimatedTag from './AnimatedTag';
import { memo } from 'react';

// Универсальный список тэгов
const RenderList = <T extends { id: number; name: string }>({
  renderData,
}: {
  renderData: T[] | undefined;
}) => (
  <AnimatePresence initial={false}>
    {renderData?.map(({ id, name }) => (
      <AnimatedTag
        style={{
          border:'none',
          padding:'10px',
          borderRadius: '12px',
          backgroundColor: '#bebebe26'
        }}
        key={id}
      >
        {name}
      </AnimatedTag>
    ))}
  </AnimatePresence>
);

export default memo(RenderList);
