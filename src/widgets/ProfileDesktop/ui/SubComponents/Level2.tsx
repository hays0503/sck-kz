import { UserInfo } from "@/shared/types/user";
import { Flex, message, Typography } from "antd";
import { useTranslations } from "next-intl";
import React, { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IconLikeIOS from "@/shared/ui/IconLikeIOS/IconLikeIOS";
import { Watermark } from "antd";
import { OrderHistoryDesktop } from "@/widgets/OrderHistoryDesktop";
import { orderByType } from "api-mapping/product/by_populates";
import { FeaturedProductsListPagination } from "@/widgets/FeaturedProductsListPagination";
import { Logout } from "@/features/logout";

const { Title } = Typography;


const ElementList: React.FC<{
  title: string;
  action: () => void;
  disabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}> = (props) => {
  const t = useTranslations("ProfileMobile");
  const { title, disabled, color, icon } = props;
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
          } else {
            props.action();
          }
        }}
      >
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
      </motion.div>
    </>
  );
};



interface Level2Props {
  readonly IsAnonymous: boolean | undefined;
  readonly infoUser: UserInfo | null;
  readonly setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  readonly order: orderByType,
  readonly page: number
}

const Level2: React.FC<Level2Props> = (props) => {

  const isGuest = props.IsAnonymous;
  const { setContent } = props
  const { order, page } = props



  const t = useTranslations("Level2");

  return (
    <Flex>
      <Flex vertical={true} gap={10} align="center" style={{ width: "100%" }}>
        <ElementList
          title={t("istoriya-zakazov")}
          action={() => setContent(<><OrderHistoryDesktop /></>)}
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
          action={() => setContent(<FeaturedProductsListPagination order={order} page={page} style={{
            "--sck-columns-on-page": "3"
          } as CSSProperties} />)}
          disabled={false}
          icon={
            <IconLikeIOS
              ionicons
              src="heart-outline"
              color="#37bd2b"
            />
          }
        />
        <Watermark gap={[10, 10]} rotate={-10} content={"В разработке"} style={{ width: "100%" }}>
          <ElementList
            title={t("otzyvy")}
            action={() => setContent(<>123</>)}
            disabled={true}
            icon={
              <IconLikeIOS
                ionicons
                src="chatbox-outline"
                color="#3baad0"
              />
            }
          />
        </Watermark>
        <Watermark gap={[10, 10]} rotate={-10} content={"В разработке"} style={{ width: "100%" }}>
          <ElementList
            title={t("sravnenie-tovarov")}
            action={() => setContent(<>123</>)}
            disabled={true}
            icon={
              <IconLikeIOS
                src="/scales.svg"
                color="red"
              />
            }
          />
        </Watermark>
        <Watermark gap={[10, 10]} rotate={-10} content={"В разработке"} style={{ width: "100%" }}>
          <ElementList
            title={t("nastroi-ki")}
            action={() => setContent(<>123</>)}
            disabled={true}
            icon={
              <IconLikeIOS
                ionicons
                src="settings-outline"
                color="#37bd2b"
              />
            }
          />
        </Watermark>

        <ElementList
          title={t('vykhod')}
          action={() => setContent(<Logout />)}
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
    </Flex>
  );
};

export default Level2;
