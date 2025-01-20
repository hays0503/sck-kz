"use client";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";

import useSWR, { SWRResponse } from "swr";


const useGetCategoryRootSWR = ():SWRResponse<{results:MappedCategoryWithoutChildrenType[]}> => {
    const url = `/api-mapping/category/root`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object
}

export default useGetCategoryRootSWR;