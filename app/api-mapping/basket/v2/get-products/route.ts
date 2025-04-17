import { NextRequest, NextResponse } from "next/server";
import getDataByUuid from "../_api/getDataByUuid";
import mapping from "./mapper/mapper";
import CityEnToRu from "@/shared/constant/city";
import { STATUS_CODE } from "@/shared/constant/statusCode";


export async function GET(request: NextRequest): Promise<Response> {
    const uuid = request.nextUrl.searchParams.get("uuid");
    const cityEn = request.nextUrl.searchParams.get("city");
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
        console.log("response", response);
        if (!response) {
            return NextResponse.json(null, { status: 200 });
        }
        const mappedData = await mapping(response,cityEn);
        return NextResponse.json(mappedData, { status: 200 });
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе категорий",
        }, { status: 500 });
    }

};

