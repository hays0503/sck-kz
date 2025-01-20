"use client";

import { Button, Collapse, Flex, Tag, Typography } from "antd";
import FilterGroupCheckBox from "./FilterGroupCheckBox";
import { Dispatch, useState } from "react";
import { FilterType } from "./FilterValueCheckBox";
import type { CollapseProps } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const { Title } = Typography

const FilterGroup: React.FC<{
    specificationDefault: FilterType[],
    filterActive: number[], setFilterActive: Dispatch<React.SetStateAction<number[]>>
}> = ({ specificationDefault, filterActive, setFilterActive }) => {

    const [keyValue, setKeyValue] = useState<string[]>([])

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

    const RenderTag = () => {
        return <Flex style={{
            width: "calc(100%)",
            height: "30px",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap"
        }}>
            {
                keyValue.map((key) => {
                    return <Tag
                        key={`${key}`}
                        style={{ fontSize: "12px", marginRight: "5px", marginLeft: "5px" }}
                        closable
                        onClose={() => {
                            setKeyValue(keyValue.filter((i) => i !== key))
                            const _find = specificationDefault.find((item: FilterType) => {
                                return item.value.find((i: { key: string; }) => i.key === key)
                            });
                            console.log(_find)
                            if (_find) {
                                // console.log(_find)
                                const find = _find.value.find((i: { key: string; }) => i.key === key)
                                if  (find) {
                                    const productIds = find.value.productIds;
                                    if (productIds) {
                                        const newFilterActive = filterActive.filter((item) => !productIds.includes(item));
                                        setFilterActive(newFilterActive)
                                    }
                                }

                            }

                        }}
                    >
                        {key}
                    </Tag>
                })
            }

        </Flex>
    }

    return <Flex align="center" justify="center" style={{ width: "100%", backgroundColor: "#EEEFF1" }}>
        <Flex vertical justify="center" gap={5} style={{ width: "95%", paddingTop: 50 }}>
            {/* {JSON.stringify(filterActive)} */}
            <Flex justify="space-between" align="center">
                <Title level={3}>Фильтры</Title>
                <Button onClick={() => setFilterActive([])}>Убрать всё</Button>
            </Flex>
            <RenderTag />
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