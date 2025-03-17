import defaultFetcher from "@/shared/tools/defaultFetcher";
import useSWR from "swr";

const useGetProductBySlugSWR = (slug: string,city:string) => {
    const url = `/api-mapping/product/by_slug/?slug=${slug}&city=${city}`;

    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object;
}

export default useGetProductBySlugSWR