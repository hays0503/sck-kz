import { TOrder } from "@/shared/types/orderHistory";
import { Dispatch } from "react";

const GetOrders = async (
  refreshToken: string,
  setOrders: Dispatch<TOrder[]>,
  setError: Dispatch<string | null>,
) => {
  try {
    const fetchAccessToken = await fetch(`/auth_api/v2/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (fetchAccessToken.status !== 201) {
      const errText = await fetchAccessToken.text();
      throw new Error(errText);
    }

    const tokenResponse = await fetchAccessToken.json();

    const getHistory = await fetch('/basket_api/v2/order/by_access_t/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-token': tokenResponse?.access?.token,
      },
    });

    if (getHistory.status !== 200) {
      const errText = await getHistory.text();
      throw new Error(errText);
    }

    setOrders(await getHistory.json());
  } catch (err: unknown) {
    console.error(err);
    setError((err as Error).message);
  }
};

export default GetOrders;