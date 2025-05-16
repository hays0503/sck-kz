
interface getProductByDiscountedProps {
    city:string,
    orderBy:string,
    page:number
}

const getProductByDiscounted = async ({
    city,
    orderBy,
    page
}:getProductByDiscountedProps) => {

    const isCorrectOrderBy =
    !orderBy ||
    ['avg_rating', '-avg_rating', 'stocks__price', '-stocks__price', 'none_sort'].includes(
      orderBy,
    );

    // Пресутсвуют ли обязательные параметры
    if (!isCorrectOrderBy || !city || !page) {
      console.error(
        'getProductByDiscounted error',
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
    const url = `${process.env.HOST_URL}${host_port}/api-mapping/product/by_discounted/?order=${orderBy}&page=${page}&city=${city}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('getProductByDiscounted error', 'response', response);
      return {
        len: 0,
        results: [],
      };
    }

    return response.json();
}

export default getProductByDiscounted
