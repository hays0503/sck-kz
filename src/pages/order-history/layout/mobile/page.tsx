"use server"

import { UrlApiV1, UrlApiWithDomainV1, UrlRevalidateV1 } from "@/shared/constant/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { OrderHistoryMobile } from "@/widgets/OrderHistoryMobile";
import { getTranslations } from "next-intl/server";

interface OrderPageProps {
    readonly params: {
        locale: string;
        city: string;
        refreshToken: string;
    }
}
  

const OrderHistoryPage = async ({ params }: OrderPageProps) => {

    const t = await getTranslations("OrderHistoryPage")

    let fallback = {};

    try{
        const fetchCity = await (
            await fetch(UrlApiWithDomainV1.getCity, {
                ...UrlRevalidateV1.getCity,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
        ).json();
        fallback = { [UrlApiV1.getCity]: fetchCity };
    }catch(e) {
        console.log("Не вышло запросить города")
        console.log(e)
        return "Не вышло запросить города"
    }


    let fetchAccessToken = undefined;
    try{
        fetchAccessToken = await (
            await fetch(`http://sck.kz:8999/auth_api/v1/token/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    token: (await params).refreshToken,
                }),
            })
        );
        if(fetchAccessToken.status !== 201) {
            return JSON.stringify(fetchAccessToken.text)
        }
        fetchAccessToken = await fetchAccessToken.json();
    }
    catch(e) {
        console.log("Не вышло запросить токен")
        console.log(e)
        return "Не вышло запросить токен"
    }
    
    let Orders = [];
    try{
        const getHistory = await fetch('http://sck.kz:8777/basket_api/v1/order/by_access_t/', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'access-token': fetchAccessToken.token,
                }});
        if(getHistory.status !== 200) {
            return JSON.stringify(getHistory.text)
        }
        Orders = await getHistory.json();

    }catch(e) {
        console.log("Не вышло запросить историю заказов")
        console.log(e)
        return "Не вышло запросить историю заказов"
    }  

    return (
        <ProvidersServer>
            <ProvidersClient fallback={fallback}>
                <LayoutMain
                    headerContent={<HeaderText text={t('istoriya-zakazov')} />}
                    content={<OrderHistoryMobile Orders={Orders} />}
                    footerContent={<FooterMobile defaultKey="4" />}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}

export default OrderHistoryPage