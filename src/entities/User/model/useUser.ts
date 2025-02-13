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

// const setTelemetry = async (
//   info: UserInfo | null,
//   uuid: string | null | undefined
// ) => {
//   // const UserHeaders = (await headers()).get('user-agent');
//   const userInfo = {
//     userId: info?.id,
//     userEmail: info?.email,
//     userName: info?.username,
//     uuid: uuid,
//     // userAgent: UserHeaders,
//   } as Record<
//     "userId" | "userEmail" | "userName" | "teamName" | "teamId" | string,
//     string
//   >;
//   // alert(JSON.stringify(userInfo));
//   HyperDX.setGlobalAttributes(userInfo);
//   HyperDX.addAction("login", userInfo);
// };

const useUser: HookUseUser = () => {
  const { isAnonymous, info } = useGetUserInfo();
  // const uuid = useReadLocalStorage<string | undefined>("uuid_id");

  // useEffect(() => {
  //   if (info && uuid) {
  //     setTelemetry(info, uuid);
      
  //   }
  // }, [info, uuid]);

  // Мемоизируем возвращаемый объект
  const memoizedUser = useMemo(
    () => ({
      isAnonymous,
      info,
    }),
    [isAnonymous, info]
  );

  return memoizedUser;
};

export default useUser;
