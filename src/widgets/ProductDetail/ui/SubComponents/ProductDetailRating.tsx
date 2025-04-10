import { Button, Flex, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';

interface IProductDetailRatingProps {
  readonly product: MappedProductDetailType;
  readonly setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Text } = Typography;

const ProductDetailRating: React.FC<IProductDetailRatingProps> = (props) => {
  const { setExpanded } = props;
  const { rating } = props?.product;

  const review = props?.product?.reviews?.length;

  const t = useTranslations('ProductDetail');

  const RatingProductComponent = () => {
    const numberRating = Math.round((rating ?? 0) * 100) / 100;
    return (
      <>
        {Boolean(rating) && (
          <Flex gap={5}>
            <svg
              width='25'
              height='25'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.32745 1.36274C8.60256 0.805305 9.39744 0.805305 9.67255 1.36274L11.7644 5.60133C11.8737 5.82269 12.0848 5.97612 12.3291 6.01161L17.0067 6.6913C17.6219 6.78069 17.8675 7.53667 17.4224 7.97057L14.0376 11.2699C13.8609 11.4422 13.7802 11.6904 13.8219 11.9337L14.621 16.5924C14.726 17.2051 14.083 17.6723 13.5327 17.383L9.34901 15.1835C9.13051 15.0686 8.86949 15.0686 8.65099 15.1835L4.46725 17.383C3.91703 17.6723 3.27396 17.2051 3.37904 16.5924L4.17806 11.9337C4.21979 11.6904 4.13913 11.4422 3.96237 11.2699L0.577647 7.97057C0.13251 7.53667 0.378142 6.78069 0.993307 6.6913L5.67087 6.01161C5.91516 5.97612 6.12633 5.82269 6.23558 5.60133L8.32745 1.36274Z'
                fill='#FFA600'
              />
            </svg>
            <Text strong style={{ color: '#00000', fontSize: '20px' }}>
              {numberRating.toFixed(1)}
            </Text>
          </Flex>
        )}
      </>
    );
  };

  const ReviewInfoProductComponent = () => {
    return (
      <>
        {Boolean(review) && (
          <Flex gap={5} align='center' justify='center'>
            <Text style={{ color: '#8C8C8C', width: 'max-content' }}>
              {`${review} ${t('reviews')}`}
            </Text>
          </Flex>
        )}
      </>
    );
  };

  return (
    <Flex
      style={{ width: '100%', padding: '15px' }}
      gap={10}
      justify='space-between'
      align='center'
    >
      <Flex
        vertical
        justify='center'
        align='flex-start'
        style={{ width: '80%' }}
      >
        <RatingProductComponent />
        <ReviewInfoProductComponent />
      </Flex>
      <Flex>
          <Button onClick={() => setExpanded(true)}>
            <Text style={{ color: '#4954F0' }}>{t('smotret-vse-otzivy')}</Text>
          </Button>
      </Flex>
    </Flex>
  );
};

export default ProductDetailRating;
