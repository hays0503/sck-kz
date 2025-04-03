import { UrlApiV1 } from '@/shared/constant/url';
import { useReadLocalStorage } from '@undefined/usehooks-ts';
import { Button, Flex, Input, message, Rate,Typography } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';

const { Text } = Typography

interface ISendReviewComponent {
  readonly product: MappedProductDetailType;
  readonly toggle: boolean;
  readonly setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendReviewComponent: React.FC<ISendReviewComponent> = ({
  product,
  toggle,
  setToggle,
}) => {
  const accessToken = useReadLocalStorage<{ token: string }>('accessToken');
  const [rating, setRating] = useState(0);
  const t = useTranslations('ProductDetailReviews');
  const [messageApi, contextHolder] = message.useMessage();
  const refInput = useRef<TextAreaRef>(null);
  const Send = useCallback(() => {
    messageApi.loading(t('otpravka'), 2);
    const urlReviewSend = `${UrlApiV1.getProductReviews}`;
    fetch(urlReviewSend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt_token: accessToken?.token,
        product: product?.id,
        rating: rating,
        review: refInput.current?.resizableTextArea?.textArea?.value,
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
      <Input.TextArea rows={4} placeholder={t('otzyv')} ref={refInput} />
      <Button type='primary' onClick={Send}>
        {t('otpravit')}
      </Button>
    </Flex>
  );
};

export default SendReviewComponent;
