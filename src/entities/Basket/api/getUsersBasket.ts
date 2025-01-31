import { UrlApiV1 } from "@/shared/constant/url";

/**
 * @deprecated Устаревший подход
 */
const getUsersBasket = async (accessToken: string) => {
  const url = `${UrlApiV1.getBasketApi}/by_access_t`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'access-token': accessToken,
    },
  }).then((response) => response.json());
};
export default getUsersBasket;