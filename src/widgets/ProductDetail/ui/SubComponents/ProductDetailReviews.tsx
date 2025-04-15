import Review from '@/entities/Reviews/ui/Review';
import { SendReviewComponent } from '@/features/add-reviews-to-product';
import { Button, Flex, Modal, Typography } from 'antd';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { CSSProperties, memo, useMemo, useState } from 'react';

interface ProductDetailReviewsProps {
  readonly product: MappedProductDetailType;
  readonly expanded: boolean;
  readonly setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const { Text } = Typography;

const ProductDetailReviews: React.FC<ProductDetailReviewsProps> = ({
  product,
  expanded,
  setExpanded,
}) => {
  const [toggle, setToggle] = useState(false);

  const { reviews } = product;
  const t = useTranslations('ProductDetailReviews');
  // const styleHeader = useMemo(
  //   () =>
  //     ({
  //       fontWeight: '500',
  //       fontSize: '18px',
  //       lineHeight: '26px',
  //       letterSpacing: '-1.3%',
  //     }) as CSSProperties,
  //   [],
  // );
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

    const All = () => {
      if (!reviews) return <NoComments />;
      if (reviews.length === 0) return <NoComments />;

      const styleButton = {
        width: '100%',
        height: '40px',
        padding: '8px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
      };

      return (
        <Modal
          footer={null}
          okText={null}
          cancelText={null}
          closeIcon={null}
          mask={true}
          maskClosable={true}
          onCancel={() => setExpanded(!expanded)}
          onClose={() => setExpanded(!expanded)}
          open={expanded}
          styles={{ body: { width: '100%', top: '0', padding: '0' } }}
        >
          <Flex vertical gap={10}>
            <Flex
              vertical
              style={{
                width: 'auto',
                height: '50dvh',
                scrollBehavior: 'smooth',
                overflowX: 'clip',
                overflowY: 'scroll',
                padding: '10px',
              }}
              gap={10}
            >
              {reviews.map((review, index) => (
                <Review key={index} reviews={review} />
              ))}
            </Flex>
            <SendReviewComponent
              product={product}
              toggle={toggle}
              setToggle={setToggle}
            />
            <Button
              style={styleButton}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <Text style={{ color: '#4954F0' }} itemProp='description'>
                {expanded ? t('svernut') : t('smotret-vse-opisanie')}
              </Text>
            </Button>
          </Flex>
        </Modal>
      );
    };

    return (
      <Flex vertical style={{ width: '100%' }} gap={10}>
        <All />
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
      style={{ width: '100%'}}
      gap={10}
      id='review'
    >
      <ReviewsList />
    </Flex>
  );
};

export default ProductDetailReviews;
