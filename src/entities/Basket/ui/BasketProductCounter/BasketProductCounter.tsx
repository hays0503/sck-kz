import { Badge } from 'antd';
import { JSX } from 'react';
import { useGetBasketCountSWR } from '../../model';
import { useReadLocalStorage } from 'usehooks-ts';

interface BasketProductCounterProps {
  readonly children: JSX.Element;
}

const BasketProductCounter: React.FC<BasketProductCounterProps> = ({
  children,
}) => {
  const uuid: string | null = useReadLocalStorage<string>('uuid_id'); // Может быть null
  const {
    data: countProductInBasket,
    isLoading,
    error,
  } = useGetBasketCountSWR(uuid);

  if (!countProductInBasket && isLoading) {
    return children;
  }

  if (error) {
    return 0;
  }

  if (!countProductInBasket) {
    return children;
  }

  return (
    <Badge count={countProductInBasket?.results?.count ?? 0} size='small'>
      {children}
    </Badge>
  );
};

export default BasketProductCounter;
