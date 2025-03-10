"use server";

import getCity from "@/entities/City/api/getCity";
import { ChangeLanguage } from "@/features/change-language";
import { SearchProduct } from "@/features/search-products";
import { SelectCity } from "@/features/select-city";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { BasketButton } from "@/widgets/BasketButton";
import { BasketDesktop } from "@/widgets/BasketDesktop";
import { CatalogDesktop } from "@/widgets/CatalogDesktop";
import { FooterSCK } from "@/widgets/FooterSCK";
import { HeaderDesktop } from "@/widgets/HeaderDesktop";
import { LayoutMainDesktop } from "@/widgets/LayoutMainDesktop";
import { UserCabinet } from "@/widgets/UserCabinet";
import { MappedCityType } from "api-mapping/city";


interface BasketPageProps {
    readonly params: {
        locale: string;
        city: string;
        basket_id: string;
    };
}


async function BasketPage({ params }: BasketPageProps) {

    const { basket_id } = await params;

    const urlCity = `/api-mapping/city`
    const cities: MappedCityType[] = await getCity();

    const fallback = {
        [urlCity]: cities,
    }

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
                    content={<BasketDesktop basket_id={basket_id} />}
                    footerContent={<FooterSCK />}
                />
            </ProvidersClient>
        </ProvidersServer>
    );   
}

export default BasketPage;
