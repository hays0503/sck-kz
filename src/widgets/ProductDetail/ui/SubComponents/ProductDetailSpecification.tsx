import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Typography,
} from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import './ProductDetailSpecification.scss';

interface IProductDetailDescriptionsProps {
  readonly product: MappedProductDetailType;
}
const { Text } = Typography;

const ProductDetailSpecification: React.FC<IProductDetailDescriptionsProps> = (
  props,
) => {
  const { product } = props;

  const locale = useLocale();

  const t = useTranslations('ProductDetailSpecification');

  const [expandedSpecification, setExpandedSpecification] = useState(false);

  if (!product?.specifications) return null;

  if (!product?.specifications?.length) {
    return null;
  }

  const specification: DescriptionsProps['items'] =
    product?.specifications?.map((specification) => {
      return {
        label: (
          <span itemProp='name' style={{ width: '45dvw' }}>
            {specification?.name?.[locale]}
          </span>
        ),
        children: (
          <span itemProp='value' style={{ width: 'auto' }}>
            {specification?.value?.[locale]}
          </span>
        ),
      };
    });

  const specificationCount = product?.specifications?.length ?? 0;

  const specificationHide: DescriptionsProps['items'] = specification && specification.slice(0,4);

  return (
    <Flex
      vertical={true}
      style={{ width: '100%', padding: '10px' }}
      itemScope={true}
      itemProp='additionalProperty'
      itemType='http://schema.org/PropertyValue'
    >
      {specificationCount > 0 ? (
        <>
          <Descriptions
            title={t('kharakteristiki')}
            items={expandedSpecification ? specification : specificationHide}
            column={1}
            style={
              {
                '--ant-descriptions-item-padding-bottom': '5px',
              } as React.CSSProperties
            }
          />
          {specificationCount > 4 && (
            <Button onClick={() => setExpandedSpecification((prev) => !prev)}>
              <Text style={{ color: '#4954F0' }}>
                {expandedSpecification
                  ? t('svernut-kharakteristiki')
                  : t('smotret-vse-kharakteristiki')}
              </Text>
            </Button>
          )}
        </>
      ) : (
        <Text>{t('kh-otsutstvuyut')}</Text>
      )}
    </Flex>
  );
};

export default ProductDetailSpecification;
