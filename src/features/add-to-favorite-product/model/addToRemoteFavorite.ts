import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { message } from "antd";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { mutate } from "swr";

const useAddToRemoteFavorite = (): [React.ReactNode, (product_id: number) => Promise<void>] => {

    const t = useTranslations("AddToFavorite");

    const [messageApi, contextHolder] = message.useMessage();

    const uuid = useReadLocalStorage<string>("uuid_id");
    const user_id = useReadLocalStorage<{user_id:string}>("user_id");

    const add = useCallback(async (product_id: number) => {

        const url = `/api-mapping/featured-products/add-product/?uuid=${uuid}&product_id=${product_id}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })

        if (response.ok) {
            messageApi.open({
                type: 'success',
                content: t('tovar-dobavlen-v-izbrannoe'),
            })
            const urlForUpdateSwr = `/api-mapping/featured-products/get-product/?uuid=${uuid}&user_id=${user_id?.user_id ?? ""}`;
            mutate(urlForUpdateSwr);
        }else{
            messageApi.open({
                type: 'error',
                content: t('proizoshla-oshibka-pri-dobavlenii-v-izbrannoe'),
            })
        }

    },[messageApi, t, uuid, user_id]);

    return [
        contextHolder,
        add
    ]
}

export default useAddToRemoteFavorite;