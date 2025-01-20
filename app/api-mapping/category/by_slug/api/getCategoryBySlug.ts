import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import { rawTypeCategory } from "api-mapping/category/_type/rawTypeCategory";


const getCategoryBySlug = async (slug: string): Promise<rawTypeCategory|undefined> => {
    
    const url  = `${UrlApiWithDomainV1.getCategory}${slug}`;

    const response = await fetch(url, {
        next: { revalidate: 60 }, // Данные кешируются на 60 секунд
    });

    

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return undefined
}

export default getCategoryBySlug