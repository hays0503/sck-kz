import { NextRequest, NextResponse } from "next/server";
import getDataByUuid from "../_api/getDataByUuid";
import CityEnToRu from "@/shared/constant/city";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import addProduct from "./model/add-product";
import deserializationToRawBasket from "./model/deserialization";
import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { revalidateTag } from "next/cache";
import { rawBasketType } from "../_type/rawBasketType";
import mapping from "../get-products/mapper/mapper";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const uuid = request.nextUrl.searchParams.get("uuid");
    const cityEn = request.nextUrl.searchParams.get("city");
    const prodId = request.nextUrl.searchParams.get("prod_id");
    if (!uuid || !cityEn) {
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

        const mappedData = await mapping(response as rawBasketType,cityEn);

        const newBasket = addProduct(mappedData,parseInt(prodId as string));
        const deserializationToRawBasketData = deserializationToRawBasket(newBasket,uuid);
        
        try {
            const requestBody = JSON.stringify(deserializationToRawBasketData);
            const url = `${UrlApiWithDomainV2.getBasket}update_or_create/`;
            const response = await fetch(url, {
                method: "POST",
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
            message: "Ошибка в изменении корзины",
        }, { status: 500 });
    }
}
