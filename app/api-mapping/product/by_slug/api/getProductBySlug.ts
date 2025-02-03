import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { rawProductsTypeV2 } from "api-mapping/product/_type/rawProductTypeV2";

type responseType = {
    url: string
    data: rawProductsTypeV2|object
    statusCode: number
}

async function getProductBySlug(slug:string): Promise<responseType> {

    const url  = `${UrlApiWithDomainV2.getProductsBySlug}${slug}`;
    console.log("url", url);
    const response = await fetch(url, {
        // next: { revalidate: 60 }, // Данные кешируются на 60 секунд
    });    

    if (response.ok) {
        const data = await response.json();
        return {
            url: url,
            data: data,
            statusCode: response.status
        };
    }

    return {
        url: url,
        data: await response.json(),
        statusCode: response.status
    };
}

export default getProductBySlug