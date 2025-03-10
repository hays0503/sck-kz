import { useEffect, useState, useMemo, useCallback } from "react";
import useIsAnonymous from "./useIsAnonymous";
import { UserInfo } from "@/shared/types/user";
import { getUserInfo } from "../api";
import { useReadLocalStorage } from "@undefined/usehooks-ts";

type ResponseUserInfo = {
  isAnonymous: boolean;
  info: UserInfo | null;
  reFetchUserInfo: () => Promise<void>;
};

const useGetUserInfo = (): ResponseUserInfo => {
  const isAnonymous = useIsAnonymous();
  const accessToken = useReadLocalStorage<{ token: string } | null>(
    "accessToken"
  );
  const [info, setInfo] = useState<UserInfo | null>(null);

  const reFetchUserInfo = useCallback(async () => {
    console.log("Попытка перезапросить информацию о пользователе");
    if (isAnonymous || !accessToken?.token) {
      console.log("Пользователь анонимен или токен отсутствует");
      setInfo(null);
    } else {
      const userInfo = await getUserInfo(accessToken.token);
      if (userInfo.statusCode === 200) {
        console.log("Успешно получена информация о пользователе");
        setInfo(userInfo.data);
      } else {
        console.log("Не удалось получить информацию о пользователе");
      }
    }
  }, [isAnonymous, accessToken]);

  useEffect(() => {
    if (isAnonymous || !accessToken?.token) {
      setInfo(null);
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(accessToken.token);
        if (isMounted && userInfo.statusCode === 200) {
          setInfo(userInfo.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        if (isMounted) setInfo(null);
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false; // предотвращает обновление состояния после размонтирования
    };
  }, [isAnonymous, accessToken]);

  // Мемоизация результатов
  // const memoizedInfo = useMemo(
  //   () => ({ isAnonymous, info, reFetchUserInfo }),
  //   [info, isAnonymous, reFetchUserInfo]
  // );

  return { isAnonymous, info, reFetchUserInfo };
};

export default useGetUserInfo;
