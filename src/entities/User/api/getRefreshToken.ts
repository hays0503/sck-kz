// Запросить обновление ключа доступа

export type ResponseRefreshToken = {
  readonly expiresAt?: Date;
  readonly issuedAt?: Date;
  readonly revoked?: boolean;
  readonly token?: string;
  readonly tokenType?: string;
  readonly userID?: string;
  readonly detail?: string;
};

export type GetRefreshToken = (
  refreshToken: string
) => Promise<ResponseRefreshToken>;

const getRefreshToken: GetRefreshToken = async (refreshToken) => {
  return await fetch("/auth_api/v1/token/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((response) => response.json());
};

export default getRefreshToken;