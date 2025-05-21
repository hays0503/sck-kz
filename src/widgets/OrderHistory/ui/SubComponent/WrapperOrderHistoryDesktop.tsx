import { TOrder } from '@/shared/types/orderHistory';
import React, {
  memo,
  startTransition,
  useCallback,
  useMemo,
  useState,
  unstable_ViewTransition as ViewTransition,
} from 'react';
import RenderOrderDetail from './RenderOrderDetail';
import RenderListOrder from './RenderListOrder';
import './viewTransition.css';

// Вынесем функцию группировки наружу — она статична и не зависит от внешних переменных
const groupOrdersByMonth = (orders: TOrder[]): Record<string, TOrder[]> => {
  return orders.reduce(
    (acc, order) => {
      const date = new Date(order.created_at);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(order);
      return acc;
    },
    {} as Record<string, TOrder[]>,
  );
};

interface IWrapperOrderHistoryDesktopProps {
  orders: TOrder[];
  isMobileDevice?: boolean;
}

const WrapperOrderHistoryDesktop: React.FC<
  IWrapperOrderHistoryDesktopProps
> = ({ orders, isMobileDevice }) => {
  const [selectedOrder, _setSelectedOrder] = useState<TOrder | null>(null);

  // Обёрнул в useCallback, чтобы ссылка не менялась на каждый рендер
  const setSelectedOrder = useCallback((order: TOrder | null) => {
    startTransition(() => {
      _setSelectedOrder(order);
    });
  }, []);

  console.count('render OrderHistoryDesktop');

  // Для сортировки не мутируем исходный массив, а создаём его копию через spread
  const sortedMonthGroups = useMemo(() => {
    const cloned = [...orders];
    cloned.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const grouped = groupOrdersByMonth(cloned);

    return Object.entries(grouped).sort(([keyA], [keyB]) =>
      keyB.localeCompare(keyA),
    );
  }, [orders]);


  // Если нет поддержки, просто рендерим без анимации
  const WrapperContent = (
    <>
      {selectedOrder ? (
        <RenderOrderDetail
          key={selectedOrder.id}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          isMobileDevice={isMobileDevice}
        />
      ) : (
        <RenderListOrder
          key='RenderListOrder'
          sortedMonthGroups={sortedMonthGroups}
          setSelectedOrder={setSelectedOrder}
        />
      )}
    </>
  );

  return (
    <ViewTransition
      name='WrapperOrderHistoryDesktop'
      default={'slide-in'}
      enter={'slide-in'}
      exit={'slide-out'}
    >
      {WrapperContent}
    </ViewTransition>
  );
};

export default memo(WrapperOrderHistoryDesktop);
