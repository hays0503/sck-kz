"use server"
import getReviewsByUserId from "@/entities/Reviews/api/getReviewsByUserId";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { FooterSCK } from "@/widgets/FooterSCK";
import ReviewsUser from "@/widgets/ReviewsUser/ui/ReviewsUser";
import { LayoutMainDesktop } from "@/widgets/LayoutMainDesktop";
import { SelectCity } from "@/features/select-city";
import { ChangeLanguage } from "@/features/change-language";
import { SearchProduct } from "@/features/search-products";
import { HeaderDesktop } from "@/widgets/HeaderDesktop";
import { CatalogDesktop } from "@/widgets/CatalogDesktop";
import { UserCabinet } from "@/widgets/UserCabinet";
import { BasketButton } from "@/widgets/BasketButton";
import { unstable_cache } from "next/cache";
import getCity from "@/entities/City/api/getCity";
import { getCategoryRoot } from "@/entities/Category";


interface IReviewsUserPage {
  readonly params: {
    readonly locale: string;
    readonly city: string;
    readonly user_id: string|undefined|null;
  };
}

const ReviewsUserPage = async ({params}: IReviewsUserPage) => {
  
  const {user_id,city} = await params

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
                    content={<ReviewsUser user_id={user_id}/>}
                    footerContent={<FooterSCK/>}
                    />
                </ProvidersClient>
            </ProvidersServer>
  );
};

export default ReviewsUserPage;
