import { rawTypeCategory } from "api-mapping/category/_type/rawTypeCategory";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";


const mapping = (rawData: rawTypeCategory):MappedCategoryWithoutChildrenType => {
    return {
        id: rawData.id,
        slug: rawData.slug,
        name: {
            ru: rawData.name_category,
            en: rawData.additional_data.en,
            kk: rawData.additional_data.kk,
        },
        img: rawData.list_url_to_image,
        banner: rawData.list_url_to_baner
    } as MappedCategoryWithoutChildrenType 
}

export default mapping