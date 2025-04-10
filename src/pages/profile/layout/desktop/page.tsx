"use server"

import { getCategoryRoot } from "@/entities/Category";
import getCity from "@/entities/City/api/getCity";
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
import { Flex } from "antd";
import { FooterSCK } from "@/widgets/FooterSCK";
import { ProfileDesktop } from "@/widgets/ProfileDesktop";
import { searchParamsCache } from "./searchParams";
import { SearchParams } from "nuqs";
import { unstable_cache } from "next/cache";
import getReviewsByUserId from "@/entities/Reviews/api/getReviewsByUserId";


type ProfilePage = {
    params: Promise<{
      readonly slug: string;
      readonly locale: string;
      readonly city: string;
      readonly user_id: string|undefined|null;
    }>;
    searchParams: Promise<SearchParams>;
  };

export default async function ProfilePage(props: ProfilePage) {


    const { searchParams, params } = await props;
    const { city, user_id } = await params;
    const { page, order } = searchParamsCache.parse(await searchParams);

    const urlCity = `/api-mapping/city`
    const urlReviews = `/api-mapping/reviews/by_user/?user_id=${user_id}`
    const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`
  
    const revTime = { revalidate: 600 };
  
    const [cities,categoryRoot,userReviews] = await Promise.all([
      unstable_cache(getCity,[],revTime)(),
      unstable_cache(()=>getCategoryRoot(city),[city],revTime)(),
      unstable_cache(()=>getReviewsByUserId(user_id),[urlReviews],revTime)(),
    ])
  
  
    const fallback = {
      [urlReviews]: userReviews,
      [urlCategoryRoot]: categoryRoot,
      [urlCity]: cities
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
                    content={<Flex vertical={true} gap={5}>
                        <ProfileDesktop page={page} order={order}/>
                    </Flex>}
                    footerContent={<FooterSCK/>}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}
