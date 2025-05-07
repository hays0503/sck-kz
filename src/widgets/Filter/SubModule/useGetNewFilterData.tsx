'use client';

import { useEffect, useState } from 'react';
import { FacetResponse, SelectFilteredType } from './FilterType';
import CityEnToRu from '@/shared/constant/city';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';

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
