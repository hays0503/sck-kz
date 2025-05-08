'use client';

import { useEffect, useState } from 'react';
import { BrandElement, FacetResponse, SelectFilteredType } from './FilterType';
import CityEnToRu from '@/shared/constant/city';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { CATEGORY_FILTER_TYPE_ID } from './CategoriesRenderListTags';
import { BRAND_FILTER_TYPE_ID } from './BrandsRenderListTags';

// Сборка URL с использованием URLSearchParams
export const buildUrl = (selectedFilters: SelectFilteredType[], cityEn: string): string => {
  const baseUrl = '/categories/facets/';
  const params = new URLSearchParams();

  const getIds = (name: string): string[] =>
    selectedFilters.find(f => f.name === name)?.values.map(v => v.id.toString()) ?? [];
  

  const categoryIds = getIds('Категории');
  const brandIds = getIds('Бренды');

  if (categoryIds.length > 0) params.set('category', categoryIds.join(','));
  if (brandIds.length > 0) params.set('brand', brandIds.join(','));

  selectedFilters
    .filter(f => f.name !== 'Категории' && f.name !== 'Бренды')
    .forEach(f => {
      const valueIds = f.values.map(v => v.id).join(',');
      if (valueIds) {
        params.set(`spec_${f.id}`, valueIds);
      }
    });

  return `${baseUrl}?${params.toString()}&city=${CityEnToRu[cityEn]}`;
};

export const buildParams = (selectedFilters: SelectFilteredType[]) => {
  const params = new URLSearchParams();

  const getIds = (name: string): string[] =>
    selectedFilters.find(f => f.name === name)?.values.map(v => v.id.toString()) ?? [];
  

  const categoryIds = getIds('Категории');
  const brandIds = getIds('Бренды');

  if (categoryIds.length > 0) params.set('category', categoryIds.join(','));
  if (brandIds.length > 0) params.set('brand', brandIds.join(','));

  selectedFilters
    .filter(f => f.name !== 'Категории' && f.name !== 'Бренды')
    .forEach(f => {
      const valueIds = f.values.map(v => v.id).join(',');
      if (valueIds) {
        params.set(`spec_${f.id}`, valueIds);
      }
    });

  return '?'+params.toString()+'&limit=100';
} 


export const convertUrlToFilterData = (
  url: string,
  fetchData: FacetResponse & { categorys?: BrandElement[] }
): SelectFilteredType[] => {
  const selectedFilters: SelectFilteredType[] = [];
  const urlObj = new URL(url, 'https://example.com');
  const urlParams = urlObj.searchParams;

  // Категории (key: category)
  const categoryIds = urlParams.getAll('category');
  const categories = fetchData.category ?? fetchData.categorys;
  if (categories) {
    const values = categories
      .filter(item => categoryIds.includes(String(item.id)))
      .map(item => ({ id: item.id, value: item.name, count: item.count }));

    if (values.length) {
      selectedFilters.push({
        id: CATEGORY_FILTER_TYPE_ID,
        name: 'Категории',
        values,
      });
    }
  }

  // Бренды (key: brand)
  const brandIds = urlParams.getAll('brand');
  if (fetchData.brands) {
    const values = fetchData.brands
      .filter(item => brandIds.includes(String(item.id)))
      .map(item => ({ id: item.id, value: item.name, count: item.count }));

    if (values.length) {
      selectedFilters.push({
        id: BRAND_FILTER_TYPE_ID,
        name: 'Бренды',
        values,
      });
    }
  }

  // Спецификации (keys like spec_3=30)
  if (fetchData.specifications) {
    const specMap = new Map<number, number[]>();

    for (const key of urlParams.keys()) {
      const values = urlParams.getAll(key);
      const match = key.match(/^spec_(\d+)$/);
      if (match) {
        const specId = Number(match[1]);
        for (const value of values) {
          const valId = Number(value);
          if (!specMap.has(specId)) specMap.set(specId, []);
          specMap.get(specId)!.push(valId);
        }
      }
    }

    specMap.forEach((valIds, specId) => {
      const spec = fetchData.specifications!.find(s => s.id === specId);
      if (!spec) return;
      const values = spec.values
        .filter(v => valIds.includes(v.id))
        .map(v => ({ id: v.id, value: v.value, count: v.count }));

      if (values.length) {
        selectedFilters.push({
          id: spec.id,
          name: spec.name,
          values,
        });
      }
    });
  }

  return selectedFilters;
};

interface UseGetNewFilterDataProps {
  selectedFilters: SelectFilteredType[];
}

interface UseGetNewFilterDataResult {
  isLoading: boolean;
  filterData: FacetResponse;
}

const useGetNewFilterData = ({
  selectedFilters,
}: UseGetNewFilterDataProps): UseGetNewFilterDataResult => {
  const cityEn = useGetCityParams();
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState<FacetResponse>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = buildUrl(selectedFilters,cityEn);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        const data: FacetResponse = await res.json();
        setFilterData(data);
      } catch (error) {
        console.error('Ошибка при получении фильтров:', error);
        setFilterData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters]);

  return { isLoading, filterData };
};

export default useGetNewFilterData;
