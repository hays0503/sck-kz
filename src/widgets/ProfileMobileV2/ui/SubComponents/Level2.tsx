import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { UserInfo } from "@/shared/types/user";
import { Flex, message, Typography } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import Image from "next/image";
import { motion } from "framer-motion";
import IconLikeIOS from "@/shared/ui/IconLikeIOS/IconLikeIOS";

const { Title } = Typography;


const ElementList: React.FC<{
  title: string;
  href: string;
  disabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}> = (props) => {
  const t = useTranslations("ProfileMobile");
  const { title, href, disabled, color, icon } = props;
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <motion.div
        whileTap={
          !disabled
            ? {
              y: 4, // Более заметный сдвиг вниз
              boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.15)", // Вдавливание
            }
            : {}
        }
        transition={{ type: "spring", stiffness: 280, damping: 18 }} // Упругое движение
        style={{
          width: "100%",
          backgroundColor: disabled ? "#f0f0f0" : "#fff",
          border: "1px solid #d7d7d7",
          // boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.12)", // Базовая тень
          padding: "12px",
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius: "10px",
          transition: "background-color 0.2s ease",
        }}
        onClick={() => {
          if (disabled) {
            messageApi.open({
              type: "error",
              content: t("vy-ne-avtorizovany"),
            });
          }
        }}
      >
        <Link href={disabled ? "#" : href} prefetch={true} style={{ width: "100%" }}>
          <Flex align="center" justify="space-between" style={{ width: "100%" }}>
            <Flex align="center" justify="space-between" gap={10}>
              {icon}
              <Title level={5} style={{ color }}>
                {title}
              </Title>
            </Flex>
            <Flex align="center" justify="center">
              <Image src={"/arrow.svg"} alt="arrow" width={36} height={36} />
            </Flex>
          </Flex>
        </Link>
      </motion.div>
    </>
  );
};



interface Level2Props {
  readonly IsAnonymous: boolean | undefined;
  readonly infoUser: UserInfo | null;
}

const Level2: React.FC<Level2Props> = (props) => {

  const isGuest = props.IsAnonymous;

  const currentCity = useGetCityParams();
  const t = useTranslations("Level2");
  const refreshToken = useReadLocalStorage<{ token: string }>("refreshToken");

  return (
    <Flex vertical={true} gap={10} align="center" style={{ width: "100%" }}>
      <ElementList
        title={t("istoriya-zakazov")}
        href={`/city/${currentCity}/order-history/${refreshToken?.token}`}
        disabled={isGuest}
        icon={
          <IconLikeIOS
            ionicons
            src="cube-outline"
            color="#ffba06"
          />
        }
      />
      <ElementList
        title={t("izbrannye-tovary")}
        href={`/city/${currentCity}/featured-products`}
        disabled={true}
        icon={
          <IconLikeIOS
            ionicons
            src="heart-outline"
            color="#37bd2b"
          />
        }
      />
      <ElementList
        title={t("otzyvy")}
        href={`/city/${currentCity}/main`}
        disabled={isGuest}
        icon={
          <IconLikeIOS
            ionicons
            src="chatbox-outline"
            color="#3baad0"
          />
        }
      />
      <ElementList
        title={t("sravnenie-tovarov")}
        href={`/city/${currentCity}/main`}
        icon={
          <IconLikeIOS
            src="/scales.svg"
            color="red"
          />
        }
      />
      <ElementList
        title={t("nastroi-ki")}
        href={`/city/${currentCity}/main`}
        icon={
          <IconLikeIOS
            ionicons
            src="settings-outline"
            color="#37bd2b"
          />
        }
      />
      <ElementList
        title={t('vykhod')}
        href={`/city/${currentCity}/logout`}
        disabled={isGuest}
        color="red"
        icon={
          <IconLikeIOS
            ionicons
            src="log-out-outline"
            color="purple"
          />
        }
      />
    </Flex>
  );
};

export default Level2;
