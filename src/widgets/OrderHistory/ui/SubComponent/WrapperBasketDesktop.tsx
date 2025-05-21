import useGetBasketProductsSWR from '@/entities/Basket/model/getBasketProductsSWR';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import beautifulCost from '@/shared/tools/beautifulCost';
import { Alert, Divider, Flex, Skeleton, Typography } from 'antd';
import { useLocale } from 'next-intl';
import { CSSProperties, memo, useMemo } from 'react';
import { useTranslations } from 'use-intl';
import RenderListProduct from './RenderListProduct';

const basketLabel:CSSProperties = { fontSize: '20px' };
const basketValue:CSSProperties = { fontSize: '14px' };

const { Text, Title } = Typography;

interface IWrapperBasketDesktopProps {
  basketUuid: string;
}

const WrapperBasketDesktop: React.FC<IWrapperBasketDesktopProps> = ({
  basketUuid,
}) => {
  const {
    data: fetchBasket,
    error,
    isLoading,
  } = useGetBasketProductsSWR(basketUuid);
  const locale = useLocale();
  const cityEn = useGetCityParams();
  const t = useTranslations('WrapperBasketDesktop');

  // Пересчитываем общую сумму только когда items меняются
  const allPrice = useMemo(() => {
    const items = fetchBasket?.items ?? [];
    return items.reduce(
      (acc, item) => acc + (item.prod.price ?? 0) * item.count,
      0,
    );
  }, [fetchBasket]);

  // Если при запросе произошла ошибка — показываем Alert
  if (error) {
    return <Alert type='error' message={t('error')} showIcon />;
  }

  // Пока данные не пришли — показываем Skeleton
  if (isLoading || !fetchBasket) {
    return <Skeleton active paragraph={{ rows: 3 }} />;
  }
  // Если корзина пуста — показываем информационное сообщение
  if (fetchBasket.items.length === 0) {
    return (
      <Alert
        type='info'
        message={t('empty')}
        description={t('basket-empty-description')}
        showIcon
      />
    );
  }

  const items = fetchBasket.items;

  return (
    <Flex vertical gap={16}>
      <Divider />
      <Title level={5}>{t('tovary')}</Title>

      {/* Список товаров */}
      <RenderListProduct items={items} locale={locale} cityEn={cityEn} />
      <Divider />
      {/* Итог по корзине */}
      <Flex justify='space-between' align='center'>
        <Text style={basketLabel}>{t('summa-k-oplate')}</Text>
        <Text style={basketValue}>{beautifulCost(allPrice)}</Text>
      </Flex>
    </Flex>
  );
};

export default memo(WrapperBasketDesktop);
