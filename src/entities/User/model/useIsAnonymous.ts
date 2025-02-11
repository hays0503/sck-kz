import { useLocalStorage, useReadLocalStorage } from "@undefined/usehooks-ts";
import { useEffect, useState, useMemo } from "react";
import { getRefreshToken } from "../api";

const verifyAuth = async (token: string) => {
  try {
    const { statusCode, data } = await getRefreshToken(token);
    if (statusCode === 200 || statusCode === 201) {
      return {
        isVerified: true,
        data,
      };
    }
    return { isVerified: false };
  } catch (error) {
    console.error("verifyAuth =>", error);
    return { isVerified: false };
  }
};

type LocalStorageToken = { token: string } | null;

// Локальный кэш для мемоизации результатов
const authCache = new Map<
  string,
  {
    isVerified: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
  }
>();

const useIsAnonymous = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const refreshToken = useReadLocalStorage<LocalStorageToken>("refreshToken");
  const [, setAccessToken] = useLocalStorage<LocalStorageToken>(
    "accessToken",
    null
  );

  // Мемоизируем `refreshToken.token`
  const memoizedToken = useMemo(() => refreshToken?.token, [refreshToken]);

  useEffect(() => {
    if (!memoizedToken) {
      setIsAnonymous(true);
      return;
    }

    let isMounted = true;

    const checkAuth = async () => {
      // Проверяем кэш
      if (authCache.has(memoizedToken)) {
        const cachedResponse = authCache.get(memoizedToken);
        if (cachedResponse?.isVerified && cachedResponse?.data) {
          setAccessToken(cachedResponse.data.access);
          setIsAnonymous(false);
        } else {
          setIsAnonymous(true);
        }
        return;
      }

      // Выполняем запрос, если кэша нет
      const response = await verifyAuth(memoizedToken);

      if (isMounted && response) {
        authCache.set(memoizedToken, response); // Сохраняем результат в кэш
        if (response.isVerified && response.data) {
          setAccessToken(response.data.access);
          setIsAnonymous(false);
        } else {
          setIsAnonymous(true);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false; // предотвращает обновление состояния после размонтирования
    };
  }, [memoizedToken, setAccessToken]);

  return isAnonymous;
};

export default useIsAnonymous;
