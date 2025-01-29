import { MappedCategoryType } from "api-mapping/category/all/type";

type CallbackType = (category: MappedCategoryType) => boolean;

const findCategory = (categories: MappedCategoryType[], callback:CallbackType): MappedCategoryType | undefined => 
{
    for (const category of categories)
    {
        if (callback(category)){ 
            return category;
        }
        if (category?.children && category?.children.length > 0) {
            const foundInChildren = findCategory(category.children, callback);
            if (foundInChildren) {
                return foundInChildren;
            }
        }
    }
    return undefined;
};
export default findCategory;