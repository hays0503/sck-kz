import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { rawBasketType } from "../_type/rawBasketType";


const getDataByUuid = async (uuid_id:string): Promise<rawBasketType|undefined> => {
      const url = `${UrlApiWithDomainV2.getBasket}by/${uuid_id}`;
      const response = await fetch(url,{
        next: {
          tags: [`basket/${uuid_id}`], 
          revalidate: 60
         }, // Данные кешируются на 60 секунд
      });
    
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    return undefined
}

export default getDataByUuid