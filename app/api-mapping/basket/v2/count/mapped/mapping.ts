import { MappedCountType } from "../type/MappedCountType"
import { rawBasketType } from "../../_type/rawBasketType"


const mapping = (data:rawBasketType) => {
    const count:MappedCountType = {count: 
        data?.basket_items?.length ?? 0
        };
    return {
        results:count
    }
}

export default mapping