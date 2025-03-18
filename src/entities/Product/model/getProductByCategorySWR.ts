import useSWR, { SWRResponse } from "swr";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { getProductResult } from "../api/getProductPopulates";

const useGetProductByCategorySWR = ({
  category,
  city,
  orderBy,
  page,
}: {
  category: string;
  city: string;
  orderBy: "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price";
  page: number;
}): SWRResponse<getProductResult> => {
  console.log("useGetProductByCategorySWR");
  console.count("useGetProductByCategorySWR = >>");
  const url = `/api-mapping/product/by_category/?category=${category}&order=${orderBy}&page=${page}&city=${city}`;

  const object = useSWR(url, (_url) => defaultFetcher(_url));
  return object;
};

export default useGetProductByCategorySWR;
