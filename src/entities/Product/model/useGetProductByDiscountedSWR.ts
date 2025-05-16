import useSWR, { SWRResponse } from "swr";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { getProductResult } from "../api/getProductPopulates";

const useGetProductByDiscountedSWR = ({
    city,
    orderBy,
    page
}: {
    city: string;
    orderBy: "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price"|"none_sort";
    page: number;
}): SWRResponse<getProductResult> => {
    const url = `/api-mapping/product/by_discounted?page=${page}&order=${orderBy}&city=${city}`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object;
};

export default useGetProductByDiscountedSWR
