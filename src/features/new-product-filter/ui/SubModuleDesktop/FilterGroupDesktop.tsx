"use client";

import {
    Button, Collapse, Flex,
    //  Tag,
    Typography
} from "antd";
import FilterGroupCheckBox from "./FilterGroupCheckBox";
import { Dispatch, useState } from "react";
import { FilterType } from "./FilterValueCheckBox";
import type { CollapseProps } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Title } = Typography

const FilterGroupDesktop: React.FC<{
    specificationDefault: FilterType[],
    filterActive: number[],
    setFilterActive: Dispatch<React.SetStateAction<number[]>>,
    dropFilter: () => void
}> = ({specificationDefault, filterActive, setFilterActive,dropFilter}) => {

    const [
        // keyValue,
        , setKeyValue] = useState<string[]>([])

    const items: CollapseProps['items'] = specificationDefault.map((item) => {
        return {
            key: item.key,
        label: <Flex style={{ width: "100%" }} justify="space-between">
            <Title level={5}>{item.key}</Title>
        </Flex>,
        children: <FilterGroupCheckBox
            key={item.key}
            item={item}
            filterActive={filterActive}
            setFilterActive={setFilterActive}
            setKeyValue={setKeyValue}
        />
        }
    })


        return <Flex vertical align="center" justify="center"
            style={{ width: "100%", height: "auto", backgroundColor: "#EEEFF1" }}>
            <Button danger size="large" style={{ width: "100%", padding: "5px" }} onClick={dropFilter}>
                Сбросить фильтры
            </Button>
            <Collapse
                style={{ height: "auto", overflow: "auto", }}
                defaultActiveKey={specificationDefault.map((item) => item.key)}
                bordered={true}
                items={items}
                expandIconPosition="start"
                expandIcon={(panelProps) => {
                    if (panelProps.isActive) {
                        return <DownOutlined />
                    } else {
                        return <UpOutlined />
                    }
                }} />
        </Flex>
}

        export default FilterGroupDesktop