'use client';

import { Flex } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import React, { memo, useCallback, useState } from 'react';
import type {
  FacetResponse,
  onClickLabelProps,
  SelectFilteredType,
} from './SubModule/FilterType';
import RenderTagsList from './SubModule/RenderTagsList';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { toggleFilterValue } from './SubModule/ToggleFilterValue';
import ToggleFilter from './SubModule/ToggleFilter';
import ProductGrid from './SubModule/ProductGrid';

import dynamic from 'next/dynamic';

const LazySpecificationsRenderList = dynamic(() => import('./SubModule/SpecificationsRenderList'), {
  ssr: false,
  loading: () => <div>Загрузка характеристик...</div>,
});
const LazyCategoriesRenderListTags = dynamic(() => import('./SubModule/CategoriesRenderListTags'), {
  ssr: false,
  loading: () => <div>Загрузка категорий...</div>,
});
const LazyBrandsRenderListTags = dynamic(() => import('./SubModule/BrandsRenderListTags'), {
  ssr: false,
  loading: () => <div>Загрузка брендов...</div>,
});

export const FilterRenderMobile: React.FC<{ fetchData: FacetResponse }> = ({
  fetchData,
}) => {
  const cityEn = useGetCityParams();
  const [filterHide, setFilterHide] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<SelectFilteredType[]>(
    [],
  );

  const onClickLabel = useCallback((payload: onClickLabelProps) => {
    setSelectedFilters((prev) => toggleFilterValue(prev, payload));
  }, []);

  const Menu: React.FC = memo(() => (
    <>
      {selectedFilters.length === 0 && (
        <Flex
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '16px',
            background: '#f5f5f5',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <ToggleFilter
            filterHide={filterHide}
            onToggle={() => setFilterHide(!filterHide)}
          />
        </Flex>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key="tags-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 2000, top: 0, position: 'sticky' }}
        >
          {selectedFilters.length > 0 && (
            <RenderTagsList
              selectedFilters={selectedFilters}
              onClickLabel={onClickLabel}
              onClear={() => setSelectedFilters([])}
              ToggleFilter={
                <ToggleFilter
                  filterHide={filterHide}
                  onToggle={() => setFilterHide(!filterHide)}
                />
              }
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  ));
  Menu.displayName = 'Menu';

  const Filter: React.FC = memo(() => {
    const visible = !filterHide;
  
    return (
      <motion.div
        key="mobile-filter"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.9,
          pointerEvents: visible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          backgroundColor: 'inherit',
          zIndex: 900,
          padding: '10px',
          willChange: 'opacity, transform',
          height: `${visible ? 'auto' : 0}`,
        }}
      >
        <Flex vertical gap={12}>
          {fetchData?.category && fetchData?.category?.length > 0 && (
            <LazyCategoriesRenderListTags
              categories={fetchData.category}
              onClickLabel={onClickLabel}
            />
          )}
          {fetchData?.brands && fetchData?.brands?.length > 0 && (
            <LazyBrandsRenderListTags
              brands={fetchData.brands}
              onClickLabel={onClickLabel}
            />
          )}
          {fetchData?.specifications && fetchData?.specifications?.length > 0 && (
            <LazySpecificationsRenderList
              specifications={fetchData.specifications}
              onClickLabel={onClickLabel}
            />
          )}
        </Flex>
      </motion.div>
    );
  });
  Filter.displayName = 'Filter';

  return (
    <Flex vertical style={{ padding: '0', position: 'relative',overflow: 'hidden' }}>
      <Menu />
      <Filter />
      {fetchData?.products && (
        <ProductGrid products={fetchData.products} cityEn={cityEn} />
      )}
    </Flex>
  );
};