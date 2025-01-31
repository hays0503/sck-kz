import { Dispatch, SetStateAction, useState } from 'react';
import { Flex, Radio,RadioChangeEvent,Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { IOrderCreate } from '@/shared/types/order';


const { Text } = Typography

interface IPaymentOptionsProps {
  setStep: Dispatch<React.SetStateAction<number>>,
  orderManager: [IOrderCreate, Dispatch<SetStateAction<IOrderCreate>>]
}

const PaymentOptions: React.FC<IPaymentOptionsProps> = ({ setStep,orderManager }) => {
  const t  =  useTranslations("PaymentOptions");
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e:RadioChangeEvent) => {
    const [order, setOrder] = orderManager;
    setOrder({ ...order, payment_type: e.target.value });
    setPaymentMethod(e.target.value);
    setStep(2);
  };

  

  const paymentOptions = {
    'online_payment': 'ONLINE',
    'cash_on_delivery': 'OFFLINE',
  }

  return (
    <Flex vertical>
      <Radio.Group
        onChange={handlePaymentChange}
        value={paymentMethod}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <Radio
          value={paymentOptions["online_payment"]}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `3px solid ${paymentMethod === paymentOptions["online_payment"] ? '#715EFF' : '#DFDFE0'}`,
            borderRadius: '5px',
            padding: '10px'
          }}
        >
          <Text>{t('onlain-oplata')}</Text>
        </Radio>
        <Radio
          value={paymentOptions["cash_on_delivery"]}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `3px solid ${paymentMethod === paymentOptions["cash_on_delivery"] ? '#715EFF' : '#DFDFE0'}`,
            borderRadius: '5px',
            padding: '10px'
          }}
        >
          <Text>{t('oplata-pri-poluchenii')}</Text>
        </Radio>
      </Radio.Group>
    </Flex>
  );
};

export default PaymentOptions;