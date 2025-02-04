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

    const t = useTranslations("ProductDetailToOrder");

    const addAction = useBasketAdd({ prod_id: props.product.id });

    const { product } = props

    const price = product?.price
    const discountPrice = product?.oldPrice
    const quantity = product?.quantity

    const StickFlex = {
         backgroundColor: "#FFFAAA",

         width: "100%",
         padding: "10px",
         
         position:"sticky",
         top:'auto',
         bottom:0

    } as CSSProperties

    return <Flex style={StickFlex} justify="space-between" align="center">
        <Flex vertical={true} gap={10}>
            <Text style={{ color:"#808185"}}>{`${t("vnalichii")}: ${quantity} `}</Text>
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
                {t("oformit")}
            </Text>
        </Button>
    </Flex>
}

export default ProductDetailToOrder