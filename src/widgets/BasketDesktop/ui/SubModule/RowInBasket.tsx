import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { CSSProperties, JSX } from 'react';
import style from './BasketDesktop.module.css';
import beautifulCost from '@/shared/tools/beautifulCost';
import { MappedBasketItemType } from 'api-mapping/basket/v2/get-products/type/MappedBasketType';

const { Text } = Typography;

interface IProductsInBasketProps {
  readonly BasketItem: MappedBasketItemType;
  readonly IncBasketSlot: JSX.Element;
  readonly DecBasketSlot: JSX.Element;
}

const RowInBasket: React.FC<IProductsInBasketProps> = ({
  BasketItem,
  IncBasketSlot,
  DecBasketSlot,
}) => {
  const { prod, count } = BasketItem;
  const name = prod.name['ru'] ?? 'Название продукта';
  const priceString = prod.price;
  const discountPrice = prod.oldPrice;
  const stylePrice: CSSProperties = {
    color: discountPrice ? 'red' : 'black',
  };

  const DiscountPriceWidget = () => (
    <Flex gap={10} align='baseline' justify='left'>
      {discountPrice && (
        <Flex>
          <span className={style.priceProduct} style={stylePrice}>
            {beautifulCost(discountPrice)}
          </span>
        </Flex>
      )}
      <Flex>
        <span className={style.discountProduct}>
          {beautifulCost(priceString)}
        </span>
      </Flex>
    </Flex>
  );

  const PriceWidget = () => (
    <Flex gap={10} align='baseline' justify='left'>
      <Flex>
        <span className={style.priceProduct} style={stylePrice}>
          {beautifulCost(priceString)}
        </span>
      </Flex>
    </Flex>
  );

  const Price = discountPrice ? <DiscountPriceWidget /> : <PriceWidget />;

  return (
    <Flex gap={10} style={{ width: '100%' }}>
      <Flex
        align='center'
        justify='center'
        style={{ width: '30%', display: 'flex' }}
      >
        <Image
          src={prod.img[0]}
          alt={name}
          width={80}
          height={100}
          style={{
            objectFit: 'scale-down',
            objectPosition: 'center',
          }}
        />
      </Flex>
      <Flex vertical style={{ width: '70%' }}>
        <Text className={style.headerProduct}>{name}</Text>
        {Price}
        <Flex gap={10} align='center' justify='right'>
          {IncBasketSlot}
          <Text style={{ color: 'gray' }}>{count}</Text>
          {DecBasketSlot}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RowInBasket;
