import { 
  createSearchParamsCache,
  parseAsInteger
 } from "nuqs/server";

const paginationParsers = {
  page: parseAsInteger.withDefault(1),
};

export const searchParamsCache = createSearchParamsCache(
  paginationParsers);
