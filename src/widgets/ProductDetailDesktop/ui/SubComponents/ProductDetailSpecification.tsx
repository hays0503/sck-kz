import {
  Button,
  Descriptions,
  DescriptionsProps,
  Drawer,
  Flex,
  Typography,
} from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import './ProductDetailSpecification.scss';
import ProductDetailDescription from './ProductDetailDescription';

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
          <Flex itemProp='name' style={{ width: '100%', fontSize: '12px' }}>
            <span style={{ background: 'white' }}>
              {specification?.name?.[locale]}
            </span>
          </Flex>
        ),
        children: (
          <span itemProp='value' style={{ width: '100%', fontSize: '12px' }}>
            {specification?.value?.[locale]}
          </span>
        ),
      };
    });

  const specificationCount = product?.specifications?.length ?? 0;

  const specificationHide: DescriptionsProps['items'] =
    specification && specification.slice(0, 4);

  const textButtonOnlySpecification = expandedSpecification
    ? t('svernut-kharakteristiki')
    : t('smotret-vse-kharakteristiki');

  const textButtonSpecificationAndDescription = t('kharakteristiki-i-opisanie');

  const textButton =
    product?.desc?.name[locale] !== ''
      ? textButtonSpecificationAndDescription
      : textButtonOnlySpecification;

  return (
    <Flex
      vertical={true}
      style={{ width: '100%', height: 'fit-content', padding: '10px' }}
      itemScope={true}
      itemProp='additionalProperty'
      itemType='http://schema.org/PropertyValue'
    >
      {specificationCount > 0 ? (
        <Flex vertical gap={10}>
          <Descriptions
            title={t('kharakteristiki')}
            items={specificationHide}
            column={1}
            style={
              {
                '--ant-descriptions-item-padding-bottom': '5px',
                width: '100%',
              } as React.CSSProperties
            }
            // classNames={{ label: 'dots' }}
            styles={{
              root: {
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
              },
              label: {
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent: 'center',
                backgroundImage: `linear-gradient(
                  90deg,
                  #d3d4dd 50%,
                  rgba(255, 255, 255, 0) 0%
                )`,
                backgroundPosition: 'bottom',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '5px 1px',
              },
              content: {
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignContent: 'center',
              },
            }}
          />
          <Button onClick={() => setExpandedSpecification((prev) => !prev)}>
            <Text style={{ color: '#4954F0' }}>{textButton}</Text>
          </Button>
        </Flex>
      ) : (
        <Text>{t('kh-otsutstvuyut')}</Text>
      )}
      <Drawer
        open={expandedSpecification}
        maskClosable
        mask
        onClose={() => setExpandedSpecification(false)}
        placement='right'
        size='large'
      >
        <Flex vertical gap={25}>
          <Descriptions
            title={t('kharakteristiki')}
            items={specification}
            column={1}
            style={
              {
                '--ant-descriptions-item-padding-bottom': '5px',
                width: '100%',
              } as React.CSSProperties
            }
            // classNames={{ label: 'dots' }}
            styles={{
              root: {
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
              },
              label: {
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent: 'center',
                backgroundImage: `linear-gradient(
                  90deg,
                  #d3d4dd 50%,
                  rgba(255, 255, 255, 0) 0%
                )`,
                backgroundPosition: 'bottom',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '5px 1px',
              },
              content: {
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignContent: 'center',
              },
            }}
          />
          {product?.desc && <ProductDetailDescription product={product} />}
        </Flex>
      </Drawer>
    </Flex>
  );
};

export default ProductDetailSpecification;
