"use client";
import { useCallback, useEffect, useState } from "react";
import { getRefreshToken, getUserInfo } from "../api";
import { ResponseUserInfo } from "../api/getUserInfo";
import { useLocalStorage, useReadLocalStorage } from "@undefined/usehooks-ts";
import { ResponseRefreshToken } from "../api/getRefreshToken";

type Token = { token: string };

type useIsAnonymousFunc = () => boolean | undefined;

// Авторизован ли пользователь
const useIsAnonymous:useIsAnonymousFunc = () => {
  const [token, setToken] = useState("");
  const accessToken = useReadLocalStorage<Token>("accessToken");

  useEffect(() => {
    setToken(accessToken?.token??"");
  }, [accessToken?.token]);

  return token.length === 0;
};

const useUserInfo = () => {
  const [info, setInfo] = useState<ResponseUserInfo | null>(null);
  const [error, setError] = useState<boolean>(false);

  const [refreshToken, , removeRefreshToken] = useLocalStorage<Token>(
    "refreshToken",
    { token: "" }
  );
  const [accessToken, setAccessToken, removeAccessToken] =
    useLocalStorage<Token>("accessToken", { token: "" });

  const fetchRefreshToken = useCallback(async () => {
    try {
      if (refreshToken.token) {
        const refreshResponse: ResponseRefreshToken = await getRefreshToken(
          refreshToken.token
        );
        if (refreshResponse?.token) {
          setAccessToken({ token: refreshResponse.token });
          console.log("Токен обновлен");
          return refreshResponse;
        } else {
          console.log("Не удалось обновить токен");
          removeRefreshToken();
          removeAccessToken();
          setInfo(null);
          setError(true);
          return refreshResponse;
        }
      }
    } catch (error) {
      setError(true);
      console.error("Ошибка обновления токена", error);
      return undefined;
    }
  }, [
    refreshToken?.token,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
  ]);

  const userInfo = useCallback(async () => {
    try {
      if (accessToken.token) {
        const response = await getUserInfo(accessToken.token);
        // Проверка поведение токена
        if (response?.detail) {
          const tokenErrors = [
            "Token expired",
            "Signature verification failed",
            "Not enough segments",
            "Invalid crypto padding",
          ];
          if (tokenErrors.includes(response.detail)) {
            const responseTryRefresh = await fetchRefreshToken();
            if (responseTryRefresh?.token) {
              const responseTry = await getUserInfo(responseTryRefresh?.token);
              setInfo(responseTry);
            } else {
              console.log("Не вышло обновить токен");
            }
          }
        } else {
          setInfo(response);
          console.log("Пользователь вошел в систему", response);
        }
      } else {
        console.log("Пользователь не авторизован");
      }
    } catch (error) {
      setError(true);
      console.error("Ошибка при получении информации о пользователе", error);
    }
  }, [accessToken?.token, fetchRefreshToken]);

  useEffect(() => {
    userInfo();
    const interval = setInterval(() => {
      userInfo();
    },(1000 * 60))    
    return () => clearInterval(interval);
  }, []);

  return { info, error,accessToken };
};

// Custom hook for user logic
const useUser = () => {
  const { info, error,accessToken } = useUserInfo();

  return {
    useIsAnonymous,
    info,
    error,
    accessToken
  };
};

export default useUser;
