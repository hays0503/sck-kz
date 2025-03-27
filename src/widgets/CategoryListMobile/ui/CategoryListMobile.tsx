"use client"
import { useGetCategoryRootSWR } from "@/entities/Category";
import type { SegmentedOptions } from "antd/es/segmented";
import { Flex, Segmented } from "antd";
import type { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";
import { CSSProperties } from "react";
import CategoryLink from "@/entities/Category/ui/CategoryLink";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

const CategoryListMobile: React.FC = () => {
    const t = useTranslations("Status")
    const cityEn = useGetCityParams();
    const {data:categoryRoot,isLoading,error} = useGetCategoryRootSWR(cityEn);

    const router = useRouter();
    const style:CSSProperties = {
        padding:"0px",
        "--ant-segmented-item-selected-bg":"#3E54CF",
        "--ant-segmented-item-selected-color":"#FFF",
        "--ant-segmented-track-bg":"transparent",
        "height":"40px",
        "--ant-control-padding-horizontal": "6px",
      } as CSSProperties

    if (!categoryRoot && isLoading) {
        return <Flex align="center" justify="center" style={style}>{t('zagruzka')}</Flex>
    }
    if (error) {
        return <Flex align="center" justify="center" style={style}>{t('oshibka')}</Flex>
    }
    if (!categoryRoot) {
        return <Flex align="center" justify="center" style={style}>{t('net-dannykh')}</Flex>
    }

    const CategoryRootList:SegmentedOptions = categoryRoot?.results.map((categoryItem:MappedCategoryWithoutChildrenType) => {
        return {
            value: categoryItem.slug,
            label: <CategoryLink Category={categoryItem} />
        }
    })
    
    return <Segmented
    options={CategoryRootList}
    style={style}
    defaultValue={"1"}
    onChange={(value: string | number) => router.push(`/city/${cityEn}/catalog/category-slug/${value}`)}
    />
}

export default CategoryListMobile;