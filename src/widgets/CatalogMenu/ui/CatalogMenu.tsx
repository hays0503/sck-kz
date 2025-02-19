"use client";
import useGetCategoryAllSWR from "@/entities/Category/model/getCategoryAllSWR";
import findCategory from "@/shared/tools/findCategory";
import { MappedCategoryType } from "api-mapping/category/all/type";
import RowCategory from "./SubModule/RowCategory";
// import { useTranslations } from "next-intl";


const CatalogMenu: React.FC<{ slugCategory: string,v2flag?:boolean }> = ({ slugCategory,v2flag }) => {

    // const t = useTranslations("CatalogMenu");

    const ListStyle: React.CSSProperties = {
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    };

    const { data, isLoading, error } = useGetCategoryAllSWR();

    if (!data && isLoading) {
        return <div>Загрузка</div>
    }

    if (error) {
        return <div>Ошибка</div>
    }

    const fetchCategory = data?.results ?? [];

    const categoryFind = findCategory(fetchCategory, (category)=>category.slug===slugCategory);

    if (!categoryFind) {
        return <div>
            <ul style={ListStyle}>
                {
                    fetchCategory.map((category: MappedCategoryType) => (
                        <RowCategory key={category.slug} item={category} v2flag={v2flag}/>
                    ))
                }
            </ul>
        </div>
    } else {
        return <div>
        <ul style={ListStyle}>
            {
                categoryFind.children.map((category: MappedCategoryType) => (
                    <RowCategory key={category.slug} item={category} />
                ))
            }            
            {
                <RowCategory key={categoryFind.slug} item={categoryFind} root />
            }
        </ul>
    </div>
    }

}
export default CatalogMenu