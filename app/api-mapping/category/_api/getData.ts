import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import { rawTypeCategory } from "../_type/rawTypeCategory";
import CityEnToRu from "@/shared/constant/city";



const getData = async (city?: string|undefined): Promise<rawTypeCategory[]|undefined> => {
      let url = `${UrlApiWithDomainV1.getCategory}`;
    
      if (city) {        
        const cityRu: string = (CityEnToRu[city] as string) ?? 'Караганда';
        url += `?city=${cityRu}`;
      }

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