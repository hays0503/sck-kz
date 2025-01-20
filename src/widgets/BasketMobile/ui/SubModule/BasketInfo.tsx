import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Text } = Typography;

const BasketInfo: React.FC = () => {

  const t = useTranslations("BasketInfo");

  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
    >
      <Flex
        gap={10}
        style={{
          width: "90%",
          border: "1px solid #715EFF",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <Flex>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
              fill="#715EFF"
            />
            <path
              d="M11.999 8.45312V12.4531M12.0488 15.4531V15.5531L11.9492 15.5527V15.4531H12.0488Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Flex>
        <Flex vertical>
          <Text
            style={{
              color: "#715EFF",
              fontSize: "14px",
              fontWeight: "500",
              fontStyle: "normal",
              lineHeight: "22px",
              letterSpacing: "-0.084px",
            }}
          >
            {t("obratite-vnimanie")}
          </Text>
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "400",
              fontStyle: "normal",
              lineHeight: "20px",
              letterSpacing: "-0.072px",
            }}
          >
            {t(
              "tovar-iz-vashei-korziny-dostupen-drugim-polzovatelyam-dlya-vykupa-esli-kto-to-vykupit-tovar-ranshe-vas-on-stanet-nedostupen-dlya-pokupki"
            )}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BasketInfo;
