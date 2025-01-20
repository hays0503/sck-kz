import { NextRequest, NextResponse } from "next/server";
import getCategoryBySlug from "./api/getCategoryBySlug";
import mapping from "./mapping/mapping";


export async function GET(request: NextRequest): Promise<Response> {
    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
        return NextResponse.json({
            message: "Некорректные параметры",
        }, { status: 400 });
    }
    try {
        const response = await getCategoryBySlug(slug);
        if (!response) {
            return NextResponse.json({
                message: "Ошибка в запросе категорий - категорий нет",
            }, { status: 500 });
        }
        const mappedData = mapping(response);
        return NextResponse.json(mappedData, { status: 200 });
    } catch {
        return NextResponse.json({
            message: "Ошибка в запросе категорий",
        }, { status: 500 });
    }
}