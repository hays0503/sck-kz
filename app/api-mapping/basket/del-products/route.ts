import CityEnToRu from "@/shared/constant/city";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import { NextRequest, NextResponse } from "next/server";
import getDataByUuid from "../_api/getDataByUuid";
import mapping from "../get-products/mapper/mapper";
import delProduct from "./model/del-product";
import deserializationToRawBasket from "./model/deserialization";
import { UrlApiWithDomainV1 } from "@/shared/constant/url";
import { revalidateTag } from "next/cache";


export async function POST(request: NextRequest): Promise<NextResponse> {
    const uuid = request.nextUrl.searchParams.get("uuid");
    const cityEn = request.nextUrl.searchParams.get("city");
    const prodIds = request.nextUrl.searchParams.get("prod_ids");

    const parseIds = prodIds?.split(",").map((id) => parseInt(id));

    if (!uuid || !cityEn || !parseIds || parseIds?.length<=0) {
        return NextResponse.json({
            message: "Некорректные параметры",
        }, { status: 400 });
    }

    if(!(cityEn in CityEnToRu)){

        return NextResponse.json({
          message: "Некорректные параметры города",
        }, { status: STATUS_CODE.BAD_REQUEST });
    }

    try {
        const response = await getDataByUuid(uuid);
        if (!response) {
            return NextResponse.json({
                message: "Корзина не найдена",
            }, { status: 500 });
        }
        const mappedData = mapping(response);
        const newBasket = delProduct(mappedData,parseIds);
        const deserializationToRawBasketData = deserializationToRawBasket(newBasket,uuid);
        
        try {
            const requestBody = JSON.stringify(deserializationToRawBasketData);
            const url = `${UrlApiWithDomainV1.getBasketApi}/${uuid}`;
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",                    
                },
                body: requestBody
            })
            if(!response.ok) {
                console.error("addProduct error", "response", response)
                return NextResponse.json({
                    message: `Ошибка в запросе изменения корзины response.ok false ${response}`,
                }, { status: 500 });
            }
            revalidateTag(`basket/${uuid}`);
            return NextResponse.json(deserializationToRawBasketData, { status: 200 });
        } catch (error) {
            return NextResponse.json({
                message: `Ошибка в запросе изменения корзины ${error}`,
            }, { status: 500 });
        }        
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе категорий",
        }, { status: 500 });
    }
}
