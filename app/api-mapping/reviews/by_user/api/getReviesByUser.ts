import { UrlApiWithDomainV1 } from "@/shared/constant/url"
import { Reviews } from "@/shared/types/reviews";


const getReviewsByUser = async (userUUID: string) => {

  const url = `${UrlApiWithDomainV1.getProductReviews}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {    
    console.error("При получении отзывов произошла ошибка");
    return {
      data: null,
      statusCode: response.status
    }
  }

  const data = await response.json() as Reviews[];

  const userReviews = data.filter((review: Reviews) => review?.user_uuid === userUUID);  

  return {data:userReviews, statusCode: response.status};
}

export default getReviewsByUser

