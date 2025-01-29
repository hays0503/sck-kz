import defaultFetcher from "@/shared/tools/defaultFetcher";
import { MappedBasketType } from "api-mapping/basket/get-products/type/MappedBasketType";
import useSWR, { SWRResponse } from "swr";



const useGetBasketProductsSWR = ({uuid,cityEn}:{uuid:string,cityEn:string}):SWRResponse<MappedBasketType> => {
    const shouldFetch = Boolean(uuid); // Проверяем, нужен ли запрос
    const url = shouldFetch ? `/api-mapping/basket/get-products/?uuid=${uuid}&city=${cityEn}` : null;
    const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => null));  
    return object;
}

export default useGetBasketProductsSWR;