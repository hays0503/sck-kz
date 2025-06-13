export type GetSmsAuthTokenResponse = {
  readonly access: {
    readonly token: string;
    readonly user_id: string;
  };
  readonly refresh: {
    readonly token: string;
    readonly user_id: string;
  };
};

type GetSmsAuthToken = (
  code: string,
  phone_number_id: string,
) => Promise<{ data: GetSmsAuthTokenResponse; statusCode: number }>;

const getSmsAuthToken: GetSmsAuthToken = async (code, phone_number_id) => {
  console.log(code, phone_number_id);
  const data = {
    access: {
      token: '',
      user_id: '',
    },
    refresh: {
      token: '',
      user_id: '',
    },
  };
  const statusCode = 200;

  return Promise.resolve({ data, statusCode });
  // const url = `/auth_api/v2/auth_phone/auth/phone`;
  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     code: code,
  //     phone_number_id: phone_number_id,
  //   }),
  // });

  // if (response.ok) {
  //   return {
  //     statusCode: response.status,
  //     data: await response.json(),
  //   }
  // }else{
  //   return {
  //     statusCode: response.status,
  //     data: await response.json(),
  //   }
  // }
};

export default getSmsAuthToken;
