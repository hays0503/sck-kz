import { UrlApiWithDomainV2 } from '@/shared/constant/url';
import { NextRequest } from 'next/server';

import CityEnToRu from '@/shared/constant/city';
import { STATUS_CODE } from '@/shared/constant/statusCode';
import { NextResponse } from 'next/server';
import { PRODUCT } from '@/shared/constant/product';
import { checkOrderByType } from '../by_populates';
import mapping from '../_mapping/mapping';
import { rawResult } from '../by_populates/type/rawTypePopulates';

export async function GET(request: NextRequest): Promise<Response> {
  const ids = request.nextUrl.searchParams.get('ids');
  const orderBy = request.nextUrl.searchParams.get('order');
  const cityEn = request.nextUrl.searchParams.get('city');
  const page = request.nextUrl.searchParams.get('page');

  // Поверка на корректность orderBy
  const isCorrectOrderBy = !orderBy || checkOrderByType(orderBy);

  // Пресутсвуют ли обязательные параметры
  if (!isCorrectOrderBy || !cityEn || !page || !ids) {
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

  const cityRu: string = (CityEnToRu[cityEn] as string) ?? 'Караганда';
  const offset = PRODUCT.PRODUCT_PER_PAGE * (parseInt(page) - 1);
  let url = `${UrlApiWithDomainV2.getProducts}filter_by_ids/?offset=${offset}&limit=${PRODUCT.PRODUCT_PER_PAGE}&city=${cityRu}&ids=${ids}`;

  if (orderBy !== 'none_sort') {
    url = `${url}&ordering=${orderBy}`;
    
  }

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Данные кешируются на 60 секунд
  });

  if (response.ok) {
    let data = (await response.json()) as {
      count: number;
      results: rawResult[];
    };

    if (orderBy == 'none_sort') {
      const idsNumber: number[] = ids.split(',').map((i) => Number(i));
      data = {
        count: data.count,
        results: idsNumber
          .map((i) => data.results.find((a) => a.id == i))
          .filter((a) => a !== undefined),
      };
    }

    const mappedData = mapping(data.count, data.results, cityRu);
    // Установите заголовки для клиентского кеширования
    const headers = new Headers();
    headers.set('Cache-Control', 'public, max-age=60');

    return NextResponse.json(mappedData, { status: 200, headers });
  }

  return NextResponse.json(
    {
      message: 'Произошла ошибка',
    },
    { status: 500 },
  );
}
