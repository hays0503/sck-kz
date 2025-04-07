"use server"

import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { OrderMobile } from "@/widgets/OrderMobile/ui";

interface OrderPageProps {
    readonly params: {
      locale: string;
      city: string;
      basket_id: string;
    };
  }
  

async function OrderPage({params}: OrderPageProps) {

    const {basket_id} = await params;

    return (
        <ProvidersServer>
        <ProvidersClient fallback={{}}>
            <LayoutMain
            headerContent={<HeaderText />}
            content={<OrderMobile basket_id={basket_id}/>}
            footerContent={<FooterMobile defaultKey="3" />}
            />
        </ProvidersClient>
        </ProvidersServer>
    );
}

export default OrderPage;