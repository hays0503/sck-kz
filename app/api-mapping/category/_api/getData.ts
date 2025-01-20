import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import { rawTypeCategory } from "../_type/rawTypeCategory";



const getData = async (): Promise<rawTypeCategory[]|undefined> => {
      const url = `${UrlApiWithDomainV1.getCategory}`;
    
      const response = await fetch(url,{
        next: { revalidate: 60 }, // Данные кешируются на 60 секунд
      });
    
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    return undefined
}

export default getData