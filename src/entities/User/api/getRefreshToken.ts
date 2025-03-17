export type ResponseRefreshToken = {
  readonly access: {
    readonly expires_at: Date;
    readonly issued_at: Date;
    readonly revoked: boolean;
    readonly token: string;
    readonly token_type: string;
    readonly user_id: string;
  };
};

export type GetRefreshToken = (
  refreshToken: string
) => Promise<{ statusCode: number; data: ResponseRefreshToken | null }>;

const getRefreshToken: GetRefreshToken = async (refreshToken) => {
  const response = await fetch("/auth_api/v2/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();

    // Если сервер возвращает даты в виде строк, их можно преобразовать:
    const parsedData: ResponseRefreshToken = {
      ...data,
      issued_at: new Date(data.access.issued_at),
      expires_at: new Date(data.access.expires_at),
    };

    return {
      statusCode: response.status,
      data: parsedData,
    };
  } else {
    return {
      statusCode: response.status,
      data: null,
    };
  }
};

export default getRefreshToken;
