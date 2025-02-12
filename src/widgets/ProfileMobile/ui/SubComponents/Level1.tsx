"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { UserInfo } from "@/shared/types/user";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties } from "react";

interface Level1Props {
  readonly IsAnonymous: boolean|undefined;
  readonly infoUser: UserInfo | null;
}

const { Text, Title } = Typography;

const Level1: React.FC<Level1Props> = (props) => {
  const currentCity = useGetCityParams();
  const { infoUser } = props;

  const isGuest = props.IsAnonymous;

  const t = useTranslations("ProfileMobile");

  const GuestUser = () => (
    <Flex vertical={true} gap={5}>
      <Title level={3}>{t("gost")}</Title>
    </Flex>
  );

  const AuthUser = () => (
    <Flex vertical={true} gap={5}>
      <Title level={3}>{`${infoUser?.username}`}</Title>
        <Text>{`${infoUser?.phone?.phone_number ?? infoUser?.email}`}</Text>      
    </Flex>
  );
  
  const isDefault: boolean = Boolean(infoUser?.avatar_path) || infoUser?.avatar_path != "avatar_default.png"
  console.log("isDefault =>",isDefault)
  const photoProfile: string = isDefault ? "/sck-user.svg" : infoUser!.avatar_path
  const styleImg: CSSProperties = {
    borderRadius:isDefault ? `50%`:`0%`
  } as CSSProperties

  console.log("photoProfile =>",photoProfile)
  return (
    <Flex
      vertical={true}
      gap={10}
      align="center"
      style={{
        backgroundColor: "#fff",
        marginBottom: "10px",
        marginTop: "10px",
        paddingBottom: "10px",
        paddingTop: "10px",
        width: "100%",
      }}
    >
      <Flex
        gap={10}
        align="center"
        style={{ width: "95%" }}
        justify="space-between"
      >
        <Flex gap={10}>
          <Image priority={true} src={photoProfile} alt="user" width={66} height={66} style={styleImg}/>
          {isGuest ? <GuestUser /> : <AuthUser />}
        </Flex>
        <Link prefetch={true} href={isGuest ? `/city/${currentCity}/login` : `/city/${currentCity}/user`}>
          <Button
            shape="circle"
            type="text"
            size="large"
            style={{ padding: "36px" }}
            icon={
              <svg
                width="48"
                height="112"
                viewBox="0 0 24 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.26399 22.2636C8.91252 22.6151 8.91252 23.1849 9.264 23.5364L13.7276 28L9.26399 32.4636C8.91252 32.8151 8.91252 33.3849 9.264 33.7364C9.61547 34.0879 10.1853 34.0879 10.5368 33.7364L15.6368 28.6364C15.9883 28.2849 15.9883 27.715 15.6368 27.3636L10.5368 22.2636C10.1853 21.9121 9.61546 21.9121 9.26399 22.2636Z"
                  fill="#99A2AD"
                />
              </svg>
            }
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Level1;
