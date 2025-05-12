'use client';

import { Drawer, Flex, Skeleton, Spin } from 'antd';
import React, {
  useCallback,
  useReducer,
  useTransition,
  useState,
  useEffect,
  useMemo,
} from 'react';
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
import type {
  FacetResponse,
  onClickLabelProps,
  SelectFilteredType,
} from './SubModule/FilterType';

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
  const [sortOrder] = useQueryState('order', { defaultValue: 'stocks__price' });
  const route = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [state, dispatch] = useReducer(reducer, {
    selectedFilters: convertUrlToFilterData(searchParamsData, fetchData),
    filterHide: true,
  });

  const [data, setData] = useState<FacetResponse>({});

  const fetchDataByFilters = useCallback(
    (filters: SelectFilteredType[], pathname?: string) => {
      const url = `${buildUrl(filters, cityEn)}&ordering=${convertSortOrder(sortOrder)}`;
      startTransition(() => {
        if (pathname) {
          route.push({ pathname: pathname }, { scroll: false });
        }
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            setData({
              category: data.categorys,
              brands: data.brands,
              specifications: data.specifications,
              products: data?.products.items,
            }),
          );
      });
    },
    [cityEn, route, sortOrder],
  );

  useEffect(() => {
    fetchDataByFilters(state.selectedFilters);
  }, [fetchDataByFilters, state.selectedFilters]);

  const handleClick = useCallback(
    (payload: onClickLabelProps) => {
      const newSelected = toggleFilterValue(state.selectedFilters, payload);
      dispatch({ type: 'toggle_value', payload });

      const params = buildParams(newSelected);
      // route.push({ pathname: params }, { scroll: false });
      fetchDataByFilters(newSelected,params);
    },
    [state.selectedFilters, fetchDataByFilters],
  );

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear_filters' });
    // route.push({ pathname }, { scroll: false });
    fetchDataByFilters([], pathname);
  }, [fetchDataByFilters, pathname]);

  const handleToggle = useCallback(
    () => dispatch({ type: 'toggle_filter' }),
    [],
  );

  const TagsHeader = useMemo(
    () => (
      <RenderTagsList
        selectedFilters={state.selectedFilters}
        onClickLabel={handleClick}
        onClear={handleClear}
        headerContent={
          <Flex
            align='center'
            justify='space-between'
            style={{ width: '100%' }}
          >
            <SortingProducts url={pathname} />
            <ToggleFilter
              isCollapsed={state.selectedFilters.length > 0}
              filterHide={state.filterHide}
              onToggle={handleToggle}
            />
          </Flex>
        }
      />
    ),
    [
      state.selectedFilters,
      state.filterHide,
      handleClick,
      handleClear,
      handleToggle,
      pathname,
    ],
  );

  return (
    <Flex
      vertical
      style={{ padding: 0, position: 'relative', overflow: 'clip' }}
    >
      <Flex
        style={{
          position: 'sticky',
          top: 0,
          width: '100dvw',
          zIndex: 1000,
          background: '#f5f5f5',
        }}
      >
        {/* {/* <AnimatePresence initial={false} mode='wait'> */}
        <motion.div
          // key={isPending ? 'spinner' : 'tags'}
          // initial={{ opacity: 0, y: 10 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: 10 }}
          // transition={{ duration: 0.2 }}
          style={{ width: '100%' }}
        >
          {isPending && <Spin size='large' spinning fullscreen />}
          {TagsHeader}
        </motion.div>
        {/* </AnimatePresence> */}
      </Flex>

      <Drawer
        open={!state.filterHide}
        onClose={() => dispatch({ type: 'toggle_filter' })}
        placement='right'
        width={'100dvw'}
        closable={false}
        styles={{
          content: { margin: 0, padding: 0 },
          body: { margin: 0, padding: 0 },
        }}
      >
        <Flex
          style={{
            position: 'sticky',
            top: 0,
            width: '100dvw',
            zIndex: 1000,
            background: '#f5f5f5',
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key='tags-drawer'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{
                width: '100%',
                position: 'relative',
                background: '#f5f5f5',
              }}
            >
              {TagsHeader}
            </motion.div>
          </AnimatePresence>
        </Flex>

        <motion.div
          initial={false}
          animate={{
            opacity: state.filterHide ? 0 : 1,
            scale: state.filterHide ? 0.95 : 1,
            pointerEvents: state.filterHide || isPending ? 'none' : 'auto',
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
      </Drawer>

      <Flex style={{ width: '100%' }}>
        <LazyProductGrid
          products={data?.products}
          cityEn={cityEn}
          isPending={isPending}
        />
      </Flex>
    </Flex>
  );
};

FilterRenderMobile.displayName = 'FilterRenderMobile';
export default FilterRenderMobile;
