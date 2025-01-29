import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { rawProductsTypeV2 } from "api-mapping/product/_type/rawProductTypeV2";


async function getProductBySlug(slug:string): Promise<rawProductsTypeV2|undefined> {

    const url  = `${UrlApiWithDomainV2.getProductsBySlug}${slug}`;
    console.log("url", url);
    const response = await fetch(url, {
        next: { revalidate: 60 }, // Данные кешируются на 60 секунд
    });    

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return undefined
}

export default getProductBySlug