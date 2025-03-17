// Получаем информацию о пользователе

import { UserInfo } from "@/shared/types/user";

export type ResponseUserInfo = UserInfo;

export type GetUserInfo = (
  token: string
) => Promise<{ statusCode: number; data: ResponseUserInfo | null }>;

const getUserInfo: GetUserInfo = async (token) => {
  const response = await fetch("/auth_api/v2/user/info/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (response.ok) {
    return {
      statusCode: response.status,
      data: await response.json(),
    };
  } else {
    return {
      statusCode: response.status,
      data: null,
    };
  }
};

export default getUserInfo;
