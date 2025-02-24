import defaultFetcher from "@/shared/tools/defaultFetcher";
import { useLocalStorage, useReadLocalStorage } from "@undefined/usehooks-ts";
import { useEffect } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const useGetProductsIdsByFavoriteSWR = () => {
  const [uuid, setUuid] = useLocalStorage<string>("uuid_id","");
  useEffect(() => {
    if (!uuid) {
      setUuid(uuidv4());
    }
  }, []);
  const user_id = useReadLocalStorage<{ user_id: string }>("user_id");
  const url = `/api-mapping/featured-products/get-product/?uuid=${uuid}&user_id=${
    user_id?.user_id ?? ""
  }`;

  const object = useSWR(url, (_url) => defaultFetcher(_url).catch(() => []));
  return object;
};

export default useGetProductsIdsByFavoriteSWR;
