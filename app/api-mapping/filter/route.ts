import GetFilterCategory from "@/features/new-product-filter/model/getFilter";
import { FilterType } from "@/features/new-product-filter/ui/SubModule/FilterValueCheckBox";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const slug = request.nextUrl.searchParams.get("category");

  if (!slug) {
    return NextResponse.json(
      {
        result: [],
        message: "Некорректные параметры",
      },
      { status: STATUS_CODE.BAD_REQUEST }
    );
  }

  const classRunner = new GetFilterCategory(slug);

  let productIds: number[] = [];
  try {
    productIds = await classRunner.getProductIdsByCategory(slug);
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
    return NextResponse.json({ result: filterData });
  }

  return NextResponse.json(
    {
      message: "Ошибка в запросе категорий",
    },
    { status: 500 }
  );
}
