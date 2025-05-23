import { memo } from 'react';
import { FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';


interface ToggleFilterProps {
  filterHide: boolean;
  isCollapsed: boolean;  
  onToggle: () => void;
}

const ToggleFilter = memo(
  ({ filterHide, isCollapsed, onToggle }: ToggleFilterProps) => {




    const backgroundColor = filterHide ? '#4954f0' : '#cb8400';

    return (
      <motion.button
        onClick={onToggle}
        initial={false}
        animate={{ backgroundColor }}
        transition={{ duration: 0.3 }}
        style={{
          marginRight:'10px',
          gap: 8,
          border: 'none',
          height: 40,
          borderRadius: 12,
          cursor: 'pointer',
          color: 'white',
          padding:'0px'
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={filterHide ? 'filter' : 'close'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {filterHide ? <FilterOutlined style={{ padding: '10px 15px'}}  /> : <CloseOutlined style={{ padding: '10px 15px'}} />}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              key="text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* <Text style={{ color: 'white', whiteSpace: 'nowrap',textAlign:'center' }}>
                {filterHide ? 'Показать фильтры' : 'Скрыть фильтры'}
              </Text> */}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    );
  },
);

ToggleFilter.displayName = 'ToggleFilter';
export default ToggleFilter;
