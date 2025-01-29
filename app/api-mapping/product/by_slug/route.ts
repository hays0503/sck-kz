import { NextRequest, NextResponse } from "next/server";
import getProductBySlug from "./api/getProductBySlug";
import mapping from "./mapping/mapping";
import { rawProductsTypeV2 } from "../_type/rawProductTypeV2";
import CityEnToRu from "@/shared/constant/city";



export async function GET(request: NextRequest) {

    const slug = request.nextUrl.searchParams.get("slug");
    const city = request.nextUrl.searchParams.get("city");

    if (!slug || !city) {
            return NextResponse.json({
                message: "Некорректные параметры",
            }, { status: 400 });
    }

    const cityRu = CityEnToRu[city as string];

    try {
        const response = await getProductBySlug(slug) as rawProductsTypeV2;
        const mappedData = await mapping(response, cityRu as string,city as string);
        if (response) {
            return NextResponse.json(mappedData,{
                status: 200
            });
        }
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе продукта",
        }, { status: 500 });
    }

}