import { UrlApiV1 } from '@/shared/constant/url';
import { useReadLocalStorage } from '@undefined/usehooks-ts';
import { Button, Flex, Input, message, Rate, Typography } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { MappedProductDetailType } from 'api-mapping/product/_type/productDetail';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';

const { Text, Paragraph } = Typography;

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
  const [rating, setRating] = useState(5);
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
  }, [accessToken?.token, messageApi, product?.id, rating, setToggle, t]);

  const styleButton = {
    backgroundColor: '#4954f0',
    width: '100%',
    height: '40px',
    padding: '11px 16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    color: '#fff',
  };

  if (!toggle) {
    return (
      <Button style={styleButton} onClick={() => setToggle(true)}>
        {t('ostavit-otzyv')}
      </Button>
    );
  }

  return (
    <Flex gap={5} vertical>
      {contextHolder}
      <Flex vertical align='center' justify='center'>
        <Paragraph style={{ textAlign: 'center',verticalAlign: 'middle', width: '100%',height:"auto",margin:"1px" }}>
          <Text disabled style={{textAlign:"center",verticalAlign: 'middle'}}>{t('naskolko-vam-ponravilsya-tovar')}:</Text>
        </Paragraph>
        <Rate
          defaultValue={5}
          style={{ fontSize: '28px',color:"#FFA600" }}
          value={rating}
          onChange={setRating}
        />
      </Flex>
      <Input.TextArea rows={4} placeholder={t('otzyv')} ref={refInput} />
      <Button style={styleButton} onClick={Send}>
        {t('otpravit')}
      </Button>
    </Flex>
  );
};

export default SendReviewComponent;
