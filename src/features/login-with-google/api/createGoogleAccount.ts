// Создаём аккаунт через Google.

export type Tokens = {
  access: {
    token: string;
  };
  refresh: {
    token: string;
  };
};

export type CreateGoogleAccount = {
  (code: string): Promise<Tokens>;
};

const createGoogleAccount: CreateGoogleAccount = async (code) => {
  return await fetch(`http://${process.env.API_URL}${process.env.API_AUTH_PORT}/auth_api/v1/auth_user/auth/google?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  }).then((response) => response.json());
};

export default createGoogleAccount;