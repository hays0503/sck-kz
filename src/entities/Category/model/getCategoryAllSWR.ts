"use client";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { MappedCategoryType } from "api-mapping/category/all/type";
import useSWR, { SWRResponse } from "swr";


const useGetCategoryAllSWR = (cityEn:string):SWRResponse<{results:MappedCategoryType[]}> => {
    const url = `/api-mapping/category/all/?city=${cityEn}`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object
}

export default useGetCategoryAllSWR;