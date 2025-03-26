import { NextRequest, NextResponse } from "next/server";
import mapping from "./mapping/mapping";
import getData from "../_api/getData";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import CityEnToRu from "@/shared/constant/city";

export async function GET(request: NextRequest): Promise<Response> {
  const cityEn = request.nextUrl.searchParams.get('city');

   // Пресутсвуют ли обязательные параметры
   if (!cityEn) {
    return NextResponse.json(
      {
        message: 'Некорректные параметры',
      },
      { status: STATUS_CODE.BAD_REQUEST },
    );
  }

  if (!(cityEn in CityEnToRu)) {
    return NextResponse.json(
      {
        message: 'Некорректные параметры города',
      },
      { status: STATUS_CODE.BAD_REQUEST },
    );
  }

    try {
        const response = await getData(cityEn);
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

