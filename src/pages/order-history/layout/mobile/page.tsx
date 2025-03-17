"use server"

import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { OrderHistory } from "@/widgets/OrderHistory";
import { getTranslations } from "next-intl/server";

// interface OrderPageProps {
//     readonly params: {
//         locale: string;
//         city: string;
//         refreshToken: string;
//     }
// }


const OrderHistoryPage = async (
    // { params }: OrderPageProps
) => {

    const fallback = {};
    const t = await getTranslations("OrderHistoryPage");

    return (
        <ProvidersServer>
            <ProvidersClient fallback={fallback}>
                <LayoutMain
                    headerContent={<HeaderText text={t('istoriya-zakazov')} />}
                    content={<OrderHistory isMobileDevice={true} />}
                    footerContent={<FooterMobile defaultKey="4" />}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}

export default OrderHistoryPage