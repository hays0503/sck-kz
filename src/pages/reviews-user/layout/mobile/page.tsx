"use server"
import getReviewsByUserId from "@/entities/Reviews/api/getReviewsByUserId";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import ReviewsUser from "@/widgets/ReviewsUser/ui/ReviewsUser";


interface IReviewsUserPage {
  readonly params: {
    readonly locale: string;
    readonly city: string;
    readonly user_id: string|undefined|null;
  };
}

const ReviewsUserPage = async ({params}: IReviewsUserPage) => {
  
  const {user_id} = await params

  const urlReviews = `/api-mapping/reviews/by_user/?user_id=${user_id}`
  const userReviews = getReviewsByUserId(user_id);

  const fallback = {
    [urlReviews]: userReviews
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderText />}
          content={<ReviewsUser user_id={user_id}/>}
          footerContent={<FooterMobile defaultKey="4"/>}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ReviewsUserPage;
