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
  try {
    const response = await fetch(
      `http://185.100.67.246:9876/auth_api/v1/wishlist/add_wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_uuid: uuid,
          product_id: prodId,
          user_id: userId,
          is_active: true,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 500,
          message: "Произошла ошибка при добавлении в избранное",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Успешно добавлено в избранное",
      },
      { status: 200 }
    );
  } catch {}
}
