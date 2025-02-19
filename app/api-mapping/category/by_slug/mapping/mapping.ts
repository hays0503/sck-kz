import { rawTypeCategory } from "api-mapping/category/_type/rawTypeCategory";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";


const mapping = (rawData: rawTypeCategory):MappedCategoryWithoutChildrenType => {
    return {
        slug: rawData.slug,
        name: {
            ru: rawData.name_category,
            en: rawData.additional_data.EN,
            kk: rawData.additional_data.KZ,
        },
        img: rawData.list_url_to_image,
        banner: rawData.list_url_to_baner
    } as MappedCategoryWithoutChildrenType 
}

export default mapping