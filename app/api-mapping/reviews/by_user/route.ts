import { NextRequest, NextResponse } from 'next/server';
import { getReviewsByUser } from './api';

export async function GET(request: NextRequest) {
  const userUUID = request.nextUrl.searchParams.get('user_id');
  console.log('userUUID', userUUID);
  if (!userUUID) {
    return NextResponse.json(
      {
        message: 'Некорректные параметры userUUID',
      },
      { status: 400 },
    );
  }

  const response = await getReviewsByUser(userUUID);

  return NextResponse.json(response, {
    status: response.statusCode,
  });
}
