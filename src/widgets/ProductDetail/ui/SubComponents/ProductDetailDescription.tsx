import truncateText from "@/shared/tools/truncateText";
import { Button, Flex, Typography } from "antd";
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";





interface IProductDetailDescriptionsProps {
    readonly product: MappedProductDetailType
}

const { Text,Title } = Typography;

const ProductDetailDescription: React.FC<IProductDetailDescriptionsProps> = (props) => {
    const { product } = props;
    const locale = useLocale();
    const t = useTranslations("ProductDetailDescription")
    const [expandedDescription, setExpandedDescription] = useState(false);

    const descriptionBody = product.desc?.name[locale] ?? "";

    const descriptionBodyHide = truncateText(
        descriptionBody ?? "",
        locale,
        expandedDescription
      );

   
    return <Flex vertical={true} style={{ width: "100%",padding:"10px" }} itemProp="description">
        <Title level={5}>{t("opisanie")}</Title>
          <Text disabled itemProp="description">
            {expandedDescription ? descriptionBody : descriptionBodyHide}
          </Text>
          <Button
            onClick={() => {
              setExpandedDescription(!expandedDescription);
            }}
          >
            <Text style={{ color: "#4954F0" }} itemProp="description">
              {expandedDescription ? t("svernut") : t("smotret-vse-opisanie")}
            </Text>
          </Button>
    </Flex>
}
export default ProductDetailDescription


