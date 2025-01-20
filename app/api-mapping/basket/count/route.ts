import { NextRequest, NextResponse } from "next/server";
import getDataByUuid from "../_api/getDataByUuid";
import mapping from "./mapped/mapping";

export async function GET(request: NextRequest): Promise<Response> {
    const uuid = request.nextUrl.searchParams.get("uuid");
    if (!uuid) {
        return NextResponse.json({
            message: "Некорректные параметры",
        }, { status: 400 });
    }
    try {
        const response = await getDataByUuid(uuid);
        if (!response) {
            return NextResponse.json(null, { status: 500 });
        }
        const mappedData = mapping(response);
        return NextResponse.json(mappedData, { status: 200 });
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе категорий",
        }, { status: 500 });
    }

};

