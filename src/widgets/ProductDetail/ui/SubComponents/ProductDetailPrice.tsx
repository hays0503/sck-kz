import beautifulCost from "@/shared/tools/beautifulCost";
import { Credit } from "@/widgets/Credit";
import { Flex, Tag, Typography } from "antd";
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";
import { useLocale, useTranslations } from "next-intl";
import { CSSProperties } from "react";

interface IProductDetailPriceProps {
    readonly product: MappedProductDetailType;
}

const { Text } = Typography

const ProductDetailPrice: React.FC<IProductDetailPriceProps> = (props) => {
    const { product } = props
    const t = useTranslations("ProductDetail");
    const locale = useLocale();
    const discount = product?.discount ?? 0;
    const name = product?.name[locale] ?? `Название товара не заданно на текущем языке - ${locale}`;
    const article = product?.article ?? "Артикул не задан";
    const rating = product?.rating
    const review = product?.reviews?.length;
    const oldPrice = product?.oldPrice??0;
    const price = product?.price??0;
    const deltaPrice = price  - oldPrice;

    const DiscountComponent = () => <Tag color="#19B275" style={{ width: "fit-content" }}>{`${discount} %`}</Tag>;

    const NameProductComponent = () => <Text strong>{name}</Text>;

    const ArticleProductComponent = () => {
        const style = { fontSize: "14px", fontWeight: "400", lineHeight: "22px", letterSpacing: "-0.6px" }
        return <Flex gap={5}>
            <Text style={{ ...style, color: "#8C8C8C" }}>{` ${t('artikul')}: `}</Text>
            <Text style={{ ...style, color: "#464646" }}>{`${article}`}</Text>
        </Flex>;
    }

    const RatingProductComponent = () => {
        return <>
            {
                Boolean(rating) && <Flex gap={5}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.32745 1.36274C8.60256 0.805305 9.39744 0.805305 9.67255 1.36274L11.7644 5.60133C11.8737 5.82269 12.0848 5.97612 12.3291 6.01161L17.0067 6.6913C17.6219 6.78069 17.8675 7.53667 17.4224 7.97057L14.0376 11.2699C13.8609 11.4422 13.7802 11.6904 13.8219 11.9337L14.621 16.5924C14.726 17.2051 14.083 17.6723 13.5327 17.383L9.34901 15.1835C9.13051 15.0686 8.86949 15.0686 8.65099 15.1835L4.46725 17.383C3.91703 17.6723 3.27396 17.2051 3.37904 16.5924L4.17806 11.9337C4.21979 11.6904 4.13913 11.4422 3.96237 11.2699L0.577647 7.97057C0.13251 7.53667 0.378142 6.78069 0.993307 6.6913L5.67087 6.01161C5.91516 5.97612 6.12633 5.82269 6.23558 5.60133L8.32745 1.36274Z"
                            fill="#FFA600"
                        />
                    </svg>
                    <Text style={{ color: "#FFA600" }}>
                        {rating}
                    </Text>
                </Flex>
            }
        </>
    }

    const ReviewInfoProductComponent = () => {
        return <>
            {
                Boolean(review) && <Flex gap={5} align="center" justify="center">
                    <Text style={{ color: "#8C8C8C" }}>
                        {`${review} ${t('reviews')}`}
                    </Text>
                </Flex>
            }
        </>
    }

    const PriceDiscountProductComponent = () => {
        const textStyle = {
            fontWeight:"400",
            fontSize:"16px",
            lineHeight:"24px",
            lineHeightStep:"24px",
            letterSpacing:"-0.6px",
        } as CSSProperties
        return <>
            {oldPrice && <Text delete style={{...textStyle,color:"#8C8C8C"}}>
                { beautifulCost(oldPrice)}
                </Text>}
        </>
    }

    const PriceDeltaComponent = () => {
        const textStyle = {
            fontWeight:"600",
            fontSize:"14px",
            lineHeight:"22px",
            lineHeightStep:"22px",
            letterSpacing:"-0.6px",
        } as CSSProperties
        return <>
            <Text strong style={{...textStyle, color: "#19B275" }}>
                {beautifulCost(deltaPrice)}
                </Text>
            </>
    }

    const PriceProductComponent = () => {
        const textStyle = {
            fontWeight:"600",
            fontSize:"20px",
            lineHeight:"28px",
            lineHeightStep:"24px",
            letterSpacing:"-0.6px",
        } as CSSProperties
        return <>
            <Text strong style={{...textStyle, color: "#FF3E4A" }}>
                {beautifulCost(price)}
                </Text>
            </>
    }

    return (<Flex vertical={true} gap={10} style={{ width: "100%", padding: "10px" }}>

        <DiscountComponent />

        <NameProductComponent />

        <Flex justify="space-between" align="center">
            <ArticleProductComponent />

            <Flex gap={5}>
                <RatingProductComponent />
                <ReviewInfoProductComponent />
            </Flex>
        </Flex>

        <Flex vertical={true} gap={5}>
            <PriceDiscountProductComponent />
            <Flex justify="space-between" align="center">
                <PriceProductComponent />
                <PriceDeltaComponent/>
            </Flex>
        </Flex>

        <Credit prod_article={product.article} />

    </Flex>
    )
}

export default ProductDetailPrice;