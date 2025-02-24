"use client";

import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useCallback } from "react";
import { mutate } from "swr";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { message } from "antd";
import { useTranslations } from "next-intl";

interface useBasketDecProps {
  readonly prod_id: number;
}

type useBasketAddHook = (props: useBasketDecProps) => [() => void, React.ReactNode];

const useBasketDec: useBasketAddHook = ({ prod_id }) => {
  const t = useTranslations("Basket");
  const uuid = useReadLocalStorage<string>("uuid_id");
  const [messageApi, contextHolder] = message.useMessage();
  const cityEn = useGetCityParams();
  const action = useCallback(async () => {
    const url = `/api-mapping/basket/dec-product?uuid=${uuid}&prod_id=${prod_id}&city=${cityEn}`;
    const response = await fetch(url, {
      method: "POST",
    });
    if (response.ok) {
      mutate(`/api-mapping/basket/count/?uuid=${uuid}`);
      mutate(`/api-mapping/basket/get-products/?uuid=${uuid}&city=${cityEn}`);
      messageApi.open({
        type: "success",
        content: t('tovar-udalyon-iz-korziny')
      });
    }else{
      messageApi.open({
        type: "error",
        content: t("error"),
      });
    }
  }, [uuid, prod_id, cityEn, messageApi, t]);

  return  [action, contextHolder];
};

export default useBasketDec;
