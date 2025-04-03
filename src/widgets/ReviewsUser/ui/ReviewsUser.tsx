'use client';

import useGetProductByIdsSWR from '@/entities/Product/model/getProductByIdsSWR';
import useGetReviewsByUserIdSWR from '@/entities/Reviews/model/getReviewsByUserIdSWR';
import Review from '@/entities/Reviews/ui/Review';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Reviews } from '@/shared/types/reviews';
import { Divider, Flex, Typography } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { CSSProperties, useMemo } from 'react';

const { Text } = Typography;
interface IReviewsUserProps {
  readonly user_id: string | undefined | null;
}

const ReviewsUser: React.FC<IReviewsUserProps> = ({ user_id }) => {
  const cityEn = useGetCityParams();
  const {
    data: ReviewsData,
    isLoading,
    error,
  } = useGetReviewsByUserIdSWR(user_id);

  const locale = useLocale();

  if (isLoading) {
    return <Flex>Загрузка</Flex>;
  }

  if (error) {
    return <Flex>Ошибка {JSON.stringify({ error })}</Flex>;
  }

  const ReviewToProduct: React.FC<{
    review: Reviews;
  }> = ({ review }) => {
    const {
      data: productData,
      isLoading: isLoadingProducts,
      error: errorProducts,
    } = useGetProductByIdsSWR({
      ids: [review.product],
      city: cityEn,
      orderBy: 'avg_rating',
      page: 1,
    });

    const styleText = useMemo(
      () =>
        ({
          fontWeight: ' 500',
          fontSize: '18px',
          lineHeight: '26px',
          letterSpacing: '-0.6%',
          verticalAlign: 'bottom',
        }) as CSSProperties,
      [],
    );

    if (isLoadingProducts) {
      return <Flex>Загрузка</Flex>;
    }

    if (errorProducts) {
      return <Flex>Ошибка {JSON.stringify({ errorProducts })}</Flex>;
    }

    const product = productData?.results?.[0];
    const img = product?.img?.[0] ?? '/nofoto.jpg';
    const name = product?.name?.[locale];



    return (
      <>
        {productData?.results && (
          <Flex vertical style={{ width: '100%', padding: '10px' }} gap={10}>
            <Link
              href={`/city/${cityEn}/product/${product?.slug}`}
              prefetch={true}
            >
              <Flex
                justify='flex-start'
                align='center'
                style={{ width: '100%' }}
                gap={10}
              >
                <Flex
                  style={{
                    width: '20%',
                    height: '100px',
                    padding: '10px',
                    position: 'relative',
                    border: '1px solid gray',
                  }}
                >
                  <Image
                    src={img}
                    alt={name ?? img ?? 'product'}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Flex>
                <Text style={styleText}>{product?.name?.[locale]}</Text>
              </Flex>
            </Link>

            <Review
              reviews={{
                rating: review.rating,
                review:
                  review.review ??
                  'Что то пошло не так и мы потеряли комментарий пользователя',
                createdAt: new Date(),
              }}
            />
          </Flex>
        )}
      </>
    );
  };

  if(ReviewsData?.data?.length==0){
    return <Text style={{ fontWeight: ' 500', fontSize: '18px', lineHeight: '26px', letterSpacing: '-0.6%', verticalAlign: 'bottom' }}>{t('pokhozhe-vy-eshe-ne-uspeli-ostavit-otzyv')}</Text>
  }

  return (
    <Flex vertical>
      {ReviewsData?.data?.map((rev: Reviews, index: number) => (
        <Flex key={index} vertical>
          <ReviewToProduct key={index} review={rev} />
          <Divider />
        </Flex>
      ))}
    </Flex>
  );
};
export default ReviewsUser;
