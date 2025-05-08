import { 
  createSearchParamsCache,
  parseAsInteger,
  parseAsStringEnum
 } from "nuqs/server";


 enum orderByType {
  avg_rating = "avg_rating",
  "-avg_rating" = "-avg_rating",
  stocks__price = "stocks__price",
  "-stocks__price" = "-stocks__price",
}

const paginationParsers = {
  page: parseAsInteger.withDefault(1),
  order: parseAsStringEnum(Object.values(orderByType)).withDefault(
    orderByType.stocks__price
  ),
};

export const searchParamsCache = createSearchParamsCache(
  paginationParsers);
