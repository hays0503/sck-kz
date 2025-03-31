import { AddToBasketProduct } from '@/features/operation-in-basket-product';
import beautifulCost from '@/shared/tools/beautifulCost';
import { Flex, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { CSSProperties } from 'react';

interface ProductDetailToOrderProps {
  readonly product: MappedProductDetailType;
}

const { Text } = Typography;

const ProductDetailToOrder: React.FC<ProductDetailToOrderProps> = (props) => {
  const tt = useTranslations('ProductDetailToOrder');
  // const t = useTranslations("AddToBasketProduct");

  // const [_addAction, msg] = useBasketAdd({ prod_id: props.product.id });
  // const addAction = async () => {
  //     if ('vibrate' in navigator) {
  //         navigator.vibrate([50, 30, 80, 30, 50]);
  //     }
  //     _addAction()
  // };
  const { product } = props;

  const price = product?.price;
  const discountPrice = product?.oldPrice;
  // const quantity = product?.quantity // По просьбе Олега удаленна 13.03.25

  const StickFlex = {
    //  backgroundColor: "#FFFAAA",

    width: '100%',
    padding: '10px',

    position: 'sticky',
    top: 'auto',
    bottom: 0,
  } as CSSProperties;

  return (
    <Flex gap={10} vertical style={StickFlex} justify='space-between' align='center'>
      {/* {msg} */}
      <Flex gap={10} style={{ width: '100%' }} align='center' justify='space-between'>
        <Flex gap={10} align='center'>
          <Text strong style={{ color: `${discountPrice?'#FF3E4A':'#000000'}` }}>{beautifulCost(price)}</Text>
          {discountPrice && (
            <Text disabled delete>
              {beautifulCost(discountPrice)}
            </Text>
          )}
        </Flex>
        <Text style={{ color: '#808185' }}>{`${tt('vnalichii')}`}</Text>
      </Flex>
      <Flex style={{ width: '100%' }}>
        <AddToBasketProduct justify='space-between' prod_id={product.id} />
      </Flex>
    </Flex>
  );
};

export default ProductDetailToOrder;
