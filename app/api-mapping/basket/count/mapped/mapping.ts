import { MappedCountType } from "../type/MappedCountType"
import { rawBasketItemType, rawBasketType } from "../../_type/rawBasketType"


const mapping = (data:rawBasketType) => {
    const count:MappedCountType = {count: 
        data?.basket_items?.reduce(
            (acc:number, item:rawBasketItemType) => 
            acc + item.count, 0) ?? 0
        };
    return {
        results:count
    }
}

export default mapping