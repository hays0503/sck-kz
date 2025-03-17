
import { UrlApiWithDomainV2 } from "@/shared/constant/url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const uuid = request.nextUrl.searchParams.get("uuid");
  const prodId = request.nextUrl.searchParams.get("product_id");
  const userId = request.nextUrl.searchParams.get("user_id"); // Опционально

  if (!uuid || !prodId) {
    return NextResponse.json(
      {
        message: "Некорректные параметры",
      },
      { status: 400 }
    );
  }

  let response = undefined;
  try {
    const body = {
      client_uuid: uuid,
      product_id: Number(prodId),
      user_id: userId,
      is_active: false,
    };
    const url = `${UrlApiWithDomainV2.getUser}wishlist/add_wishlist`;
    response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 500,
          message: "Произошла ошибка при удалении из избранного",
          details: await response.json(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Успешно удалено из избранного",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: 500,
        message: "Произошла ошибка при удалении из избранного, при отправке запроса",
      },
      { status: 500 }
    );
  }
}
