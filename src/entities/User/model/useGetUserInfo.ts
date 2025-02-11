import { useEffect, useState, useMemo } from "react";
import useIsAnonymous from "./useIsAnonymous";
import { UserInfo } from "@/shared/types/user";
import { getUserInfo } from "../api";
import { useReadLocalStorage } from "@undefined/usehooks-ts";

type ResponseUserInfo = { isAnonymous: boolean; info: UserInfo|null };

const useGetUserInfo = (): ResponseUserInfo => {
  const isAnonymous = useIsAnonymous();
  const accessToken = useReadLocalStorage<{ token: string } | null>(
    "accessToken"
  );
  const [info, setInfo] = useState<UserInfo | null>(null);

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
  const memoizedInfo = useMemo(
    () => ({ isAnonymous, info }),
    [info, isAnonymous]
  );

  return memoizedInfo;
};

export default useGetUserInfo;
