"use client";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { BrandDataRaw } from "api-mapping/category/brands/api/getBrandsBySlugCategory";

import useSWR, { SWRResponse } from "swr";


const useGetBrandByCategorySWR = (slug:string,cityEn:string):SWRResponse<{results:BrandDataRaw[]}> => {
    const url = `/api-mapping/category/brands/?city=${cityEn}&slug=${slug}`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object
}

export default useGetBrandByCategorySWR;