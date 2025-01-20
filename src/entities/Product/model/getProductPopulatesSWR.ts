import useSWR, { SWRResponse } from "swr";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { getProductResult } from "../api/getProductPopulates";

const useGetProductPopulatesSWR = ({
  city,
  orderBy,
  page,
}: {
  city: string;
  orderBy: "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price";
  page: number;
}): SWRResponse<getProductResult> => {
  const url = `/api-mapping/product/populates?page=${page}&order=${orderBy}&city=${city}`;
  const object = useSWR(url, (_url) => defaultFetcher(_url));
  return object;
};

export default useGetProductPopulatesSWR;
