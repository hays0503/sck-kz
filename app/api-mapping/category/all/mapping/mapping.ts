import { rawTypeCategory } from "../type";
import { MappedCategoryType } from "../type/MappedCategory";

const mapping = (rawData: rawTypeCategory[]|[]):{results:MappedCategoryType[]} => {
    if(rawData.length === 0) return {results: []};
    const category = rawData.map((product: rawTypeCategory) => ({
        id: product.id,
        slug: product.slug,
        name: {
            ru: product.name_category,
            en: product.additional_data.en,
            kk: product.additional_data.kk,
        },
        parent: product.parent,
        img: product.list_url_to_image,
        banner: product.list_url_to_baner,
        children: mapping(product.children).results,
    }));

    return {
        results: category
    }
}

export default mapping;
