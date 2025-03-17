"use client";

import { Breadcrumb, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { CreateOrder } from "@/features/create-order";
import useGetBasketProductsSWR from "@/entities/Basket/model/getBasketProductsSWR";
import { BasketDetail } from "@/widgets/BasketDesktop/ui/SubModule";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useReadLocalStorage } from "@undefined/usehooks-ts";

const { Title } = Typography

const OrderDesktop: React.FC<{ basket_id: string }> = ({ basket_id }) => {
    const uuid = useReadLocalStorage<string>('uuid_id', {
        initializeWithValue: false,
    });
    const { data: dataBasket, error } = useGetBasketProductsSWR();
    const city = useGetCityParams();
    const t = useTranslations("OrderMobile");

    const Empty = () => {
        return (
            <Flex justify="center" align="center" vertical={true} style={{ minHeight: "500px", width: "100%" }}>
                <Flex justify="space-around" align="center" vertical={true} style={{ width: "350px", minHeight: "350px", background: "#ffff", borderRadius: "10px" }}>
                    <Typography.Title level={2}>{t("korzina-pusta")}</Typography.Title>
                    <Image src="/cart.svg" alt="cart" width={100} height={100} style={{ filter: "invert(1)" }} />
                    <Link href={`/city/${city}/main`} prefetch={true}>{t("glavnuyu")}</Link>
                </Flex>
            </Flex>
        );
    };




    if (!dataBasket) {
        return <Empty />
    }

    if (error) {
        return <Empty />;
    }


    return <Flex justify="center" gap={10} vertical  style={{ width: "100%" }}>
        <Breadcrumb style={{ width: "100%" }} items={[
            { title: <Link href={`/city/${city}/main`} prefetch={true}>{t("glavnuyu")}</Link> },
            { title: <Link href={`/city/${city}/basket/${uuid}`} prefetch={true}>{t("korzina")}</Link> },
            { title: t("order") }
        ]} />
        <Flex gap={10} style={{ width: "100%" }}>
            <Flex vertical style={{ width: "60%" }}>
                <Title level={4}>{t("order")}</Title>
                <CreateOrder basket_id={basket_id} />
            </Flex>
            <Flex vertical style={{ width: "35%" }}>
                <BasketDetail Products={dataBasket} ToOrder={<></>} />
            </Flex>
        </Flex>
    </Flex>
};


export default OrderDesktop;