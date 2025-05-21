import { TOrder } from "@/shared/types/orderHistory";
import { Flex, Typography } from "antd";
import { useLocale } from "next-intl";
import RowInList from "./RowInList";
const { Title } = Typography;
const RenderListOrder: React.FC<{
  sortedMonthGroups: [string, TOrder[]][];
  setSelectedOrder: (order: TOrder | null) => void;
}> = ({ sortedMonthGroups, setSelectedOrder }) => {
  const locale = useLocale();
  return (
    <Flex vertical>
      {sortedMonthGroups.map(([key, orders]) => {
        const [year, month] = key.split('-').map(Number);
        const monthName = new Intl.DateTimeFormat(locale, {
          month: 'long',
        }).format(new Date(year, month));
        return (
          <Flex
            key={key}
            vertical
            style={{ padding: '10px', backgroundColor: '#fff' }}
          >
            <Title level={4}>
              {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
            </Title>
            {orders.map((order) => (
              <RowInList
                key={order.id}
                order={order}
                setSelectedOrder={setSelectedOrder}
              />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
};
export default RenderListOrder