import defaultFetcher from "@/shared/tools/defaultFetcher";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import useSWR from "swr";


const useGetProductsIdsByFavoriteSWR = () => {
    const uuid = useReadLocalStorage<string>("uuid_id");
    const user_id = useReadLocalStorage<{user_id:string}>("user_id");
    const url = `/api-mapping/featured-products/get-product/?uuid=${uuid}&user_id=${user_id?.user_id ?? ""}`;

    const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => []));  
    return object;
}

export default useGetProductsIdsByFavoriteSWR