'use client';

import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { mutate } from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

interface useBasketDeleteProps {
  readonly prod_ids: number[];
}

type useBasketAddHook = () => (props: useBasketDeleteProps) => void;

const useBasketDelete: useBasketAddHook = () => {
  const uuid = useReadLocalStorage<string>('uuid_id');
  const cityEn = useGetCityParams();
  const action = async ({ prod_ids }: useBasketDeleteProps) => {
    const url = `/api-mapping/basket/v2/del-products?uuid=${uuid}&prod_ids=${prod_ids.join(',')}&city=${cityEn}`;
    const response = await fetch(url, {
      method: 'POST',
    });
    if (response.ok) {
      mutate(`/api-mapping/basket/v2/count/?uuid=${uuid}`);
      mutate(
        `/api-mapping/basket/v2/get-products/?uuid=${uuid}&city=${cityEn}`,
      );
    }
  };

  return action;
};

export default useBasketDelete;
