"use client"
import { Dispatch, useEffect, useLayoutEffect, useState } from "react";
import { FilterType } from "./SubModule/FilterValueCheckBox";
import { Button, Flex, notification, Typography } from "antd";
import { useTranslations } from "next-intl";
import FilterGroupDesktop from "./SubModuleDesktop/FilterGroupDesktop";

const { Text } = Typography

const FilterDesktop: React.FC<{
    height: number
    category: string,
    filterActive: number[],
    setFilterActive: Dispatch<React.SetStateAction<number[]>>,
    dropFilter: () => void
}> = ({ category, filterActive, setFilterActive, height, dropFilter }) => {
    const t = useTranslations("Filter")
    const [tempFilterStorage, setTempFilterStorage] = useState<number[]>([]);
    const [dataSpecifications, setDataSpecifications] = useState<FilterType[]>();
    const [api, contextHolder] = notification.useNotification();

    useLayoutEffect(() => {
        const GetFilterData = async () => {
            const data = await fetch(`/api-mapping/filter/?category=${category}`);
            const {result} = await data.json();
            setDataSpecifications(result);
        }
        GetFilterData();
    }, [category])

    useEffect(() => {
        if (tempFilterStorage.length !== 0) {
            api.destroy();
            api.info({
                btn: <Button style={{ width: "100%", height: "30px", backgroundColor: '#4954F0', borderRadius: "10px" }}
                    onClick={() => {
                        setFilterActive(tempFilterStorage)
                    }}
                >
                    <Text style={{ color: "#fff" }}>{t('pokazat-vybrannye-tovary')}</Text>
                </Button>
                ,
                message: `Найдено ${tempFilterStorage.length} товаров `,
                placement: 'top',
                duration: 6000

            });
        }
    }, [api, filterActive.length, setFilterActive, t, tempFilterStorage, tempFilterStorage.length])


    if (!dataSpecifications)
        return <Flex style={{
            height:`${height}px`,
            overflowY: "scroll",
            width: "25%"
        }}>
            <Text>{t('zagruzka-filtrov')}</Text>
        </Flex>

    return <Flex vertical style={{
        height:`${height}px`,
        overflowY: "scroll",
        width: "25%"
    }}>
        <FilterGroupDesktop
            specificationDefault={dataSpecifications}
            filterActive={tempFilterStorage}
            setFilterActive={setTempFilterStorage} 
            dropFilter={dropFilter}/>
        {contextHolder}
    </Flex>
}

export default FilterDesktop