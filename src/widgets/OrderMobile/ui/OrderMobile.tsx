"use client";

import { Flex, Typography } from "antd";
import { Total } from "./SubModule";
import { useTranslations } from "next-intl";
import beautifulCost from "@/shared/tools/beautifulCost";
import { CreateOrder } from "@/features/create-order";
import useGetBasketProductsSWR from "@/entities/Basket/model/getBasketProductsSWR";
import { MappedBasketType } from "api-mapping/basket/v2/get-products/type/MappedBasketType";

const { Title } = Typography

const OrderMobile: React.FC<{ basket_id: string }> = ({ basket_id }) => {

    const { data: dataBasket, isLoading, error } = useGetBasketProductsSWR();


    const t = useTranslations("OrderMobile");

    const LoadingTotal: React.FC<{ dataBasket: MappedBasketType | undefined, isLoading: boolean, error: boolean }> = ({ dataBasket, isLoading, error }) => {

        if (isLoading) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("loading")}</Title>
            </Flex>
        }
        if (error) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("error")}</Title>
            </Flex>
        }
        const total = dataBasket?.items?.reduce((acc, item) => acc + item.count, 0);

        const totalPrice = dataBasket?.items?.reduce((acc, item) => {
            const { price } = item.prod;
            return acc + (price ?? 0) * item.count;
        }, 0);

        return <Total total={total ?? 0} totalPrice={beautifulCost(totalPrice ?? 0) ?? ""} />
    }


    return <Flex justify="center" align="center" >

        <Flex vertical style={{ width: "95%" }}>
            <LoadingTotal dataBasket={dataBasket} isLoading={isLoading} error={error} />
            <CreateOrder basket_id={basket_id} />
        </Flex>
    </Flex>
};


export default OrderMobile;