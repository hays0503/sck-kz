"use server"

import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { getCategoryRoot } from "@/entities/Category";
import getCity from "@/entities/City/api/getCity";
import { MappedCityType } from "api-mapping/city";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { LayoutMainDesktop } from "@/widgets/LayoutMainDesktop";
import { SelectCity } from "@/features/select-city";
import { ChangeLanguage } from "@/features/change-language";
import { SearchProduct } from "@/features/search-products";
import { HeaderDesktop } from "@/widgets/HeaderDesktop";
import { CatalogDesktop } from "@/widgets/CatalogDesktop";
import { UserCabinet } from "@/widgets/UserCabinet";
import { BasketButton } from "@/widgets/BasketButton";
import { FooterSCK } from "@/widgets/FooterSCK";
import { OrderDesktop } from "@/widgets/OrderDesktop";

interface OrderPageProps {
    readonly params: {
      locale: string;
      city: string;
      basket_id: string;
    };
  }
  

export default async function OrderPage({params}: OrderPageProps) {

    const {basket_id} = await params;

    const cities: MappedCityType[] = await getCity();

    const categoryRoot: { results: MappedCategoryWithoutChildrenType[] } | undefined = await getCategoryRoot();

    const urlCity = `/api-mapping/city`
    const urlCategoryRoot = `/api-mapping/category/root`
    const fallback = {
        [urlCity]: cities,
        [urlCategoryRoot]: categoryRoot
    };

    return (
        <ProvidersServer>
            <ProvidersClient fallback={fallback}>
                <LayoutMainDesktop
                    headerContent={
                        <HeaderDesktop
                            SelectCity={SelectCity}
                            ChangeLanguage={ChangeLanguage}
                            SearchProduct={SearchProduct}
                            CatalogDesktop={CatalogDesktop}
                            UserCabinet={UserCabinet}
                            BasketButton={BasketButton}
                        />}
                    content={<OrderDesktop basket_id={basket_id}/>}
                    footerContent={<FooterSCK/>}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}
