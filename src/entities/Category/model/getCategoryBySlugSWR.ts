import defaultFetcher from "@/shared/tools/defaultFetcher";
import useSWR from "swr";


const useGetCategoryBySlugSWR = (slug:string) => {
    const url = `/api-mapping/category/by_slug/?slug=${slug}`;
    const object = useSWR(url, (_url) => defaultFetcher(_url));
    return object
}
export default useGetCategoryBySlugSWR