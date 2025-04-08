'use client';
import { Flex, Rate, Typography } from 'antd';
import { MappedProductDetailReviewsType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { CSSProperties, memo, useMemo } from 'react';

const { Text } = Typography;

const Review = memo(
  ({ reviews }: { reviews: MappedProductDetailReviewsType }) => {
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
    const t = useTranslations('ProductDetailReviews');
    const date = new Date(reviews.createdAt);
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    const formattedDate = year + '.' + month + '.' + day;
    return (
      <Flex vertical style={{ width: '100%', padding: '5px' }}>
        <Flex justify='space-between' style={{ width: '100%' }}>
          <Flex gap={5} align='center'>
            <Text strong style={{ fontSize: '16px' }}>
              {reviews.rating}
            </Text>
            <Text disabled>{t('iz5')}</Text>
            <Rate value={reviews.rating} style={{ fontSize: '16px', color: '#FFA600' }} />
          </Flex>
          <Flex gap={5} align='center'>
            <Text
              style={{
                color: '#8C8C8C',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >{`${t('opyblikovano')}:`}</Text>
            <Text style={{ color: '#19b275' }}>{formattedDate}</Text>
          </Flex>
        </Flex>
        <Text style={styleText}>{reviews.review}</Text>
      </Flex>
    );
  },
);
Review.displayName = 'Review';

export default Review;
