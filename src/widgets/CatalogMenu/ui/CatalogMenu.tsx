"use client";
import useGetCategoryAllSWR from "@/entities/Category/model/getCategoryAllSWR";
import findCategory from "@/shared/tools/findCategory";
import { MappedCategoryType } from "api-mapping/category/all/type";
import RowCategory from "./SubModule/RowCategory";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
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

    const cityEn = useGetCityParams();

    const { data, isLoading, error } = useGetCategoryAllSWR(cityEn);

    if (!data && isLoading) {
        return <div>Загрузка</div>
    }

    if (error) {
        return <div>Ошибка</div>
    }

    const fetchCategory = data?.results ?? [];

    const categoryFind = findCategory(fetchCategory, (category)=>category.slug===slugCategory);

    if (!categoryFind) {
        return <>
            <ul style={ListStyle}>
                {
                    fetchCategory.map((category: MappedCategoryType) => (
                        <RowCategory key={category.slug} item={category} v2flag={v2flag}/>
                    ))
                }
            </ul>
        </>
    } else {
        return <>
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
    </>
    }

}
export default CatalogMenu