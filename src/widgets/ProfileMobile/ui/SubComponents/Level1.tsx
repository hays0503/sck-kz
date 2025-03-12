"use client";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { UserInfo } from "@/shared/types/user";
import IconLikeIOS from "@/shared/ui/IconLikeIOS/IconLikeIOS";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Level1Props {
  readonly IsAnonymous: boolean | undefined;
  readonly infoUser: UserInfo | null;
}

const { Text, Title } = Typography;

const Level1: React.FC<Level1Props> = (props) => {
  const currentCity = useGetCityParams();
  const [img,setImg] = useState<string>("/sck-user.svg");
  const { infoUser } = props;

  const isGuest = props.IsAnonymous;
  const t = useTranslations("ProfileMobile");

  const GuestUser = () => (
    <Flex vertical={true} gap={5}>
      <Title level={3}>{t("gost")}</Title>
      <Link href={`/city/${currentCity}/login`}>Войдите или зарегистрируйтесь </Link>
    </Flex>
  );

  const AuthUser = () => (
    <Flex vertical={true} gap={5}>
      <Title level={3}>{`${infoUser?.username}`}</Title>
      <Text>{`${infoUser?.phone?.phone_number ?? infoUser?.email}`}</Text>
    </Flex>
  );

  useEffect(() => {
    const isDefault: boolean = Boolean(String(infoUser?.avatar_path ?? "avatar_default.png") == "avatar_default.png")
    if (isDefault) setImg("/sck-user.svg");
    if (!isDefault) setImg(`${infoUser?.avatar_path}/?time=${Date.now()}`);
  }, [infoUser]);


  const styleImg: CSSProperties = {
    borderRadius: `50%`
  } as CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Flex
        vertical={true}
        gap={10}
        align="center"
        style={{
          borderRadius: "8px",
          backgroundColor: "#fff",
          marginBottom: "10px",
          marginTop: "10px",
          paddingBottom: "10px",
          paddingTop: "10px",
          width: "100%",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Flex
          gap={10}
          align="center"
          style={{ width: "95%" }}
          justify="space-between"
        >
          <Suspense>
            <Flex gap={10}>
              <Image priority={true} src={img} alt="user" width={66} height={66} style={styleImg} unoptimized />
              {isGuest ? <GuestUser /> : <AuthUser />}
            </Flex>
          </Suspense>
          <Link prefetch={true} href={isGuest ? `/city/${currentCity}/login` : `/city/${currentCity}/user`}>
            <Button
              shape="circle"
              type="text"
              size="large"
              style={{ padding: "5px" }}
              icon={
                <>
                  {isGuest ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <IconLikeIOS ionicons src="log-in-outline" color="green" size={28} />
                    </motion.div>
                  ) : (
                    <IconLikeIOS ionicons src="create-outline" color="green" size={28} />
                  )}
                </>
              }
            />
          </Link>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default Level1;
