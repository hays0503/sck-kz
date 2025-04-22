import { useCallback, useEffect, useState } from 'react';

interface ILastViewedProduct {
  product_id: number;
  client_uuid: string | null;
  id: string;
  user_id: string | null;
  created_at: string;
}

const useGetLastViewedProductIds = (
  uuid: string,
  user_id?: string | null
) => {
  const [productIds, setProductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchLastViewed = useCallback(async () => {
    try {
      let url = `/auth_api/v2/viewed/by_client_uuid_or_user_id?client_uuid=${uuid}`;
      if (user_id) url += `&user_id=${user_id}`;

      const res = await fetch(url);
      const data = (await res.json()) as ILastViewedProduct[];

      const ids = data
        .reverse()
        .map((item) => item.product_id)
        .filter((id, idx, self) => self.indexOf(id) === idx)
        .slice(0, 8);

      setProductIds(ids);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [uuid, user_id]);

  useEffect(() => {
    fetchLastViewed();
  }, [fetchLastViewed]);

  return { productIds, loading, error };
};

export default useGetLastViewedProductIds
