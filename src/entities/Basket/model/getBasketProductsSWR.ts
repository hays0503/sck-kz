import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import defaultFetcher from "@/shared/tools/defaultFetcher";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { MappedBasketType } from "api-mapping/basket/get-products/type/MappedBasketType";
import useSWR, { SWRResponse } from "swr";



const useGetBasketProductsSWR = ():SWRResponse<MappedBasketType> => {
    const cityEn = useGetCityParams();
    const uuid = useReadLocalStorage<string>("uuid_id");
    const shouldFetch = Boolean(uuid); // Проверяем, нужен ли запрос
    const url = shouldFetch ? `/api-mapping/basket/get-products/?uuid=${uuid}&city=${cityEn}` : null;
    const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => null));  
    return object;
}

export default useGetBasketProductsSWR;