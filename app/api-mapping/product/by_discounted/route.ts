import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { NextRequest } from "next/server";
import mapping from "../_mapping/mapping";
import CityEnToRu from "@/shared/constant/city";
import { checkOrderByType } from "./type/checkType";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import { NextResponse } from "next/server";
import { PRODUCT } from "@/shared/constant/product";
import { rawDiscountedProducts } from "./type/rawDiscounted";



export async function GET(request: NextRequest): Promise<Response> {
  const orderBy = request.nextUrl.searchParams.get("order");
  const cityEn = request.nextUrl.searchParams.get("city");
  const page = request.nextUrl.searchParams.get("page");

  // Поверка на корректность orderBy   
  const isCorrectOrderBy = !orderBy || checkOrderByType(orderBy);

  // Пресутсвуют ли обязательные параметры   
  if (!isCorrectOrderBy || !cityEn || !page) {
    return NextResponse.json({
      message: "Некорректные параметры",
    }, { status: STATUS_CODE.BAD_REQUEST });
  }

  if(!(cityEn in CityEnToRu)){

    return NextResponse.json({
      message: "Некорректные параметры города",
    }, { status: STATUS_CODE.BAD_REQUEST });
  }

  const cityRu:string = CityEnToRu[cityEn] as string ?? "Караганда";
  const offset = PRODUCT.PRODUCT_PER_PAGE * (parseInt(page)-1);
  let url
  if(orderBy !== "none_sort"){
    url = `${UrlApiWithDomainV2.getProductsByDiscounted}?ordering=${orderBy}&offset=${offset}&limit=${PRODUCT.PRODUCT_PER_PAGE}&city=${cityRu}`;
  }else{
    url = `${UrlApiWithDomainV2.getProductsByDiscounted}?offset=${offset}&limit=${PRODUCT.PRODUCT_PER_PAGE}&city=${cityRu}`
  }

  const response = await fetch(url,{
    next: { revalidate: 60 }, // Данные кешируются на 60 секунд
  });

  if (response.ok) {
    const data = await response.json() as rawDiscountedProducts;
    const mappedData = mapping(data.count,data.results.prod, cityRu);
    // Установите заголовки для клиентского кеширования
    const headers = new Headers();
    headers.set("Cache-Control", "public, max-age=60");

    return NextResponse.json(mappedData, { status: 200, headers });
  }

  return NextResponse.json({
    message: "Произошла ошибка",
  }, { status: 500 });
}


