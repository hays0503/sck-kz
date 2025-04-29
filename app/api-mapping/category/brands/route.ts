import { NextRequest, NextResponse } from 'next/server';

import CityEnToRu from '@/shared/constant/city';
import { STATUS_CODE } from '@/shared/constant/statusCode';
import getBrandsBySlugCategory, { BrandDataRaw } from './api/getBrandsBySlugCategory';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const city = request.nextUrl.searchParams.get('city');

  if (!slug || !city) {
    return NextResponse.json(
      {
        message: 'Некорректные параметры',
      },
      { status: 400 },
    );
  }

  const cityRu = CityEnToRu[city as string];

  let response = {
    results: [] as BrandDataRaw[],
    statusCode: 500,
  };
  try {
    response = await getBrandsBySlugCategory(slug, cityRu);
    if (response.statusCode === STATUS_CODE.OK) {
      try {
        if (response) {
          return NextResponse.json(response, {
            status: STATUS_CODE.OK,
          });
        }
      } catch (error) {
        return NextResponse.json({
          message: 'Ошибка при обработке',
          detail: error,
        });
      }
    }
    return NextResponse.json(
      {
        message: 'Ошибка в запросе брендов c бекенда',
        details: response,
      },
      { status: STATUS_CODE.ERROR },
    );
  } catch {
    return NextResponse.json(
      {
        message: 'Ошибка в запросе брендов c бекенда',
        details: 'При передача данных',
      },
      { status: STATUS_CODE.ERROR },
    );
  }
}
