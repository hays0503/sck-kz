// Получаем информацию о пользователе

import { UserInfo } from "@/shared/types/user";

export type ResponseUserInfo = UserInfo


export type GetUserInfo = (token: string) => Promise<ResponseUserInfo>;

const getUserInfo: GetUserInfo = async (token) => {
  return await fetch("/auth_api/v1/user/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token: token }),
  }).then((response) => response.json());
};

export default getUserInfo;
