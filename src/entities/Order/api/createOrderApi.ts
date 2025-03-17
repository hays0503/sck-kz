
import { UrlApiV2 } from "@/shared/constant/url";
import { IOrderCreate } from "@/shared/types/order";




type CreateOrderApiResponse = {
  data: string | { detail: string };
  statusCode: number;
  statusMessage: string;
};

const createOrderApi = async (
  order: IOrderCreate
): Promise<CreateOrderApiResponse> => {
  try {
    const response = await fetch(UrlApiV2.getOrder, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(order),
    });

    const statusCode = response.status;
    const statusMessage = response.statusText;

    let data: string | { detail: string };
    try {
      data = await response.json();
    } catch {
      data = { detail: "Ошибка при разборе ответа от сервера ( при создании заказа )" };
    }

    return { data, statusCode, statusMessage };
  } catch (error) {
    console.error("Случилась ошибка при создании заказа:", error);
    return {
      data: { detail: "Случилась ошибка при создании заказа" },
      statusCode: 400,
      statusMessage: "Случилась ошибка при создании заказа",
    };
  }
};

export default createOrderApi;

