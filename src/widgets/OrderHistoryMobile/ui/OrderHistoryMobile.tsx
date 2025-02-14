"use client";

import beautifulCost from "@/shared/tools/beautifulCost";
import { TOrder } from "@/shared/types/orderHistory";
import { Divider, Flex, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { CSSProperties } from "react";

interface IOrderHistoryMobileProps {
    readonly Orders: TOrder[];
}

const { Text, Title } = Typography;

const OrderHistoryMobile: React.FC<IOrderHistoryMobileProps> = ({ Orders }) => {
    const t = useTranslations("OrderHistoryMobile");
    const locale = useLocale();

    const RowInList: React.FC<{ order: TOrder }> = ({ order }) => {
        const styleData: CSSProperties = {
            color: "#808185",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "22px",
            letterSpacing: "-0.084px",
        };

        let status = "";
        let color = "red";

        switch (order.order_status) {
            case "NEW":
                status = t("novyi");
                color = "green";
                break;
            case "INWORK":
                status = t("v-rabote");
                color = "blue";
                break;
            case "COMPLITED":
                status = t("vypolnen");
                color = "green";
                break;
            case "CANCELED":
                status = t("otmenen");
                color = "red";
                break;
            default:
                status = t("neizvestno");
                color = "red";
                break;
        }
        const created_date = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
        }).format(new Date(order.created_at));

        return (
            <Flex
                style={{ width: "100%", backgroundColor: "#ffff", padding: "10px", borderBottom: "1px solid #f0f0f0" }}
                vertical={true}
            >
                <Flex style={{ width: "100%" }} justify="space-between">
                    <Title level={5}>{`${t("zakaz")} №${order.id}`}</Title>
                    <Text style={styleData}>{created_date}</Text>
                </Flex>
                <Flex style={{ width: "100%" }} justify="space-between">
                    <Text strong style={{ color: color }}>
                        {status}
                    </Text>
                    <Text strong>{beautifulCost(order.total_amount)}</Text>
                </Flex>
            </Flex>
        );
    };

    const SortedOrders = Orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
            const [yearA, monthA] = a.split("-").map(Number);
            const [yearB, monthB] = b.split("-").map(Number);
            return yearB - yearA || monthB - monthA;
        })
        .reduce((acc, key) => {
            const [year, month] = key.split("-").map(Number);
            const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(year, month));
            acc[monthName] = SortedByMonth[key];
            return acc;
        }, {} as { [key: string]: TOrder[] });

    return (
        <Flex vertical style={{ width: "100%" }}>
            {Object.entries(SortedByMonthArray).map(([month, orders]) => (
                <Flex key={month} vertical style={{ backgroundColor: "#fff", padding: "10px" }}>
                    <Title level={4}>
                        {String(month).charAt(0).toUpperCase() + String(month).slice(1)}
                    </Title>
                    {orders.map((order) => (
                        <Flex key={order.id} vertical style={{ padding: "10px" }}>
                            <Divider />
                            <RowInList order={order} />
                        </Flex>
                    ))}
                </Flex>
            ))}
        </Flex>
    );
};

export default OrderHistoryMobile;
