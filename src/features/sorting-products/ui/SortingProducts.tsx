import { Dropdown, Flex, MenuProps, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

const { Text, Title } = Typography;

interface SortingProductsProps {
  url: string;
}

export const convertSortOrder = (order: string) => {
  switch (order) {
    case 'stocks__price':
      return 'price';
    case '-stocks__price':
      return '-price';
    case 'avg_rating':
      return 'reviews';
    case '-avg_rating':
      return '-reviews';
    default:
      return 'price';
  }
};

const SortingProducts: React.FC<SortingProductsProps> = () => {
  const t = useTranslations('SortingProducts');
  const [sortOrder, setSortOrder] = useQueryState('order', {
    defaultValue: 'stocks__price',
  });

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSortOrder(key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'stocks__price',
      label: (
        <Text
          // href={`${url}/?sortOrder=stocks__price`}
          style={{ color: sortOrder === 'stocks__price' ? 'red' : 'black' }}
          // onClick={() => setSortOrder("stocks__price")}
        >
          {t('po-vozrastaniyu-ceny')} ↑
        </Text>
      ),
    },
    {
      key: '-stocks__price',
      label: (
        <Text
          // href={`${url}/?sortOrder=-stocks__price`}
          style={{ color: sortOrder === '-stocks__price' ? 'red' : 'black' }}
          // onClick={() => setSortOrder("-stocks__price")}
        >
          {t('po-ubyvaniyu-ceny')} ↓
        </Text>
      ),
    },
    {
      key: 'avg_rating',
      label: (
        <Text
          // href={`${url}/?sortOrder=avg_rating`}
          style={{ color: sortOrder === 'avg_rating' ? 'red' : 'black' }}
          // onClick={() => setSortOrder("avg_rating")}
        >
          {t('po-populyarnosti')} ↑
        </Text>
      ),
    },
    {
      key: '-avg_rating',
      label: (
        <Text
          // href={`${url}/?sortOrder=-avg_rating`}
          style={{ color: sortOrder === '-avg_rating' ? 'red' : 'black' }}
          // onClick={() => setSortOrder("-avg_rating")}
        >
          {t('po-populyarnosti')} ↓
        </Text>
      ),
    },
  ];


  const renderSortTitle = () => {
    switch (sortOrder) {
      case 'stocks__price':
        return t('po-vozrastaniyu-ceny');
      case '-stocks__price':
        return t('po-ubyvaniyu-ceny');
      case 'avg_rating':
        return t('po-populyarnosti');
      case '-avg_rating':
        return t('po-populyarnosti');
      default:
        return t('po-vozrastaniyu-ceny');
    }
  };

  return (
    <Flex
      align='baseline'
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        marginTop: '1px',
      }}
      gap={5}
    >
      <Dropdown menu={{ items, onClick }}>
        <Flex align='baseline' wrap gap={5}>
          <svg
            width='18'
            height='12'
            viewBox='0 0 18 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.6667 8.5013H16.5M1.5 8.5013H3.16667M3.16667 8.5013C3.16667 9.65189 4.09941 10.5846 5.25 10.5846C6.40059 10.5846 7.33333 9.65189 7.33333 8.5013C7.33333 7.35071 6.40059 6.41797 5.25 6.41797C4.09941 6.41797 3.16667 7.35071 3.16667 8.5013ZM15.6667 3.5013H16.5M1.5 3.5013H7.33333M12.75 5.58464C11.5994 5.58464 10.6667 4.6519 10.6667 3.5013C10.6667 2.35071 11.5994 1.41797 12.75 1.41797C13.9006 1.41797 14.8333 2.35071 14.8333 3.5013C14.8333 4.6519 13.9006 5.58464 12.75 5.58464Z'
              stroke='#464646'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <Title level={5} style={{ color: 'gray' }}>
            {renderSortTitle()}
          </Title>
        </Flex>
      </Dropdown>
    </Flex>
  );
};

export default SortingProducts;
