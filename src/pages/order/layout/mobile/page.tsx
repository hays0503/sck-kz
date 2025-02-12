"use server"

import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { OrderMobile } from "@/widgets/OrderMobile/ui";
import { getTranslations } from "next-intl/server";




interface OrderPageProps {
    readonly params: {
      locale: string;
      city: string;
      basket_id: string;
    };
  }
  

async function OrderPage({params}: OrderPageProps) {

    const {basket_id} = await params;

    const t = await getTranslations("OrderPage")

    return (
        <ProvidersServer>
        <ProvidersClient fallback={{}}>
            <LayoutCustom
            h="px"
            hightHeader={70}
            hightFooter={95}
            headerContent={<HeaderText text={t("placing-an-order")} />}
            content={<OrderMobile basket_id={basket_id}/>}
            footerContent={<FooterMobile defaultKey="3" />}
            />
        </ProvidersClient>
        </ProvidersServer>
    );
}

export default OrderPage;