export type GetSmsAuthTokenResponse = {
  readonly access: {
    readonly token: string;
  };
  readonly refresh: {
    readonly token: string;
  };
};

type GetSmsAuthToken = (code: string, phone_number_id: string) => Promise<GetSmsAuthTokenResponse>;

const getSmsAuthToken: GetSmsAuthToken = async(code, phone_number_id) => {
  const url = `/auth_api/v1/auth_user/auth/phone?code=${code}&phone_number_id=${phone_number_id}`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response:Response) => {
    if(response.status !== 201) {
      return {
        detail: response.statusText
      }
    }
    return response.json();
  });
};

export default getSmsAuthToken;
