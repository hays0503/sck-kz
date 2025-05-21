// hooks/useOrderHistory.ts
import { TOrder } from '@/shared/types/orderHistory';
import { useEffect, useState } from 'react';

export function useOrderHistory(refreshToken: string | undefined) {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!refreshToken) return;
    const controller = new AbortController();
    setIsLoading(true);

    async function fetchOrders() {
      try {
        // Шаг 1. Обновить access-токен
        const tokenRes = await fetch('/auth_api/v2/token/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: refreshToken }),
          signal: controller.signal,
        });
        if (!tokenRes.ok) {
          const errText = await tokenRes.text();
          throw new Error(errText);
        }
        const { access: { token: accessToken } } = await tokenRes.json();

        // Шаг 2. Получить сами заказы
        const historyRes = await fetch('/basket_api/v2/order/by_access_t/', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'access-token': accessToken,
          },
          signal: controller.signal,
        });
        if (!historyRes.ok) {
          const errText = await historyRes.text();
          throw new Error(errText);
        }
        const data: TOrder[] = await historyRes.json();
        setOrders(data);
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.error(e);
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();

    return () => {
      controller.abort();
    };
  }, [refreshToken]);

  return { orders, error, isLoading };
}
