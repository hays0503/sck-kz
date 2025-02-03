import { NextRequest, NextResponse } from "next/server";
import getProductBySlug from "./api/getProductBySlug";
import mapping from "./mapping/mapping";
import { rawProductsTypeV2 } from "../_type/rawProductTypeV2";
import CityEnToRu from "@/shared/constant/city";
import { STATUS_CODE } from "@/shared/constant/statusCode";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const city = request.nextUrl.searchParams.get("city");

  if (!slug || !city) {
    return NextResponse.json(
      {
        message: "Некорректные параметры",
      },
      { status: 400 }
    );
  }

  const cityRu = CityEnToRu[city as string];

  let response = {data:{}, statusCode: 0};
  try {
    response = (await getProductBySlug(slug));
    if(response.statusCode === STATUS_CODE.OK){
        try {
            const mappedData = await mapping(
              response.data as rawProductsTypeV2,
              cityRu as string,
              city as string
            );
            if (response) {
              return NextResponse.json(mappedData, {
                status: STATUS_CODE.OK,
              });
            }
          } catch {
            return NextResponse.json({
              message: "Ошибка при обработке",
            });
          }
    }
    return NextResponse.json(
        {
          message: "Ошибка в запросе продукта c бекенда",
          details: response
        },
        { status: STATUS_CODE.ERROR }
      );
  } catch {
    return NextResponse.json(
      {
        message: "Ошибка в запросе продукта c бекенда",
        details: "При передача данных"
      },
      { status: STATUS_CODE.ERROR }
    );
  }
}
