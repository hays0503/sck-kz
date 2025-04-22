'use client';
import useSWR, { SWRResponse } from 'swr';
import defaultFetcher from '@/shared/tools/defaultFetcher';
import { getProductResult } from '../api/getProductPopulates';

type OrderType = 'avg_rating' | '-avg_rating' | 'stocks__price' | '-stocks__price' | 'none_sort';

interface Props {
  ids: number[];
  city: string;
  orderBy: OrderType;
  page: number;
}

const useGetProductByIdsSWR = ({
  ids,
  city,
  orderBy,
  page,
}: Props): SWRResponse<getProductResult> => {
  const isEmpty = ids.length === 0;

  const url = isEmpty
    ? null
    : `/api-mapping/product/by_ids/?ids=${ids.join(',')}&order=${orderBy}&city=${city}&page=${page}`;

  return useSWR(
    url,
    (url) =>
      defaultFetcher(url, {
        method: 'GET',
        next: { revalidate: 0 },
      }),
  );
};

export default useGetProductByIdsSWR;
