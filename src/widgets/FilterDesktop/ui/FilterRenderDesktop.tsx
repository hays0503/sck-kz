'use client';

import { Drawer, Flex, Skeleton, Spin } from 'antd';
import React, {
  useCallback,
  useReducer,
  useTransition,
  useState,
  useEffect,
  useMemo,
  memo,
} from 'react';
import dynamic from 'next/dynamic';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { toggleFilterValue } from './SubModule/ToggleFilterValue';
import ToggleFilter from './SubModule/ToggleFilter';
import { AnimatePresence, motion } from 'framer-motion';
import RenderTagsList from './SubModule/RenderTagsList';
import {
  buildParams,
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
import CityEnToRu from '@/shared/constant/city';

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
  | { type: 'toggle_value'; payload: SelectFilteredType[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggle_filter':
      return { ...state, filterHide: !state.filterHide };
    case 'clear_filters':
      return { ...state, selectedFilters: [] };
    case 'toggle_value':
      return { ...state, selectedFilters: action.payload };
    default:
      return state;
  }
};

const FilterRenderDesktop: React.FC<{
  fetchData: FacetResponse;
  searchParamsData: string;
}> = ({ fetchData, searchParamsData }) => {
  const cityEn = useGetCityParams();
  const [sortOrder] = useQueryState('order', { defaultValue: 'stocks__price' });
  const route = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const initialFilters = useMemo(
    () => convertUrlToFilterData(searchParamsData, fetchData),
    [searchParamsData, fetchData],
  );

  const [state, dispatch] = useReducer(reducer, {
    selectedFilters: initialFilters,
    filterHide: true,
  });

  const [data, setData] = useState<FacetResponse>({});

  const fetchDataByFilters = useCallback(
    (filters: SelectFilteredType[]) => {
      const url = `/categories/facets/${buildParams(filters)}&ordering=${convertSortOrder(sortOrder)}&city=${CityEnToRu[cityEn]}`;

      return fetch(url, { next: { revalidate: 3600 } })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then((data) =>
          startTransition(() => {
            setData({
              category: data.categorys,
              brands: data.brands,
              specifications: data.specifications,
              products: data?.products.items,
            });

          }),
        )
        .catch((err) => {
          console.error('Error loading filters:', err);
          startTransition(() => setData({}));
        });
    },
    [cityEn, sortOrder],
  );

  useEffect(() => {
    fetchDataByFilters(state.selectedFilters);
  }, [fetchDataByFilters, state.selectedFilters]);

  const handleClick = useCallback(
    (payload: onClickLabelProps) => {
      setIsLoading(true);
      toggleFilterValue(state.selectedFilters, payload)
        .then((newSelected) => {
          dispatch({ type: 'toggle_value', payload: newSelected });
          const searchString = buildParams(newSelected);
          route.replace(`${pathname}${searchString}`, { scroll: false });
          return fetchDataByFilters(newSelected);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [state.selectedFilters, fetchDataByFilters, pathname, route],
  );

  const handleClear = useCallback(() => {
    setIsLoading(true);
    dispatch({ type: 'clear_filters' });
    route.replace(pathname, { scroll: false });
    fetchDataByFilters([]).finally(() => {
      setIsLoading(false);
    });
  }, [fetchDataByFilters, pathname, route]);

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
        leftContent={<SortingProducts url={pathname} />}
        rightContent={
          <ToggleFilter
            isCollapsed={state.selectedFilters.length > 0}
            filterHide={state.filterHide}
            onToggle={handleToggle}
          />
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
    <>
      <Flex wrap vertical style={{ padding: 0, position: 'relative' }}>
        <Flex
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            zIndex: 1000,
            background: '#f5f5f5',
          }}
        >
          {isLoading && (
            <Spin
              size='large'
              spinning
              fullscreen
              style={{
                zIndex: 2500,
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
          {TagsHeader}
        </Flex>

        <Drawer
          open={!state.filterHide}
          onClose={handleToggle}
          placement='right'
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
              width: '100%',
              zIndex: 1000,
              background: '#f5f5f5',
              overflowX: 'clip',
            }}
          >
            {isLoading && (
              <Spin
                size='large'
                spinning
                fullscreen
                style={{
                  zIndex: 2500,
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
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
            isPending={isPending || isLoading}
          />
        </Flex>
      </Flex>
    </>
  );
};
FilterRenderDesktop.displayName = 'FilterRenderDesktop';
export default memo(FilterRenderDesktop);
