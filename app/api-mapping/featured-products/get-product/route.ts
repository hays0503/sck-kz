import { NextRequest, NextResponse } from "next/server";
import mapping from "./mapping/mapping";

export async function GET(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get("uuid");
  const userId = request.nextUrl.searchParams.get("user_id"); // Опционально
  if (!uuid) {
    return NextResponse.json(
      {
        message: "Некорректные параметры",
      },
      { status: 400 }
    );
  }

  let url = `http://185.100.67.246:9876/auth_api/v1/wishlist/by_client_uuid_or_user_id`;

  if (userId && uuid){
    url += `/?user_id=${userId}&client_uuid=${uuid}`;
  }else{
    if (userId){
        url += `/?user_id=${userId}`;
    }
    if (uuid){
        url += `/?client_uuid=${uuid}`;
    }
  }


  try {
    const response = await fetch(url,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 500,
          message: "Произошла ошибка в запросе",
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const mappedData = mapping(data);
    return NextResponse.json(
      {
        status: 200,
        data: mappedData,
        message: "Успешно",
      },
      { status: 200 }
    );
  } catch {}
}
