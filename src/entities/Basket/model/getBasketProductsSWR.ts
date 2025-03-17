import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import defaultFetcher from '@/shared/tools/defaultFetcher';
import { useReadLocalStorage } from '@undefined/usehooks-ts';
import { MappedBasketType } from 'api-mapping/basket/v1/get-products/type/MappedBasketType';
import useSWR, { SWRResponse } from 'swr';

const useGetBasketProductsSWR = (uuid?: string, doNotFetch?: boolean): SWRResponse<MappedBasketType> => {
  const cityEn = useGetCityParams();
  const defaultUuid = useReadLocalStorage<string | null>('uuid_id', {
    initializeWithValue: false,
  });
  // Проверяем, нужен ли запрос
  const url = !doNotFetch
    ? `/api-mapping/basket/v2/get-products/?uuid=${uuid ?? defaultUuid}&city=${cityEn}`
    : null;
  const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => null));
  return object;
};

export default useGetBasketProductsSWR;
