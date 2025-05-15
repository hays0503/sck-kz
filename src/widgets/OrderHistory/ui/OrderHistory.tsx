'use client';

import useGetBasketProductsSWR from '@/entities/Basket/model/getBasketProductsSWR';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import beautifulCost from '@/shared/tools/beautifulCost';
import { TOrder } from '@/shared/types/orderHistory';
import { useReadLocalStorage } from 'usehooks-ts';
import {
  Alert,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Spin,
  Steps,
  Typography,
} from 'antd';
import { MappedBasketItemType } from 'api-mapping/basket/v2/get-products/type/MappedBasketType';
import { useLocale, useTranslations } from 'next-intl';
import {
  Dispatch,
  memo,
  useLayoutEffect,
  useState,
} from 'react';

const { Text, Title } = Typography;

interface IOrderHistoryProps {
  readonly isMobileDevice: boolean;
}

const GetOrders = async (
  refreshToken: string,
  setOrders: Dispatch<TOrder[]>,
  setError: Dispatch<string | null>
) => {
  try {
    const fetchAccessToken = await fetch(`/auth_api/v2/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (fetchAccessToken.status !== 201) {
      const errText = await fetchAccessToken.text();
      throw new Error(errText);
    }

    const tokenResponse = await fetchAccessToken.json();

    const getHistory = await fetch('/basket_api/v2/order/by_access_t/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-token': tokenResponse?.access?.token,
      },
    });

    if (getHistory.status !== 200) {
      const errText = await getHistory.text();
      throw new Error(errText);
    }

    setOrders(await getHistory.json());
  } catch (err: unknown) {
    console.error(err);
    setError((err as Error).message);
  }
};

const OrderHistory: React.FC<IOrderHistoryProps> = ({ isMobileDevice }) => {
  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>('refreshToken', {
    initializeWithValue: false,
  });

  const [Orders, setOrders] = useState<TOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (RefreshToken?.token) {
      GetOrders(RefreshToken.token, setOrders, setError);
    }
  }, [RefreshToken]);

  if (!RefreshToken) return <Spin size="large" fullscreen />;
  if (error) return <Alert type="error" message="Ошибка загрузки заказов" description={error} showIcon />;

  return <WrapperOrderHistoryDesktop Orders={Orders} isMobileDevice={isMobileDevice} />;
};

const RenderListProduct = memo(
  ({ items, locale, cityEn }: { items: MappedBasketItemType[]; locale: string; cityEn: string }) => (
    <>
      {items.map((item, index) => (
        <Flex key={`${item.prod.name[locale]}-${index}`} vertical>
          {index !== 0 && <Divider />}
          <Link href={`/city/${cityEn}/product/${item.prod.slug}`}>
            <Flex gap={10}>
              <Image
                preview={false}
                src={item.prod.img[0]}
                alt={item.prod?.name?.[locale]??item?.prod?.name?.['ru']??''}
                width={50}
                height={50}
                style={{ objectFit: 'scale-down' }}
              />
              <Flex justify="space-between" vertical>
                <Text>{item.prod.name[locale]}</Text>
                <Text strong>{beautifulCost(item.prod.price)}</Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      ))}
    </>
  )
);
RenderListProduct.displayName = 'RenderListProduct';

const WrapperBasketDesktop: React.FC<{ uuid: string }> = ({ uuid }) => {
  const { data: fetchBasket, error, isLoading } = useGetBasketProductsSWR(uuid);
  const locale = useLocale();
  const cityEn = useGetCityParams();
  const t = useTranslations('WrapperBasketDesktop');

  if (error) return <Alert type="error" message={t('error')} showIcon />;
  if (!fetchBasket || isLoading) return <Spin fullscreen />;

  const items = fetchBasket.items;
  const allPrice = items.reduce((acc, item) => acc + (item.prod.price ?? 0) * item.count, 0);

  return (
    <Flex vertical gap={5}>
      <Divider />
      <Title level={5}>{t('tovary')}</Title>
      <RenderListProduct items={items} locale={locale} cityEn={cityEn} />
      <Divider />
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <Text style={{ fontSize: '20px' }}>{t('summa-k-oplate')}</Text>
        <Text style={{ fontSize: '14px' }}>{beautifulCost(allPrice)}</Text>
      </Flex>
    </Flex>
  );
};

const WrapperOrderHistoryDesktop: React.FC<{
  Orders: TOrder[];
  isMobileDevice?: boolean;
}> = ({ Orders, isMobileDevice }) => {
  const t = useTranslations('OrderHistoryMobile');
  const locale = useLocale();
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const RowInList: React.FC<{ order: TOrder }> = ({ order }) => {
    const statusColors: Record<string, string> = {
      NEW: 'green',
      INWORK: 'blue',
      COMPLITED: 'green',
      CANCELED: 'red',
    };

    const statusLabels: Record<string, string> = {
      NEW: t('novyi'),
      INWORK: t('v-rabote'),
      COMPLITED: t('vypolnen'),
      CANCELED: t('otmenen'),
    };

    const created_date = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    }).format(new Date(order.created_at));

    return (
      <Flex
        vertical
        style={{
          padding: 10,
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
          backgroundColor: '#fff',
        }}
        onClick={() => setSelectedOrder(order)}
      >
        <Flex justify="space-between">
          <Title level={5}>{`${t('zakaz')} №${order.id}`}</Title>
          <Text type="secondary">{created_date}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text strong style={{ color: statusColors[order.order_status] || 'red' }}>
            {statusLabels[order.order_status] || t('neizvestno')}
          </Text>
          <Text strong>{beautifulCost(order.total_amount)}</Text>
        </Flex>
      </Flex>
    );
  };

  const groupOrdersByMonth = (orders: TOrder[]) => {
    return orders.reduce((acc, order) => {
      const date = new Date(order.created_at);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      acc[key] = [...(acc[key] || []), order];
      return acc;
    }, {} as Record<string, TOrder[]>);
  };

  const sortedMonthGroups = Object.entries(groupOrdersByMonth(
    Orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  )).sort(([a], [b]) => b.localeCompare(a));

  const RenderListOrder = () => (
    <Flex vertical>
      {sortedMonthGroups.map(([key, orders]) => {
        const [year, month] = key.split('-').map(Number);
        const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(year, month));
        return (
          <Flex key={key} vertical style={{ padding: '10px', backgroundColor: '#fff' }}>
            <Title level={4}>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</Title>
            {orders.map((order) => (
              <RowInList key={order.id} order={order} />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );

  const RenderOrderDetail = () => (
    <Card>
      <Flex vertical gap={10}>
        <Button onClick={() => setSelectedOrder(null)}>{t('nazad')}</Button>
        <Title level={2}>{`${t('zakaz')} №${selectedOrder?.id}`}</Title>
        <Text type="secondary">{`${t('sozdan')}: ${new Date(selectedOrder?.created_at ?? '').toLocaleString()}`}</Text>
        <Flex vertical={isMobileDevice} gap={20}>
          <Flex vertical style={{ width: isMobileDevice ? '100%' : '60%' }} gap={20}>
            <Title level={3}>{t('detali-zakaza')}</Title>
            <Title level={5}>{t('dostavka')}</Title>
            <Flex justify="space-between">
              <Text type="secondary">{t('data-i-vremya')}</Text>
              <Text>{new Date(selectedOrder?.created_at ?? '').toLocaleString()}</Text>
            </Flex>
            {selectedOrder?.user_full_name && (
              <Flex justify="space-between">
                <Text type="secondary">{t('imya')}</Text>
                <Text>
                  {selectedOrder.user_full_name
                    ?.match(/\[([^\]]+)\]/g)
                    ?.map((s) => s.slice(1, -1))
                    ?.filter((s) => s.toLowerCase() !== 'undefined')
                    ?.join(' ') || '—'}
                </Text>
              </Flex>
            )}
            <Flex justify="space-between">
              <Text type="secondary">{t('telefon')}</Text>
              <Text>{selectedOrder?.phone_number}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text type="secondary">Email</Text>
              <Text>{selectedOrder?.email}</Text>
            </Flex>
            <Title level={5}>{t('oplata')}</Title>
            <Flex justify="space-between">
              <Text type="secondary">{t('sposob-oplaty')}</Text>
              <Text>
                {selectedOrder?.payment_type === 'ONLINE'
                  ? t('oplata-onlai-n')
                  : t('oplata-pri-poluchenii')}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text type="secondary">Статус</Text>
              <Text>
                {selectedOrder?.payment_status === 'UNPAID'
                  ? t('ne-oplachen')
                  : t('oplachen')}
              </Text>
            </Flex>
            {selectedOrder?.uuid_id && <WrapperBasketDesktop uuid={selectedOrder.uuid_id} />}
          </Flex>
          <Flex
            vertical
            style={{
              width: isMobileDevice ? '100%' : '40%',
              border: '1px solid #f0f0f0',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Title level={4}>{t('status-zakaza')}</Title>
            <Steps
              direction="vertical"
              size="small"
              current={
                selectedOrder?.order_status === 'NEW'
                  ? 0
                  : selectedOrder?.order_status === 'INWORK'
                  ? 1
                  : 2
              }
              items={[
                { title: t('novyi-zakaz') },
                { title: t('v-rabote') },
                { title: t('zavershen') },
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );

  return selectedOrder ? <RenderOrderDetail /> : <RenderListOrder />;
};

export default OrderHistory;
