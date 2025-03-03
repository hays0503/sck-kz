"use client";

import { Button, Collapse, Flex,
    //  Tag,
      Typography } from "antd";
import FilterGroupCheckBox from "./FilterGroupCheckBox";
import { Dispatch, useState } from "react";
import { FilterType } from "./FilterValueCheckBox";
import type { CollapseProps } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Title } = Typography

const FilterGroup: React.FC<{
    dropFilter: () => void,
    specificationDefault: FilterType[],
    filterActive: number[], setFilterActive: Dispatch<React.SetStateAction<number[]>>
}> = ({ dropFilter,specificationDefault, filterActive, setFilterActive }) => {

    const [
        // keyValue,
         ,setKeyValue] = useState<string[]>([])

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


    return <Flex align="center" justify="center" style={{ width: "100%", backgroundColor: "#EEEFF1" }}>
        <Flex vertical justify="center" gap={5} style={{ width: "95%", paddingTop: 50 }}>
            {/* {JSON.stringify(filterActive)} */}
            <Flex justify="space-between" align="center">
                <Title level={3}>Фильтры</Title>
                <Button onClick={dropFilter}>Убрать всё</Button>
            </Flex>
            {/* <RenderTag /> */}
            <Collapse
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
                }} />;
        </Flex>
    </Flex>
}

export default FilterGroup