import { useBasketAdd } from "@/features/operation-in-basket-product";
import beautifulCost from "@/shared/tools/beautifulCost";
import { Button, Flex, Typography } from "antd"
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail"
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

interface ProductDetailToOrderProps {
    readonly product: MappedProductDetailType
}


const { Text } = Typography;

const ProductDetailToOrder: React.FC<ProductDetailToOrderProps> = (props) => {

    const tt =  useTranslations("ProductDetailToOrder");
    const t = useTranslations("AddToBasketProduct");

    const [_addAction, msg] = useBasketAdd({ prod_id: props.product.id });
    const addAction = async () => {
        if ('vibrate' in navigator) {
          navigator.vibrate([50, 30, 80, 30, 50]);
        }
        _addAction()
      }; 
    const { product } = props

    const price = product?.price
    const discountPrice = product?.oldPrice
    // const quantity = product?.quantity // По просьбе Олега удаленна 13.03.25

    const StickFlex = {
        //  backgroundColor: "#FFFAAA",

         width: "100%",
         padding: "10px",
         
         position:"sticky",
         top:'auto',
         bottom:0

    } as CSSProperties

    return <Flex style={StickFlex} justify="space-between" align="center">
        {msg}
        <Flex vertical={true} gap={10}>
            <Text style={{ color:"#808185"}}>{`${tt("vnalichii")}`}</Text>
            <Flex gap={10} align="center">
                <Text strong>
                    {beautifulCost(price)}
                </Text>
                {discountPrice && (
                    <Text disabled delete>
                        {beautifulCost(discountPrice)}
                    </Text>)}
            </Flex>
        </Flex>
        <Button
            onClick={addAction}
            shape="default"
            size="large"
            style={{ backgroundColor: "#4954F0", width: "35%" }}
        >
            <Text
                style={{
                    backgroundColor: "#4954F0",
                    color: "#fff",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: "400",
                }}
            >
                {t('v-korzinu')}
            </Text>
        </Button>
    </Flex>
}

export default ProductDetailToOrder