import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useBasketAdd } from "../model";


const { Text } = Typography;



const AddToBasketProduct: React.FC<{ prod_id: number }> = ({ prod_id }) => {

  const [_addAction,msg] = useBasketAdd({ prod_id});
  const addAction = async () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 80, 30, 50]);
    }
    _addAction()
  }; 
  const t = useTranslations("AddToBasketProduct");

  return (
    <Flex style={{ width: "100%" }}>
      {msg}
      <Button
        onClick={addAction}
        shape="default"
        size="large"
        style={{ 
          backgroundColor: "#4954F0",
          width: "100%",
          height: "40px", //
          padding: "8px 16px", //
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
        }}
      >
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Project Icon">
            <path id="Vector" d="M15.7941 16.3791H8.53905C8.15483 16.3791 7.96237 16.3791 7.80418 16.3108C7.66464 16.2505 7.54358 16.1534 7.45537 16.0296C7.35651 15.8908 7.31675 15.7052 7.23805 15.3379L5.1429 4.3859C5.06237 4.01006 5.02156 3.82235 4.92155 3.68197C4.83335 3.55816 4.71231 3.46071 4.57276 3.4004C4.41455 3.33203 4.22316 3.33203 3.83878 3.33203H3.25M5.75 5.83203H16.4777C17.0792 5.83203 17.3796 5.83203 17.5815 5.95733C17.7583 6.06708 17.8878 6.23921 17.9442 6.43953C18.0086 6.66822 17.9259 6.957 17.7592 7.53491L16.4777 12.082C16.378 12.4276 16.3282 12.6 16.227 12.7282C16.1378 12.8414 16.0201 12.93 15.8866 12.9844C15.7358 13.0458 15.5566 13.0458 15.1991 13.0458H7.06444" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        <Text
          style={{
            color: "#fff",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: "500",
            letterSpacing: "-0.6%",
            fontStyle: "normal",
            textAlign:"center"
          }}
        >
          {t("v-korzinu")}
        </Text>
      </Button>
    </Flex>
  );
}
export default AddToBasketProduct

// font-family: Inter;
// font-weight: 500;
// font-size: 14px;
// line-height: 22px;
// letter-spacing: -0.6%;
// text-align: center;
