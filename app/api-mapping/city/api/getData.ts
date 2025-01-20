import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import mapping from "../mapping/mapping";
import { MappedCityType } from "../type";

const getData = async (): Promise<{results:MappedCityType[]}|undefined> => {
      const url = `${UrlApiWithDomainV1.getCity}`;
    
      const response = await fetch(url,{
        next: { revalidate: 60 }, // Данные кешируются на 60 секунд
      });
    
      if (response.ok) {
        const data = await response.json();
        const mappedData = mapping(data);
        return mappedData;
      }
    return undefined
}

export default getData