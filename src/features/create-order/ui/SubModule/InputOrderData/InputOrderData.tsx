"use client";
import { Collapse, CollapseProps, message, Typography } from "antd";
import { Delivered, PaymentOptions, Recipient } from "./SubModule";
import { CSSProperties, JSX, useEffect, useState } from "react";

import { IOrderCreate } from "@/shared/types/order";
import { useTranslations } from "next-intl";
import { useUser } from "@/entities/User";
import CityEnToRu from "@/shared/constant/city";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";


const { Title } = Typography

const InputOrderData = ({basket_id}:{ basket_id:string }):{OrderData:IOrderCreate,Context:JSX.Element} => {

    const t = useTranslations("InputOrderData");
    
    const cityEn = useGetCityParams();
    const cityRu = CityEnToRu?.[cityEn];

    const [step, setStep] = useState<number>(1);

    const orderManager = useState<IOrderCreate>({
        "uuid_id": basket_id,
        delivery_type: "DELIVERY",
        shipping_city: cityRu,
        payment_type: null,
        delivery_address: null,

    } as IOrderCreate);

    const [orderData, setOrderData] = orderManager;

    const accessToken = useUser().accessToken.token;

    const [messageApi, contextHolder] = message.useMessage();

    // Может ли пользователь открыть коллапс (вернуться и заново его отредактировать)
    const userCanOpenCollapse = (currentStep: number): { can: boolean; message: string } => {
        const paymentTypeEmpty = !orderData.payment_type;
        const deliveryAddressEmpty = !orderData.delivery_address;

        if (currentStep === 2 && paymentTypeEmpty) {
            return { can: false, message: t("vyberite-sposob-oplaty") };
        }
        if (currentStep === 3) {
            if (paymentTypeEmpty && deliveryAddressEmpty) {
                return { can: false, message: t("vyberite-sposob-dostavki-i-sposob-oplaty") };
            }
            if (paymentTypeEmpty) {
                return { can: false, message: t("vyberite-sposob-oplaty") };
            }
            if (deliveryAddressEmpty) {
                return { can: false, message: t("vyberite-adres-dostavki") };
            }
        }
        return { can: true, message: "" };
    };

    const onClickCollapse = (currentStep: number) => {
        const { can, message } = userCanOpenCollapse(currentStep);
        if (!can) {
            messageApi.open({
                type: 'error',
                content: message,
            })
            return
        }
        else {
            setStep(currentStep);
        }
    }

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
            key: 1,
            label: <Title level={5} onClick={() => onClickCollapse(1)}>1.{t('vyberite-sposob-oplaty')}</Title>,
            children: <PaymentOptions setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        },
        {
            key: 2,
            label: <Title level={5} onClick={() => onClickCollapse(2)}>2.{t('dostavka')}</Title>,
            children: <Delivered setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        },
        {
            key: 3,
            label: <Title level={5} onClick={() => onClickCollapse(3)}>3.{t('poluchatel')}</Title>,
            children: <Recipient setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        }];

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: "#fff",
        borderRadius: 8,
        border: 'none',
    };

    useEffect(() => {
        setOrderData((prevData) => ({
            ...prevData,
            access_token: { access_token: accessToken },
        }));
    }, [accessToken, setOrderData]);


    const Context = <>
        {contextHolder}
        <Collapse
            items={getItems(panelStyle)}
            defaultActiveKey={1}// <-- Ошибка ? defaultActiveKey={["1"]}
            activeKey={step}
            collapsible="header"
            ghost
        /></>;

    return { OrderData:orderData, Context }

}

export default InputOrderData