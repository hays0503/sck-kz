import { MappedPopularProductType } from 'api-mapping/product/by_populates';

interface getProductByCategoryProps {
  slug: string;
  city: string;
  orderBy: 'avg_rating' | '-avg_rating' | 'stocks__price' | '-stocks__price' | 'none_sort';
  page: number;
  brand?: string
}

export type getProductResult = {
  len: number;
  results: MappedPopularProductType[];
};

const getProductByCategory = async ({
  slug,
  city,
  orderBy,
  page,
  brand
}: getProductByCategoryProps): Promise<getProductResult> => {
  // Поверка на корректность orderBy
  const isCorrectOrderBy =
    !orderBy ||
    ['avg_rating', '-avg_rating', 'stocks__price', '-stocks__price', 'none_sort'].includes(
      orderBy,
    );

  // Пресутсвуют ли обязательные параметры
  if (!slug || !isCorrectOrderBy || !city || !page) {
    console.error(
      'getProductByCategory error',
      'isCorrectOrderBy',
      isCorrectOrderBy,
      'city',
      city,
      'page',
      page,
    );
    return {
      len: 0,
      results: [],
    };
  }

  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';
  let url = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_category/?category=${slug}&order=${orderBy}&page=${page}&city=${city}`;
  if (brand) {
    url += `&brand=${brand}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('getProductByCategory error', 'response', response);
    return {
      len: 0,
      results: [],
    };
  }

  return response.json();
};

export default getProductByCategory;
