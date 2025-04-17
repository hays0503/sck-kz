import { Button, Checkbox, Flex, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DecButton, IncButton } from '@/features/operation-in-basket-product';
import useBasketDelete from '@/features/operation-in-basket-product/model/useBasketDelete';
import RowInBasket from './RowInBasket';
import { CheckboxChangeEvent } from 'antd/lib';
import AddToFavoriteProduct from '@/features/add-to-favorite-product/ui/AddToFavoriteProduct';
import { MappedBasketType } from 'api-mapping/basket/v2/get-products/type/MappedBasketType';

const { Text } = Typography;

interface IProductsInBasketProps {
  readonly Products: MappedBasketType;
}

const ProductsInBasket: React.FC<IProductsInBasketProps> = ({ Products }) => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const t = useTranslations('ProductsInBasket');

  const actionDeleteProducts = useBasketDelete();

  const checkAll = Products.items.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < Products.items.length;

  const onChangeAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(
      e.target.checked ? Products.items.map((item) => item.prod.id) : [],
    );
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    setCheckedList((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  return (
    <>
      {/* Верхняя панель */}
      {Products.items.length > 1 && (
        <Flex
          align='baseline'
          justify='space-between'
          style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: '5px',
          }}
        >
          <Checkbox
            onChange={onChangeAllChange}
            indeterminate={indeterminate}
            checked={checkAll}
          >
            <Text style={{ fontSize: '16px' }}>{t('vybrat-vsyo')}</Text>
          </Checkbox>

          <Button
            type='text'
            onClick={() => {
              actionDeleteProducts({ prod_ids: checkedList });
              setCheckedList([]);
            }}
          >
            <Text style={{ color: '#ff4d4f' }}>
              {`${t('udalit-vybrannye')} (${checkedList.length})`}
            </Text>
          </Button>
        </Flex>
      )}

      {/* Список товаров */}
      <Flex
        vertical
        style={{
          width: '100%',
          backgroundColor: '#fff',
          padding: '5px',
          gap: '8px',
        }}
      >
        {Products.items.map((item) => {
          const isChecked = checkedList.includes(item.prod.id);

          return (
            <div
              key={item.prod.id}
              style={{
                position: 'relative',
                width: '100%',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                padding: '8px',
                backgroundColor: 'transparent',
              }}
            >
              {/* Чекбокс в углу */}
              {Products.items.length > 1 && (
                <Checkbox
                  checked={isChecked}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, item.prod.id)
                  }
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    zIndex: 1,
                    borderRadius: '4px',
                    padding: '2px',
                  }}
                />
              )}

              {/* Контент товара */}
              <RowInBasket
                BasketItem={item}
                IncBasketSlot={<IncButton prod_id={item.prod.id} />}
                DecBasketSlot={
                  <DecButton prod_id={item.prod.id} count={item.count} />
                }
                AddToFavoriteSlot={<AddToFavoriteProduct prod_id={item.prod.id} />}
              />
            </div>
          );
        })}
      </Flex>
    </>
  );
};

export default ProductsInBasket;
