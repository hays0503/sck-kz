"use client"
import { Checkbox } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dispatch, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export type FilterType = {
    key: string;
    value: {
        key: string;
        value: {
            disabled: boolean;
            productIds: number[];
        };
    }[]
}

interface FilterValueCheckBoxProps {
    keyString: string,
    disabled: boolean,
    productIds: number[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterActive: number[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilterActive: Dispatch<React.SetStateAction<number[]>>,
    setKeyValue: Dispatch<React.SetStateAction<string[]>>
}

const FilterValueCheckBox: React.FC<FilterValueCheckBoxProps> = ({ keyString, disabled, productIds,filterActive, setFilterActive, setKeyValue }) => {
    const [checked, setChecked] = useState(false);
    const debounced = useDebounceCallback(setFilterActive, 2000)
    const onChange = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked)
        if (e.target.checked) {
            debounced((prev:number[])=>Array.from(new Set([...prev,...productIds])));
            setKeyValue((prev:string[])=>[...prev,keyString])
        }else{
            debounced((prev:number[])=>prev.filter((item:number)=>!productIds.includes(item)));
            setKeyValue((prev:string[])=>prev.filter((item:string)=>item!==keyString))
        }
    }
    useEffect(() => {
        if(filterActive.length===0){
            setChecked(false)
        }
    },[filterActive])
    return <Checkbox disabled={disabled} checked={checked} onChange={onChange} >
        {keyString} - ({productIds.length})
    </Checkbox>
}
export default FilterValueCheckBox