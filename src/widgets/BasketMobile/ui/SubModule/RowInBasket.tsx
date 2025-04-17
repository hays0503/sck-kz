import { Flex, Typography } from 'antd';
import Image from 'next/image';
import { CSSProperties, JSX } from 'react';
import style from './BasketMobile.module.css';
import beautifulCost from '@/shared/tools/beautifulCost';
import { useLocale } from 'next-intl';
import { MappedBasketItemType } from 'api-mapping/basket/v2/get-products/type/MappedBasketType';

const { Text } = Typography;

interface IProductsInBasketProps {
  readonly BasketItem: MappedBasketItemType;
  readonly IncBasketSlot: JSX.Element;
  readonly DecBasketSlot: JSX.Element;
  readonly AddToFavoriteSlot: JSX.Element;
}

const RowInBasket: React.FC<IProductsInBasketProps> = ({
  BasketItem,
  IncBasketSlot,
  DecBasketSlot,
  AddToFavoriteSlot,
}) => {
  const { prod, count } = BasketItem;
  const locale = useLocale();
  const name = prod.name[locale] ?? 'Название продукта';
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

  let infoText: string | undefined = undefined;
  if (prod.brand) {
    infoText = `${prod.brand?.[locale]}`;
  }

  if (prod?.specifications) {
    const findColorText = prod.specifications.find(
      (spec) => String(spec.name['ru']).toLowerCase() === 'цвет',
    )?.value[locale];
    const findMaterialText = prod.specifications.find(
      (spec) => String(spec.name['ru']).toLowerCase() === 'материал',
    )?.value[locale];
    if (findColorText) {
      infoText += `, ${findColorText}`;
    }
    if (findMaterialText) {
      infoText += `, ${findMaterialText}`;
    }
  }

  return (
    <Flex gap={10} style={{ width: '100%' }}>
      <Flex
        align='center'
        justify='center'
        style={{ width: '40%' }}
        vertical
        gap={10}
      >
        <Flex
          style={{
            width: '100%',
            height: '185px',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'gray',
          }}
        >
          <Image
            src={prod.img[0]}
            alt={name}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </Flex>
        <Flex
          gap={5}
          align='center'
          justify='space-around'
          style={{ width: '100%' }}
        >
          {IncBasketSlot}
          <Text style={{ color: 'gray' }}>{count}</Text>
          {DecBasketSlot}
        </Flex>
      </Flex>
      <Flex vertical style={{ width: '70%' }} justify='space-between'>
        <Flex vertical style={{ width: '100%' }}>
          <Flex style={{ width: '100%' }} justify='space-between'>
            {Price} {AddToFavoriteSlot}
          </Flex>
          <Text className={style.headerProduct}>{name}</Text>
          {infoText && <Text disabled>{infoText}</Text>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RowInBasket;
