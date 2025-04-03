import Review from '@/entities/Reviews/ui/Review';
import { SendReviewComponent } from '@/features/add-reviews-to-product';
import { Button, Flex, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { CSSProperties, memo, useMemo, useState } from 'react';

interface ProductDetailReviewsProps {
  readonly product: MappedProductDetailType;
}

const { Text } = Typography;

const ProductDetailReviews: React.FC<ProductDetailReviewsProps> = ({
  product,
}) => {
  const [toggle, setToggle] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const { reviews } = product;
  const t = useTranslations('ProductDetailReviews');
  const styleHeader = useMemo(
    () =>
      ({
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '26px',
        letterSpacing: '-1.3%',
      }) as CSSProperties,
    [],
  );
  const styleText = useMemo(
    () =>
      ({
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '-1.3%',
        verticalAlign: 'bottom',
        color: '#464646',
      }) as CSSProperties,
    [],
  );

  const ReviewsList = memo(() => {
    const t = useTranslations('ProductDetailDescription');
    const One = () => {
      return (
        <Flex vertical style={{ width: '100%' }} gap={10}>
          <Review reviews={reviews[0]} />
          <Button
            onClick={() => {
              setExpandedDescription(!expandedDescription);
            }}
          >
            <Text style={{ color: '#4954F0' }} itemProp='description'>
              {expandedDescription ? t('svernut') : t('smotret-vse-opisanie')}
            </Text>
          </Button>
        </Flex>
      );
    };

    const All = () => {
      return (
        <Flex vertical style={{ width: '100%' }} gap={10}>
          <Button
            onClick={() => {
              setExpandedDescription(!expandedDescription);
            }}
          >
            <Text style={{ color: '#4954F0' }} itemProp='description'>
              {expandedDescription ? t('svernut') : t('smotret-vse-opisanie')}
            </Text>
          </Button>
          {reviews.map((review, index) => (
            <Review key={index} reviews={review} />
          ))}
        </Flex>
      );
    };

    return (
      <Flex vertical style={{ width: '100%' }} gap={10}>
        {expandedDescription ? <All /> : <One />}
      </Flex>
    );
  });
  ReviewsList.displayName = 'ReviewsList';

  const NoComments = memo(() => (
    <Flex vertical style={{ width: '100%' }} gap={10}>
      <Text style={styleText}>
        {t('u-etogo-tovara-eshe-net-otzyvov-vy-mozhete-ostavit-ego-pervym')}
      </Text>
    </Flex>
  ));
  NoComments.displayName = 'NoComments';

  return (
    <Flex
      vertical
      style={{ width: '100%', padding: '5px' }}
      gap={10}
      id='review'
    >
      <Text style={styleHeader}>{t('otzyvy')}</Text>
      <SendReviewComponent
        product={product}
        toggle={toggle}
        setToggle={setToggle}
      />
      {reviews.length === 0 ? <NoComments /> : <ReviewsList />}
    </Flex>
  );
};

export default ProductDetailReviews;
