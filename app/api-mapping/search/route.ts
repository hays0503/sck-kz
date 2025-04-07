import GetFilterBySearchText from "@/features/new-product-filter/model/getFilterBySearchText";
import { FilterType } from "@/features/new-product-filter/ui/SubModule/FilterValueCheckBox";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const queryText = request.nextUrl.searchParams.get("queryText");

  if (!queryText) {
    return NextResponse.json(
      {
        result: {filterData:[], productIds:[]},
        message: "Некорректные параметры",
      },
      { status: STATUS_CODE.BAD_REQUEST }
    );
  }

  const classRunner = new GetFilterBySearchText(queryText);

  let productIds: number[] = [];
  try {
    productIds = await classRunner.getProductIdsBySearchText(queryText);
  } catch {
    console.log("Ошибка при запросе id продуктов из категорий");
  }

  let SpecificationsInfo;
  try {
    if (productIds?.length > 0) {
      SpecificationsInfo = await classRunner.getRawSpecsByProductIdsAndParse(
        productIds
      );
    }
  } catch {
    console.log("Ошибка при запросе спецификации по id продуктам");
  }

  if (SpecificationsInfo) {
    const filterData = classRunner.specificationsMapToObject(
      SpecificationsInfo
    ) as unknown as FilterType[];
    return NextResponse.json({ result: {filterData, productIds} });
  }

  return NextResponse.json(
    {
      message: "Ошибка в запросе категорий",
    },
    { status: 500 }
  );
}
