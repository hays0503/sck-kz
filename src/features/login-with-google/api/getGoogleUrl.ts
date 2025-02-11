// Получить ссылку для авторизации через Google.

export type GetGoogleUrl = () => Promise<{
  url:string
}>;

const getGoogleUrl: GetGoogleUrl = async () => {
  return await fetch("/auth_api/v1/auth_user/login/google", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Host":"http://localhost:3000"
    },
  }).then((response) => response.json());
};
export default getGoogleUrl