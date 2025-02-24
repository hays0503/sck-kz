"use client";

import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useCallback, useEffect } from "react";
import { mutate } from "swr";
import { useLocalStorage } from "@undefined/usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { useTranslations } from "next-intl";

interface useBasketAddProps {
  readonly prod_id: number;
}

type useBasketAddHook = (props: useBasketAddProps) => [() => void, React.ReactNode];

const useBasketAdd: useBasketAddHook = ({ prod_id }) => {
  const t = useTranslations("Basket");
  const [messageApi, contextHolder] = message.useMessage();
  const [uuid, setUuid] = useLocalStorage<string | null>("uuid_id", null);
  
  useEffect(() => {
    if (!uuid) {
      setUuid(uuidv4());
    }
  }, [setUuid, uuid]);
  const cityEn = useGetCityParams();
  const action = useCallback(async () => {
    const url = `/api-mapping/basket/add-product?uuid=${uuid}&prod_id=${prod_id}&city=${cityEn}`;
    const response = await fetch(url, {
      method: "POST",
    });
    if (response.ok) {
      mutate(`/api-mapping/basket/count/?uuid=${uuid}`);
      mutate(`/api-mapping/basket/get-products/?uuid=${uuid}&city=${cityEn}`);
      messageApi.open({
        type: "success",
        content: t("tovar-dobavlen-v-korzinu"),
      });
    } else {
      messageApi.open({
        type: "error",
        content: t("error"),
      });
    }
  }, [uuid, prod_id, cityEn, messageApi, t]);

  return [action, contextHolder];
};

export default useBasketAdd;
