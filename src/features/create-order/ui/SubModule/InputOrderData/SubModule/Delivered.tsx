import { Button, Flex, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { message } from 'antd';
import { IOrderCreate } from '@/shared/types/order';

interface IDeliveredProps {
  setStep: Dispatch<React.SetStateAction<number>>;
  orderManager: [IOrderCreate, Dispatch<SetStateAction<IOrderCreate>>];
}

const Delivered: React.FC<IDeliveredProps> = ({ setStep, orderManager }) => {
  const t = useTranslations('Delivered');
  const [messageApi, contextHolder] = message.useMessage();

  const [formAddress] = Form.useForm();
  const [formComment] = Form.useForm();

  const Submit = () => {
    formAddress
      .validateFields()
      .then(() => {
        const address = formAddress.getFieldsValue();
        const comment = formComment.getFieldsValue();
        const [order, setOrder] = orderManager;
        const delivery_address = `Улица=[${address.street}] Дом=[${address.house}] Квартира=[${address.apartment}] Подъезд=[${address.train}] Этаж=[${address.floor}]`;
        setOrder({
          ...order,
          delivery_address: delivery_address,
          comment: comment.comment,
        });
        setStep(3);
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: t('zapolnite-pole'),
        });
      });
  };

  const RulesSet = useMemo(() => ({
    street: [
      { required: true, message: t('validation.street.required') },
      { min: 2, message: t('validation.street.min') },
      { max: 100, message: t('validation.street.max') },
    ],
    house: [
      { required: true, message: t('validation.house.required') },
      { pattern: /^[\w-]{1,10}$/, message: t('validation.house.invalid') },
    ],
    apartment: [
      { required: true, message: t('validation.apartment.required') },
      { pattern: /^[\w-]{1,10}$/, message: t('validation.apartment.invalid') },
    ],
    train: [
      { pattern: /^[0-9]{0,2}$/, message: t('validation.train.invalid') },
    ],
    floor: [
      { pattern: /^[0-9]{0,2}$/, message: t('validation.floor.invalid') },
    ],
    comment:[
    { max: 300, message: t('validation.comment.max') }
  ]
  }), [t]);

  return (
    <Flex vertical>
      {contextHolder}
      <Flex gap={5} vertical>
        <Form
          form={formAddress}
          layout='vertical'
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '10px',
          }}
        >
          <Form.Item
            label={t('ulica')}
            name='street'
            rules={RulesSet.street}
            required={true}
          >
            <Input placeholder='Уолл-стрит' />
          </Form.Item>
          <Form.Item
            label={t('dom')}
            name='house'
            rules={RulesSet.house}
            required={true}
          >
            <Input placeholder='10' />
          </Form.Item>
          <Form.Item
            label={t('kvartira-ofis')}
            name='apartment'
            rules={RulesSet.apartment}
            required={true}
          >
            <Input placeholder='1' />
          </Form.Item>
          <Form.Item label={t('podezd')} name='train' rules={RulesSet.train}>
            <Input placeholder='1' />
          </Form.Item>
          <Form.Item label={t('etazh')} name='floor' rules={RulesSet.floor}>
            <Input placeholder='1' />
          </Form.Item>
        </Form>
        <Form layout='vertical' form={formComment}>
          <Form.Item label={t('kommentarii-dlya-kurera')} name='comment' rules={RulesSet.comment}>
            <Input.TextArea placeholder={t('kommentarii')} />
          </Form.Item>
        </Form>
        <Button type='primary' onClick={Submit}>
          {t('potverdet')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Delivered;
