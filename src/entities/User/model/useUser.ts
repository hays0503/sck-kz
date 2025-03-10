import { useMemo } from "react";
import { ResponseUserInfo } from "../api/getUserInfo";
import useGetUserInfo from "./useGetUserInfo";
// import HyperDX from "@hyperdx/browser";
// import { headers } from 'next/headers';
// import { UserInfo } from "@/shared/types/user";

type HookUseUser = () => {
  isAnonymous: boolean;
  info: ResponseUserInfo | null;
  
};


const useUser: HookUseUser = () => {
  
  const { isAnonymous, info,reFetchUserInfo } = useGetUserInfo();

  // Мемоизируем возвращаемый объект
  const memoizedUser = useMemo(
    () => ({
      isAnonymous,
      info,
      reFetchUserInfo
    }),
    [isAnonymous, info, reFetchUserInfo]
  );

  return memoizedUser;
};

export default useUser;
