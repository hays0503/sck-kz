"use client";
import useGetCategoryAllSWR from "@/entities/Category/model/getCategoryAllSWR";
import findCategory from "@/shared/tools/findCategory";
import { MappedCategoryType } from "api-mapping/category/all/type";
import RowCategory from "./SubModule/RowCategory";
import { useTranslations } from "next-intl";
import { Divider, Flex,Typography } from "antd";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
// import { useTranslations } from "next-intl";

const { Title } = Typography

const CatalogMenu: React.FC<{ slugCategory: string }> = ({ slugCategory }) => {
    const cityEn = useGetCityParams();
    const t = useTranslations("CatalogMenu");

    const { data, isLoading, error } = useGetCategoryAllSWR();

    if (!data && isLoading) {
        return <div>{t('zagruzka')}</div>
    }

    if (error) {
        return <div>{t('oshibka')}</div>
    }

    const fetchCategory = data?.results ?? [];

    const categoryFind = findCategory(fetchCategory, (category) => category.slug === slugCategory);

    const sortImgFirst = (a: MappedCategoryType, b: MappedCategoryType) => {
        return (b.img.length > 0 ? 1 : 0) - (a.img.length > 0 ? 1 : 0);
    };




    if (!categoryFind) {
        const sorted = fetchCategory.sort(sortImgFirst);
        return <Flex align="center" vertical style={{ width: "100%", height: "100%",paddingTop:"10px"}}>
                    <Flex component={"ul"} gap={10} wrap={"wrap"} align="flex-start" justify="flex-start" style={{ width: "95%", height: "100%", alignContent: "flex-start" }}>
                        {
                            sorted.map((category: MappedCategoryType) => (
                                <RowCategory key={category.slug} item={category} />
                            ))
                        }
                    </Flex>
                </Flex>
    } else {
        const sorted = categoryFind.children.slice().sort(sortImgFirst);
        return <Flex align="center" justify="space-between" vertical style={{ width: "100%", height: "inherit",paddingTop:"10px"}}>
                    <Flex component={"ul"} gap={10} wrap={"wrap"}style={{ width: "95%", height: "auto", alignContent: "flex-start" }}>
                        {
                            sorted.map((category: MappedCategoryType) => (
                                <RowCategory key={category.slug} item={category} />
                            ))
                        }
                    </Flex> 

                    <Flex vertical style={{padding:"10px",width:"100%",height:"auto"}}>
                        <Divider style={{margin:"0px"}}/>
                        <Link href={`/city/${cityEn}/catalog/category-slug/${categoryFind.slug}`} style={{color:"black"}}>
                        <Flex align="center" justify="space-between" style={{width:"100%",height:"auto"}}>
                            <Title level={4} style={{color:"#007dc6"}}>
                                Все товары
                            </Title>                            
                            <Image src={'/arrow.svg'} alt="arrow" width={50} height={50}/>
                        </Flex>
                        </Link>
                    </Flex>
                </Flex>
    }

}
export default CatalogMenu