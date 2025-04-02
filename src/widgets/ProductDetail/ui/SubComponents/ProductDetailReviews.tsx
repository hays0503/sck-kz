import { UrlApiV1 } from '@/shared/constant/url';
import { useReadLocalStorage } from '@undefined/usehooks-ts';
import { Button, Flex, Input, message, Rate, Typography } from 'antd';
import {
  MappedProductDetailReviewsType,
  MappedProductDetailType,
} from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { CSSProperties, memo, useCallback, useMemo, useState } from 'react';

interface ProductDetailReviewsProps {
  readonly product: MappedProductDetailType;
}

const { Text } = Typography;

const ProductDetailReviews: React.FC<ProductDetailReviewsProps> = ({
  product,
}) => {
  const [toggle, setToggle] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const accessToken = useReadLocalStorage<{ token: string }>('accessToken');

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

  const Review = memo(
    ({ reviews }: { reviews: MappedProductDetailReviewsType }) => {
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
              <Rate value={reviews.rating} style={{ fontSize: '16px' }} />
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

  const SendReviewComponent = () => {
    const Send = useCallback(() => {
      messageApi.loading(t('otpravka'), 2);
      const urlReviewSend = `${UrlApiV1.getProducts}reviews/`;
      fetch(urlReviewSend, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt_token: accessToken?.token,
          product: product?.id,
          rating: rating,
          review: comment,
        }),
      }).then((response) => {
        if (response.ok) {
          setToggle(false);
          messageApi.success(t('otzyv-uspeshno-otpravlen'), 3);
        } else {
          messageApi.error(t('otzyv-ne-otpravlen'), 10);
          messageApi.error(response.statusText, 10);
          messageApi.error(response.status, 10);
        }
      });
    }, []);

    if (!toggle) {
      return (
        <Button type='primary' onClick={() => setToggle(true)}>
          {t('ostavit-otzyv')}
        </Button>
      );
    }

    return (
      <Flex gap={5} vertical>
        {contextHolder}
        <Flex gap={3} align='center'>
          <Text>{t('naskolko-vam-ponravilsya-tovar')}</Text>
          <Rate
            style={{ fontSize: '10px' }}
            value={rating}
            onChange={setRating}
          />
        </Flex>
        <Input.TextArea
          rows={4}
          placeholder={t('otzyv')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type='primary' onClick={Send}>
          {t('otpravit')}
        </Button>
      </Flex>
    );
  };

  const ReviewsList = memo(() => {
    return (
      <Flex vertical style={{ width: '100%' }}>
        <SendReviewComponent />
        {reviews.map((review, index) => (
          <Review key={index} reviews={review} />
        ))}
      </Flex>
    );
  });
  ReviewsList.displayName = 'ReviewsList';

  const NoComments = memo(() => (
    <Flex vertical style={{ width: '100%' }} gap={10}>
      <SendReviewComponent />
      <Text style={styleText}>
        {t('u-etogo-tovara-eshe-net-otzyvov-vy-mozhete-ostavit-ego-pervym')}
      </Text>
    </Flex>
  ));
  NoComments.displayName = 'NoComments';

  return (
    <Flex vertical style={{ width: '100%', padding: '5px' }} gap={10}>
      <Text style={styleHeader}>{t('otzyvy')}</Text>
      {reviews.length === 0 ? <NoComments /> : <ReviewsList />}
    </Flex>
  );
};

export default ProductDetailReviews;
