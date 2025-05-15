'use client';

import useGetBasketProductsSWR from '@/entities/Basket/model/getBasketProductsSWR';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import beautifulCost from '@/shared/tools/beautifulCost';
import { TOrder } from '@/shared/types/orderHistory';
import { useReadLocalStorage } from 'usehooks-ts';
import {
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
  CSSProperties,
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
) => {
  let tokenResponse = undefined;
  try {
    const fetchAccessToken = await fetch(`/auth_api/v2/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
    if (fetchAccessToken.status !== 201) {
      return JSON.stringify(await fetchAccessToken.text());
    }

    tokenResponse = await fetchAccessToken.json();
  } catch (e) {
    console.log('Не вышло запросить токен');
    console.log(e);
    return 'Не вышло запросить токен';
  }

  try {
    const getHistory = await fetch('/basket_api/v2/order/by_access_t/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-token': `${tokenResponse?.access?.token}`,
      },
    });
    if (getHistory.status !== 200) {
      return JSON.stringify(await getHistory.text());
    }
    setOrders(await getHistory.json());
  } catch (e) {
    console.log('Не вышло запросить историю заказов');
    console.log(e);
    return 'Не вышло запросить историю заказов';
  }
};

const OrderHistory: React.FC<IOrderHistoryProps> = ({ isMobileDevice }) => {
  const RefreshToken = useReadLocalStorage<{ token: string | undefined }>(
    'refreshToken',
    {
      initializeWithValue: false,
    },
  );
  const [Orders, setOrders] = useState<TOrder[]>([] as TOrder[]);

  useLayoutEffect(() => {
    if (RefreshToken && RefreshToken?.token) {
      GetOrders(RefreshToken.token, setOrders);
    }
  }, [RefreshToken]);

  if (!RefreshToken) {
    return <Spin size='large' fullscreen />;
  }

  return (
    <WrapperOrderHistoryDesktop
      Orders={Orders}
      isMobileDevice={isMobileDevice}
    />
  );
};

const RenderListProduct = memo(
  ({
    items,
    locale,
    cityEn,
  }: {
    items: MappedBasketItemType[];
    locale: string;
    cityEn: string;
  }) => {
    return items.map((item: MappedBasketItemType, index) => {
      return (
        <Flex key={`${item.prod.name[locale]}-${index}`} vertical>
          {index !== 0 && <Divider />}
          <Link href={`/city/${cityEn}/product/${item.prod.slug}`}>
            <Flex gap={10}>
              <Image
                preview={false}
                src={item.prod.img[0]}
                alt={`${item.prod.name[locale]}-${index}`}
                width={50}
                height={50}
                style={{ objectFit: 'scale-down' }}
              />
              <Flex justify='space-between' vertical>
                <Text>{item.prod.name[locale]}</Text>
                <Text strong>{beautifulCost(item.prod.price)}</Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      );
    });
  },
);
RenderListProduct.displayName = 'RenderListProduct';

const WrapperBasketDesktop: React.FC<{ uuid: string }> = ({ uuid }) => {
  const { data: fetchBasket, error, isLoading } = useGetBasketProductsSWR(uuid);
  const locale = useLocale();
  const cityEn = useGetCityParams();
  const t = useTranslations('WrapperBasketDesktop');
  if (error) {
    return <Text>t('error')</Text>;
  }

  if (!fetchBasket || isLoading) {
    return <Spin fullscreen />;
  }

  const items = fetchBasket.items;

  const allPrice = items.reduce((acc, item) => {
    const price = item.prod.price;
    return acc + (price ?? 0) * item.count;
  }, 0);

  return (
    <Flex vertical gap={5}>
      <Divider />
      <Title level={5}>{t('tovary')}</Title>
      <RenderListProduct items={items} locale={locale} cityEn={cityEn} />
      <Divider />
      <Flex justify='space-between' align='center' style={{ width: '100%' }}>
        <Text
          style={{
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '22px',
            letterSpacing: '-0.084px',
          }}
        >
          {t('summa-k-oplate')}
        </Text>
        <Text
          style={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            letterSpacing: '-0.084px',
          }}
        >
          {beautifulCost(allPrice)}
        </Text>
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
    const styleData: CSSProperties = {
      color: '#808185',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
      letterSpacing: '-0.084px',
    };

    let status = '';
    let color = 'red';

    switch (order.order_status) {
      case 'NEW':
        status = t('novyi');
        color = 'green';
        break;
      case 'INWORK':
        status = t('v-rabote');
        color = 'blue';
        break;
      case 'COMPLITED':
        status = t('vypolnen');
        color = 'green';
        break;
      case 'CANCELED':
        status = t('otmenen');
        color = 'red';
        break;
      default:
        status = t('neizvestno');
        color = 'red';
        break;
    }
    const created_date = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    }).format(new Date(order.created_at));

    return (
      <Flex
        style={{
          width: '100%',
          backgroundColor: '#ffff',
          padding: '10px',
          borderBottom: '1px solid #f0f0f0',
          cursor: 'pointer',
        }}
        vertical={true}
        onClick={() => setSelectedOrder(order)}
      >
        <Flex style={{ width: '100%' }} justify='space-between'>
          <Title level={5}>{`${t('zakaz')} №${order.id}`}</Title>
          <Text style={styleData}>{created_date}</Text>
        </Flex>
        <Flex style={{ width: '100%' }} justify='space-between'>
          <Text strong style={{ color: color }}>
            {status}
          </Text>
          <Text strong>{beautifulCost(order.total_amount)}</Text>
        </Flex>
      </Flex>
    );
  };

  const SortedOrders = Orders.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const SortedByMonth: {
    [key: string]: TOrder[];
  } = {};

  SortedOrders.forEach((item: TOrder) => {
    const date = new Date(item.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`; // Уникальный ключ: "год-месяц"
    if (monthKey in SortedByMonth) {
      SortedByMonth[monthKey].push(item);
    } else {
      SortedByMonth[monthKey] = [item];
    }
  });

  // Сортируем месяца в порядке от новых к старым
  const SortedByMonthArray = Object.keys(SortedByMonth)
    .sort((a, b) => {
      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);
      return yearB - yearA || monthB - monthA;
    })
    .reduce(
      (acc, key) => {
        const [year, month] = key.split('-').map(Number);
        const monthName = new Intl.DateTimeFormat(locale, {
          month: 'long',
        }).format(new Date(year, month));
        acc[monthName] = SortedByMonth[key];
        return acc;
      },
      {} as { [key: string]: TOrder[] },
    );

  const RenderListOrder = () => (
    <Flex vertical style={{ width: '100%' }}>
      {Object.entries(SortedByMonthArray).map(([month, orders]) => (
        <Flex
          key={month}
          vertical
          style={{ backgroundColor: '#fff', padding: '10px' }}
        >
          <Title level={4}>
            {String(month).charAt(0).toUpperCase() + String(month).slice(1)}
          </Title>
          {orders.map((order) => (
            <Flex key={order.id} vertical style={{ padding: '10px' }}>
              <Divider />
              <RowInList order={order} />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  );

  const RenderOrderDetail = () => (
    <Card style={{ width: '100%' }}>
      <Flex vertical gap={5} style={{ width: '100%' }}>
        <Button
          onClick={() => setSelectedOrder(null)}
          style={{ marginBottom: 16 }}
        >
          {t('nazad')}
        </Button>
        <Flex vertical align='start' style={{ width: '100%' }}>
          <Title level={2}>{`${t('zakaz')} №${selectedOrder?.id}`}</Title>
          <Text
            disabled
            style={{
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '22px',
              letterSpacing: '-0.6px',
            }}
          >
            {`${t('sozdan')}: ${new Date(selectedOrder?.created_at ?? '').toLocaleString()}`}
          </Text>
        </Flex>
        <Flex style={{ width: '100%' }} gap={20} vertical={isMobileDevice}>
          <Flex
            vertical
            style={{ width: `${isMobileDevice ? '100%' : '60%'}` }}
            gap={20}
          >
            <Flex
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #f0f0f0',
              }}
            >
              <Flex
                vertical
                style={{ width: '100%', padding: '20px' }}
                gap={10}
              >
                <Title level={3}>{t('detali-zakaza')}</Title>
                <Title level={5}>{t('dostavka')}</Title>
                <Flex justify='space-between' style={{ width: '100%' }}>
                  <Text disabled>{t('data-i-vremya')}</Text>
                  <Text>
                    {new Date(selectedOrder?.created_at ?? '').toLocaleString()}
                  </Text>
                </Flex>
                <Title level={5}>{t('pokupatel')}</Title>
                {selectedOrder?.user_full_name ? (
                  <Flex justify='space-between' style={{ width: '100%' }}>
                    <Text disabled>{t('imya')}</Text>
                    <Text>
                      {selectedOrder.user_full_name
                        ?.match(/\[([^\]]+)\]/g) // Найти строки в скобках
                        ?.map((s) => s.slice(1, -1)) // Удалить скобки
                        ?.filter((s) => s.toLowerCase() !== 'undefined') // Удалить "undefined"
                        ?.join(' ') || '—'}
                    </Text>
                  </Flex>
                ) : null}
                <Flex justify='space-between' style={{ width: '100%' }}>
                  <Text disabled>{t('telefon')}</Text>
                  <Text>{selectedOrder?.phone_number}</Text>
                </Flex>
                <Flex justify='space-between' style={{ width: '100%' }}>
                  <Text disabled>Email</Text>
                  <Text>{`${selectedOrder?.email}`}</Text>
                </Flex>
                <Title level={5}>{t('oplata')}</Title>
                <Flex justify='space-between' style={{ width: '100%' }}>
                  <Text disabled>{t('sposob-oplaty')}</Text>
                  <Text>
                    {selectedOrder?.payment_type === 'ONLINE'
                      ? t('oplata-onlai-n')
                      : t('oplata-pri-poluchenii')}
                  </Text>
                </Flex>
                <Flex justify='space-between' style={{ width: '100%' }}>
                  <Text disabled>Статус</Text>
                  <Text>
                    {selectedOrder?.payment_status === 'UNPAID'
                      ? t('ne-oplachen')
                      : t('oplachen')}
                  </Text>
                </Flex>

                {selectedOrder?.uuid_id && (
                  <WrapperBasketDesktop uuid={selectedOrder?.uuid_id} />
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            vertical
            style={{
              width: `${isMobileDevice ? '100%' : '40%'}`,
              height: 'min-content',
              borderRadius: '10px',
              border: '1px solid #f0f0f0',
              padding: '20px',
            }}
          >
            <Title level={4}>{t('status-zakaza')}</Title>
            <Steps
              initial={0}
              direction='vertical'
              size='small'
              current={
                selectedOrder?.order_status === 'NEW'
                  ? 0
                  : selectedOrder?.order_status === 'INWORK'
                    ? 1
                    : 2
              }
              items={[
                {
                  title: t('novyi-zakaz'),
                },
                {
                  title: t('v-rabote'),
                },
                {
                  title: t('zavershen'),
                },
              ]}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );

  if (selectedOrder) return <RenderOrderDetail />;

  return <RenderListOrder />;
};

export default OrderHistory;
