import { MappedCategoryWithoutChildrenType, rawTypeCategory } from "../type";

const mapping = (rawData: rawTypeCategory[]|[]):{results:MappedCategoryWithoutChildrenType[]} => {
    if(rawData.length === 0) return {results: []};
    const category = rawData.map((product: rawTypeCategory) => ({
        slug: product.slug,
        name: {
            ru: product.name_category,
            en: product.additional_data.EN,
            kk: product.additional_data.KZ,
        },
        img: product.list_url_to_image,
        banner: product.list_url_to_baner
        
    }));

    return {
        results: category
    }
}

export default mapping;
