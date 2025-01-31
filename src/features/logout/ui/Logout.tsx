"use client";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { useLocalStorage } from "@undefined/usehooks-ts";

const { Title } = Typography;

export default function Logout() {
  const currentCity = useGetCityParams();
  const router = useRouter();
  const [,,removeAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [,,removeRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const [,,removeUuid] = useLocalStorage("uuid_id", { token: "" });
  return (
    <Flex
      vertical={true}
      gap={10}
      justify="center"
      align="center"
      style={{ width: "100%" }}
    >
      <Title>Вы действительно хотите выйти?</Title>
      <Flex gap={10}>
        <Button
          type="primary"
          onClick={() => {
            // Отчистка локал стора
            removeAccessToken();
            removeRefreshToken();
            removeUuid();
            router.replace(`/city/${currentCity}/main`);
          }}
        >
          Да
        </Button>
        <Button
          type="primary"
          onClick={() => {
            // Возврат на образную страницу
            router.back();
          }}
        >
          Нет
        </Button>
      </Flex>
    </Flex>
  );
}
