'use client';

import { Flex, Skeleton, Spin } from 'antd';
import React, { useCallback, useReducer, useTransition, useState, useEffect } from 'react';
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
import {
  buildParams,
  buildUrl,
  convertUrlToFilterData,
} from './SubModule/useGetNewFilterData';
import { usePathname, useRouter } from '@/i18n/routing';
import { useQueryState } from 'nuqs';
import { SortingProducts } from '@/features/sorting-products';
import { convertSortOrder } from '@/features/sorting-products/ui/SortingProducts';

const LazySpecificationsRenderList = dynamic(
  () => import('./SubModule/SpecificationsRenderList'),
  { ssr: false, loading: () => <Skeleton active /> },
);
const LazyCategoriesRenderListTags = dynamic(
  () => import('./SubModule/CategoriesRenderListTags'),
  { ssr: false, loading: () => <Skeleton active /> },
);
const LazyBrandsRenderListTags = dynamic(
  () => import('./SubModule/BrandsRenderListTags'),
  { ssr: false, loading: () => <Skeleton active /> },
);
const LazyProductGrid = dynamic(() => import('./SubModule/ProductGrid'), {
  ssr: true,
  loading: () => <Skeleton active />,
});

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



export const FilterRenderMobile: React.FC<{
  fetchData: FacetResponse;
  searchParamsData: string;
}> = ({ fetchData, searchParamsData }) => {
  const cityEn = useGetCityParams();
  const [state, dispatch] = useReducer(reducer, {
    selectedFilters: convertUrlToFilterData(searchParamsData, fetchData),
    filterHide: true,
  });
  const [sortOrder] = useQueryState('order', { defaultValue: 'stocks__price' });
  const route = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<FacetResponse>(fetchData);
  const [isPending, startTransition] = useTransition();

  useEffect(()=>{
    startTransition(() => {
      const url = `${buildUrl(state.selectedFilters, cityEn)}&ordering=${convertSortOrder(sortOrder)}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) =>
          setData({
            category: res.categorys,
            brands: res.brands,
            specifications: res.specifications,
            products: res?.products.items,
          }),
        );
    });
  },[cityEn, sortOrder, state.selectedFilters])

  const handleClick = useCallback(
    (payload: onClickLabelProps) => {
      const newSelected = toggleFilterValue(state.selectedFilters, payload);
      dispatch({ type: 'toggle_value', payload });

      startTransition(() => {
        const url = buildUrl(newSelected, cityEn);
        const params = buildParams(newSelected);
        route.push(
          {
            pathname: params,
          },
          {
            scroll: false,
          },
        );
        fetch(`${url}&ordering=${convertSortOrder(sortOrder)}`)
          .then((res) => res.json())
          .then((res) =>
            setData({
              category: res.categorys,
              brands: res.brands,
              specifications: res.specifications,
              products: res?.products.items,
            }),
          );
      });
    },
    [state.selectedFilters, cityEn, route, sortOrder],
  );

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear_filters' });
    startTransition(() => {
      const url = buildUrl([], cityEn);
      route.push(
        {
          pathname,
        },
        {
          scroll: false,
        },
      );
      fetch(`${url}&ordering=${convertSortOrder(sortOrder)}`)
        .then((res) => res.json())
        .then((res) =>
          setData({
            category: res.categorys,
            brands: res.brands,
            specifications: res.specifications,
            products: res?.products.items,
          }),
        );
    });
  }, [cityEn, pathname, route, sortOrder]);

  const handleToggle = useCallback(
    () => dispatch({ type: 'toggle_filter' }),
    [],
  );

  const hasFilters = state.selectedFilters.length !== 0;

  return (
    <Flex
      vertical
      style={{ padding: 0, position: 'relative', overflow: 'clip' }}
    >
      <Flex
        vertical
        style={{
          position: 'sticky',
          top: 0,
          width: '100dvw',
          zIndex: 1000,
          background: '#f5f5f5',
        }}
      >
        <Flex style={{ padding: '16px 16px 16px 16px' }}>
          <ToggleFilter filterHide={state.filterHide} onToggle={handleToggle} />
        </Flex>
        <AnimatePresence mode='wait'>
          {isPending && <Spin size='large' spinning fullscreen />}
          {hasFilters && (
            <motion.div
              key='tags'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{
                width: '100%',
                position: 'relative',
                background: '#f5f5f5',
              }}
            >
              <RenderTagsList
                selectedFilters={state.selectedFilters}
                onClickLabel={handleClick}
                onClear={handleClear}
                ToggleFilter={
                  <ToggleFilter
                    filterHide={state.filterHide}
                    onToggle={handleToggle}
                  />
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>

      <motion.div
        initial={false}
        animate={{
          opacity: state.filterHide ? 0 : 1,
          scale: state.filterHide ? 0.95 : 1,
          pointerEvents: state.filterHide
            ? 'none'
            : isPending
              ? 'none'
              : 'auto',
          height: state.filterHide ? 0 : 'auto',
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'relative',
          backgroundColor: 'inherit',
          zIndex: 900,
          padding: state.filterHide ? '0' : '10px',
          opacity: isPending ? 0.5 : 1,
        }}
      >
        <Flex vertical gap={12}>
          {data.category && (
            <LazyCategoriesRenderListTags
              selectedFilters={state.selectedFilters}
              categories={data.category}
              onClickLabel={handleClick}
            />
          )}
          {data.brands && (
            <LazyBrandsRenderListTags
              selectedFilters={state.selectedFilters}
              brands={data.brands}
              onClickLabel={handleClick}
            />
          )}
          {data.specifications && (
            <LazySpecificationsRenderList
              selectedFilters={state.selectedFilters}
              specifications={data.specifications}
              onClickLabel={handleClick}
            />
          )}
        </Flex>
      </motion.div>

      {data.products && (
        <Flex style={{width:'100%'}} vertical>
          <SortingProducts url={pathname} />
          <LazyProductGrid
            products={data.products}
            cityEn={cityEn}
            isPending={isPending}
          />
        </Flex>
      )}
    </Flex>
  );
};

FilterRenderMobile.displayName = 'FilterRenderMobile';
export default FilterRenderMobile;
