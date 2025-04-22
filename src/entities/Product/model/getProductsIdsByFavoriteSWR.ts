import defaultFetcher from '@/shared/tools/defaultFetcher';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';

const useGetProductsIdsByFavoriteSWR = () => {
  const [uuid, setUuid] = useLocalStorage<string|null>('uuid_id', null);
  useEffect(() => {
    if (!uuid) {
      setUuid(uuidv4());
    }
  }, [setUuid, uuid]);
  const user_id = useReadLocalStorage<{ user_id: string }|null>('user_id');
  const url = Boolean(uuid && user_id?.user_id) ? `/api-mapping/featured-products/get-product/?uuid=${uuid}&user_id=${
    user_id?.user_id ?? ''
  }` : null;

  const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => []));
  return object;
};

export default useGetProductsIdsByFavoriteSWR;
