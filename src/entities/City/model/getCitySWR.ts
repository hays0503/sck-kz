import defaultFetcher from "@/shared/tools/defaultFetcher";
import { MappedCityType } from "api-mapping/city";
import useSWR, { SWRResponse } from "swr";


const useGetCitySWR = ():SWRResponse<{results:MappedCityType[]}> => {
    const url = `/api-mapping/city`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object;
}

export default useGetCitySWR