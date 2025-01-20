import { NextResponse } from "next/server";
import mapping from "./mapping/mapping";
import getData from "../_api/getData";


export async function GET(): Promise<Response> {
    try {
        const response = await getData();
        if(!response) return NextResponse.json({
            message: "Ошибка в запросе категорий - категорий нет",
        }, { status: 500 });
        const mappedData = mapping(response);
        return NextResponse.json(mappedData, { status: 200 });
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе категорий",
        }, { status: 500 });
    }
};

