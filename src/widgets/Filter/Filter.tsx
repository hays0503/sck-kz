'use client';

import { Flex, Skeleton } from 'antd';
import React, { useCallback, memo, useMemo, useReducer } from 'react';
import type {
  FacetResponse,
  onClickLabelProps,
  SelectFilteredType,
} from './SubModule/FilterType';
import dynamic from 'next/dynamic';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { toggleFilterValue } from './SubModule/ToggleFilterValue';
import ToggleFilter from './SubModule/ToggleFilter';
import { AnimatePresence, motion } from 'framer-motion';
import RenderTagsList from './SubModule/RenderTagsList';

const LazySpecificationsRenderList = dynamic(
  () => import('./SubModule/SpecificationsRenderList'),
  {
    ssr: false,
    loading: () => <Skeleton active>Загрузка характеристик...</Skeleton>,
  },
);
const LazyCategoriesRenderListTags = dynamic(
  () => import('./SubModule/CategoriesRenderListTags'),
  {
    ssr: false,
    loading: () => <Skeleton active>Загрузка категорий...</Skeleton>,
  },
);
const LazyBrandsRenderListTags = dynamic(
  () => import('./SubModule/BrandsRenderListTags'),
  {
    ssr: false,
    loading: () => <Skeleton active>Загрузка брендов...</Skeleton>,
  },
);

const LazyProductGrid = dynamic(() => import('./SubModule/ProductGrid'), {
  ssr: true,
  loading: () => <Skeleton active>Загрузка товаров...</Skeleton>,
});

const Menu = memo(
  ({
    hasFilters,
    selectedFilters,
    onClickLabel,
    onClear,
    toggleComponent,
    showToggle,
  }: {
    hasFilters: boolean;
    selectedFilters: SelectFilteredType[];
    onClickLabel: (payload: onClickLabelProps) => void;
    onClear: () => void;
    toggleComponent: React.ReactNode;
    showToggle: boolean;
  }) => (
    <Flex style={{ position: 'sticky', top: 0, width: '100dvw', zIndex: 1000 }}>
      {showToggle && (
        <Flex
          style={{
            width: '100%',
            padding: '16px',
            background: '#f5f5f5',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {toggleComponent}
        </Flex>
      )}
      <AnimatePresence mode='wait'>
        {hasFilters && (
          <motion.div
            key='tags-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            transition={{ duration: 0.1 }}
            style={{
              width: '100%',
              zIndex: 2000,
              top: 0,
              position: 'relative',
              background: '#f5f5f5',
            }}
          >
            <RenderTagsList
              selectedFilters={selectedFilters}
              onClickLabel={onClickLabel}
              onClear={onClear}
              ToggleFilter={toggleComponent}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  ),
);
Menu.displayName = 'Menu';

const Filter = memo(
  ({
    filterHide,
    fetchData,
    onClickLabel,
  }: {
    filterHide: boolean;
    fetchData: FacetResponse;
    onClickLabel: (payload: onClickLabelProps) => void;
  }) => {
    const visible = !filterHide;

    return (
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.95,
          pointerEvents: visible ? 'auto' : 'none',
          height: visible ? 'auto' : 0,
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative',
          backgroundColor: 'inherit',
          zIndex: 900,
          padding: visible ? '10px' : '0',
        }}
      >
        <Flex vertical gap={12}>
          {fetchData?.category && fetchData.category?.length > 0 && (
            <LazyCategoriesRenderListTags
              categories={fetchData.category}
              onClickLabel={onClickLabel}
            />
          )}
          {fetchData?.brands && fetchData.brands?.length > 0 && (
            <LazyBrandsRenderListTags
              brands={fetchData.brands}
              onClickLabel={onClickLabel}
            />
          )}
          {fetchData?.specifications &&
            fetchData.specifications?.length > 0 && (
              <LazySpecificationsRenderList
                specifications={fetchData.specifications}
                onClickLabel={onClickLabel}
              />
            )}
        </Flex>
      </motion.div>
    );
  },
);
Filter.displayName = 'Filter';

// Reducer for filters
type State = {
  selectedFilters: SelectFilteredType[];
  filterHide: boolean;
};
type Action =
  | { type: 'toggle_filter' }
  | { type: 'clear_filters' }
  | { type: 'toggle_value'; payload: onClickLabelProps };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggle_filter':
      return { ...state, filterHide: !state.filterHide };
    case 'clear_filters':
      return { ...state, selectedFilters: [] };
    case 'toggle_value':
      return {
        ...state,
        selectedFilters: toggleFilterValue(
          state.selectedFilters,
          action.payload,
        ),
      };
    default:
      return state;
  }
};

export const FilterRenderMobile: React.FC<{ fetchData: FacetResponse }> = memo(
  ({ fetchData }) => {
    const cityEn = useGetCityParams();
    const [state, dispatch] = useReducer(reducer, {
      selectedFilters: [],
      filterHide: true,
    });

    const handleToggle = useCallback(
      () => dispatch({ type: 'toggle_filter' }),
      [],
    );
    const handleClear = useCallback(
      () => dispatch({ type: 'clear_filters' }),
      [],
    );
    const handleClick = useCallback(
      (payload: onClickLabelProps) =>
        dispatch({ type: 'toggle_value', payload }),
      [],
    );

    const memoToggleFilter = useMemo(
      () => (
        <ToggleFilter filterHide={state.filterHide} onToggle={handleToggle} />
      ),
      [state.filterHide, handleToggle],
    );

    const memoizedProducts = useMemo(
      () => fetchData.products,
      [fetchData.products],
    );

    const hasFilters = state.selectedFilters.length > 0;

    return (
      <Flex
        vertical
        style={{ padding: 0, position: 'relative', overflow: 'clip' }}
      >
        <Menu
          hasFilters={hasFilters}
          selectedFilters={state.selectedFilters}
          onClickLabel={handleClick}
          onClear={handleClear}
          toggleComponent={memoToggleFilter}
          showToggle={!hasFilters}
        />
        <Filter
          filterHide={state.filterHide}
          fetchData={fetchData}
          onClickLabel={handleClick}
        />
        {memoizedProducts && (
          <LazyProductGrid products={memoizedProducts} cityEn={cityEn} />
        )}
      </Flex>
    );
  },
);
FilterRenderMobile.displayName = 'FilterRenderMobile';
