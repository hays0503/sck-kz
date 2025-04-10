import { Flex, Typography } from "antd";
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";
import { useLocale, useTranslations } from "next-intl";





interface IProductDetailDescriptionsProps {
    readonly product: MappedProductDetailType
}

const { Text,Title } = Typography;

const ProductDetailDescription: React.FC<IProductDetailDescriptionsProps> = (props) => {
    const { product } = props;
    const locale = useLocale();
    const t = useTranslations("ProductDetailDescription")

    const descriptionBody = product.desc?.name[locale] ?? "";
   
    return <Flex vertical={true} style={{ width: "100%" }} itemProp="description">
        <Title level={5}>{t("opisanie")}</Title>
          <Text disabled itemProp="description">
            {descriptionBody}
          </Text>
    </Flex>
}
export default ProductDetailDescription


