"use client"
import { Flex, Typography } from "antd"
import FilterValueCheckBox, { FilterType } from "./FilterValueCheckBox"
import { Dispatch, useState } from "react"
import { useTranslations } from "next-intl"

const { Text } = Typography

interface IFilterGroupCheckBoxProps {
    item: FilterType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterActive: number[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilterActive: Dispatch<React.SetStateAction<number[]>>,
    setKeyValue: Dispatch<React.SetStateAction<string[]>>
}

const FilterGroupCheckBox: React.FC<IFilterGroupCheckBoxProps> = ({ item, filterActive, setFilterActive, setKeyValue }) => {
    const t = useTranslations("FilterGroupCheckBox");
    const needExpanded = item.value.length > 5
    const [expand, setExpand] = useState(needExpanded);

    const entries = expand ? item.value.slice(0, 5) : item.value

    return <Flex key={item.key} vertical style={{ width: "100%", backgroundColor: "#ffff" }}>
        {entries.map((_value: {
            key: string;
            value: {
                disabled: boolean;
                productIds: number[];
            };
        }) => {
            return <FilterValueCheckBox
                key={_value.key}
                keyString={_value.key}
                productIds={_value.value.productIds}
                disabled={_value.value.disabled}
                setFilterActive={setFilterActive}
                filterActive={filterActive}
                setKeyValue={setKeyValue}
            />
        })}
        {needExpanded && <Text onClick={() => setExpand(!expand)}
            style={{
                color: 'blue',
                textDecorationLine: "underline"
            }}
        >
            {expand ? t('pokazat-eshe') : t('spryatat')}
        </Text>
        }

    </Flex>
}
export default FilterGroupCheckBox;