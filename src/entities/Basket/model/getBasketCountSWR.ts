import defaultFetcher from '@/shared/tools/defaultFetcher';
import { MappedCountType } from 'api-mapping/basket/v2/count/type/MappedCountType';
import useSWR, { SWRResponse } from 'swr';

const useGetBasketCountSWR = (
  uuid: string | null | undefined,
): SWRResponse<{ results: MappedCountType }> => {
  const shouldFetch = Boolean(uuid); // Проверяем, нужен ли запрос
  const url = shouldFetch ? `/api-mapping/basket/v2/count/?uuid=${uuid}` : null;
  const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => null));
  return object;
};

export default useGetBasketCountSWR;
