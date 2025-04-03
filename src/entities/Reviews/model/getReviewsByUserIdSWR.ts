import defaultFetcher from "@/shared/tools/defaultFetcher";
import useSWR from "swr";


const useGetReviewsByUserIdSWR = (user_id:string|undefined|null) => {

  const url = `/api-mapping/reviews/by_user/?user_id=${user_id}`;

  const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => []));
  return object;
}
export default useGetReviewsByUserIdSWR;