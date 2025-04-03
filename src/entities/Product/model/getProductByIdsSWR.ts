"use client";
import useSWR, { SWRResponse } from "swr";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { getProductResult } from "../api/getProductPopulates";

const useGetProductByIdsSWR = ({
  ids,
  city,
  orderBy,
  page,
}: {
  ids: number[];
  city: string;
  orderBy: "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price";
  page: number;
}): SWRResponse<getProductResult> => {
  const url = `/api-mapping/product/by_ids/?ids=${ids}&order=${orderBy}&city=${city}&page=${page}`;

  const object = useSWR(url, (_url) => defaultFetcher(_url, {
    method: "GET",
    next: { revalidate: 0 },
  }));
  return object;
};

export default useGetProductByIdsSWR;
