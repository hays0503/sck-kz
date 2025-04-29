import { UrlApiWithDomainV1 } from "@/shared/constant/url"

export interface BrandDataRaw {
  id: number;
  name_brand: string | null | undefined;
  additional_data: {
    EN: string | null | undefined;
    KZ: string | null | undefined;
  };
  logo: { image: string }[] | [] | null;
}

const getBrandsBySlugCategory = async (slugCategory:string,cityRu:string):Promise<{
  results:BrandDataRaw[],
  statusCode:number,
  message?:string
}> => {
    const url =`${UrlApiWithDomainV1.getCategory}${slugCategory}/brands/?city=${cityRu}`
    const response = await fetch(url);
    if(response.ok){
      try{
        const data = await response.json();
        return {
          results:data,
          statusCode:response.status
        }
      }catch{
        return {
          results:[],
          statusCode:response.status,
          message:"Произошла проблема при разборе ответа getBrandsBySlugCategory"
        }
      }
    }else{
      return {
        results:[],
        statusCode:response.status,
        message:"Произошла проблема при запросе getBrandsBySlugCategory"
      }
    }
}
export default getBrandsBySlugCategory  