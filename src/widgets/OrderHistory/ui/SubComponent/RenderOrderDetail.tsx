import { TOrder } from '@/shared/types/orderHistory';
import { Button, Flex, Steps, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import WrapperBasketDesktop from './WrapperBasketDesktop';
import { useReadLocalStorage } from 'usehooks-ts';
const { Text, Title } = Typography;
const RenderOrderDetail: React.FC<{
  selectedOrder: TOrder;
  setSelectedOrder: (order: TOrder | null) => void;
  isMobileDevice: boolean | undefined;
}> = ({ selectedOrder, setSelectedOrder, isMobileDevice }) => {
  const t = useTranslations('OrderHistoryMobile');
  const ContentHeight = useReadLocalStorage<string>('ContentHeight');
  return (
    <Flex
      vertical
      gap={10}
      style={{ padding: '10px', height: ContentHeight??0, overflowY: 'scroll' }}
    >
      <Button style={{padding: '10px'}} onClick={() => setSelectedOrder(null)}>{t('nazad')}</Button>
      <Title level={2}>{`${t('zakaz')} №${selectedOrder?.id}`}</Title>
      <Text type='secondary'>{`${t('sozdan')}: ${new Date(selectedOrder?.created_at ?? '').toLocaleString()}`}</Text>
      <Flex vertical={isMobileDevice} gap={20}>
        <Flex
          vertical
          style={{ width: isMobileDevice ? '100%' : '60%' }}
          gap={20}
        >
          <Title level={3}>{t('detali-zakaza')}</Title>
          <Title level={5}>{t('dostavka')}</Title>
          <Flex justify='space-between'>
            <Text type='secondary'>{t('data-i-vremya')}</Text>
            <Text>
              {new Date(selectedOrder?.created_at ?? '').toLocaleString()}
            </Text>
          </Flex>
          {selectedOrder?.user_full_name && (
            <Flex justify='space-between'>
              <Text type='secondary'>{t('imya')}</Text>
              <Text>
                {selectedOrder.user_full_name
                  ?.match(/\[([^\]]+)\]/g)
                  ?.map((s) => s.slice(1, -1))
                  ?.filter((s) => s.toLowerCase() !== 'undefined')
                  ?.join(' ') || '—'}
              </Text>
            </Flex>
          )}
          <Flex justify='space-between'>
            <Text type='secondary'>{t('telefon')}</Text>
            <Text>{selectedOrder?.phone_number}</Text>
          </Flex>
          <Flex justify='space-between'>
            <Text type='secondary'>Email</Text>
            <Text>{selectedOrder?.email}</Text>
          </Flex>
          <Title level={5}>{t('oplata')}</Title>
          <Flex justify='space-between'>
            <Text type='secondary'>{t('sposob-oplaty')}</Text>
            <Text>
              {selectedOrder?.payment_type === 'ONLINE'
                ? t('oplata-onlai-n')
                : t('oplata-pri-poluchenii')}
            </Text>
          </Flex>
          <Flex justify='space-between'>
            <Text type='secondary'>Статус</Text>
            <Text>
              {selectedOrder?.payment_status === 'UNPAID'
                ? t('ne-oplachen')
                : t('oplachen')}
            </Text>
          </Flex>
          {selectedOrder?.uuid_id && (
            <WrapperBasketDesktop basketUuid={selectedOrder.uuid_id} />
          )}
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
              { title: t('novyi-zakaz') },
              { title: t('v-rabote') },
              { title: t('zavershen') },
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(RenderOrderDetail);
