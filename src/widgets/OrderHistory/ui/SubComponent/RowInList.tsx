import beautifulCost from "@/shared/tools/beautifulCost";
import { TOrder } from "@/shared/types/orderHistory";
import { Flex, Typography } from "antd";
import { useLocale } from "next-intl";
import { memo, useMemo } from "react";
import { useTranslations } from "use-intl";

const { Text, Title } = Typography;
const RowInList: React.FC<{
  order: TOrder;
  setSelectedOrder: (order: TOrder | null) => void;
}> = ({ order, setSelectedOrder }) => {
  const t = useTranslations('OrderHistoryMobile');
  const locale = useLocale();
  const statusColors: Record<string, string> = useMemo(
    () => ({
      NEW: 'green',
      INWORK: 'blue',
      COMPLITED: 'green',
      CANCELED: 'red',
    }),
    [],
  );

  const statusLabels: Record<string, string> = useMemo(
    () => ({
      NEW: t('novyi'),
      INWORK: t('v-rabote'),
      COMPLITED: t('vypolnen'),
      CANCELED: t('otmenen'),
    }),
    [t],
  );

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
      <Flex justify='space-between'>
        <Title level={5}>{`${t('zakaz')} №${order.id}`}</Title>
        <Text type='secondary'>{created_date}</Text>
      </Flex>
      <Flex justify='space-between'>
        <Text
          strong
          style={{ color: statusColors[order.order_status] || 'red' }}
        >
          {statusLabels[order.order_status] || t('neizvestno')}
        </Text>
        <Text strong>{beautifulCost(order.total_amount)}</Text>
      </Flex>
    </Flex>
  );
};

export default memo(RowInList);