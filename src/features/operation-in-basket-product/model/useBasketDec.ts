"use client";

import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useCallback } from "react";
import { mutate } from "swr";
import { useReadLocalStorage } from "usehooks-ts";

interface useBasketDecProps {
  readonly prod_id: number;
}

type useBasketAddHook = (props: useBasketDecProps) => () => void;

const useBasketDec: useBasketAddHook = ({ prod_id }) => {
  const uuid = useReadLocalStorage<string>("uuid_id");
  const cityEn = useGetCityParams();
  const action = useCallback(async () => {
    const url = `/api-mapping/basket/dec-product?uuid=${uuid}&prod_id=${prod_id}&city=${cityEn}`;
    const response = await fetch(url, {
      method: "POST",
    });
    if (response.ok) {
      mutate(`/api-mapping/basket/count/?uuid=${uuid}`);
      mutate(`/api-mapping/basket/get-products/?uuid=${uuid}&city=${cityEn}`);
    }
  }, [uuid, prod_id, cityEn]);

  return action;
};

export default useBasketDec;
