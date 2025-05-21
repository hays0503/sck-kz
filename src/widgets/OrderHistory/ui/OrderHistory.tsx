'use client';

import { TOrder } from '@/shared/types/orderHistory';
import { useReadLocalStorage } from 'usehooks-ts';
import { Alert, Flex, Spin } from 'antd';
import { memo, startTransition, useEffect, useState } from 'react';
import GetOrders from '../model/GetOrders';
import WrapperOrderHistoryDesktop from './SubComponent/WrapperOrderHistoryDesktop';

interface IOrderHistoryProps {
  readonly isMobileDevice: boolean;
}

const OrderHistory: React.FC<IOrderHistoryProps> = ({ isMobileDevice }) => {
  console.count('render OrderHistory');
  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>(
    'refreshToken',
    {
      initializeWithValue: false,
    },
  );

  const [Orders, setOrders] = useState<TOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      if (RefreshToken?.token) {
        GetOrders(RefreshToken.token, setOrders, setError);
      }
    });
  }, [RefreshToken]);


  return (
    <Flex vertical>
      {!RefreshToken && <Spin size='large' fullscreen />}
      {error && <Alert type='error' message={error} showIcon />}
      <WrapperOrderHistoryDesktop
        orders={Orders}
        isMobileDevice={isMobileDevice}
      />
    </Flex>
  );
};

export default memo(OrderHistory);
