import { IOrderCreate } from '@/shared/types/order';
import { Button, Flex, Form, Input, message } from 'antd';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface IRecipientProps {
  setStep: Dispatch<React.SetStateAction<number>>;
  orderManager: [IOrderCreate, Dispatch<SetStateAction<IOrderCreate>>];
}

const Recipient: React.FC<IRecipientProps> = ({ setStep, orderManager }) => {
  const t = useTranslations('Recipient');
  const [messageApi, contextHolder] = message.useMessage();
  const [formUserInfo] = Form.useForm();

  const Submit = () => {
    formUserInfo
      .validateFields()
      .then(() => {
        const userInfo = formUserInfo.getFieldsValue();
        const [order, setOrder] = orderManager;

        const user = `Фамилия=[${userInfo.lastName}] Имя=[${userInfo.firstName}] Отчество=[${userInfo.middleName}]`;
        setOrder({
          ...order,
          user_full_name: user,
          phone_number: userInfo.phone,
          email: userInfo.email,
        });
        console.log(order);
        setStep(4);
      })
      .catch(() => {
        messageApi.open({
          type: 'error',
          content: t('zapolnite-pole'),
        });
      });
  };

  const PatternName = useMemo(() => (/^[a-zA-Zа-яА-ЯёЁ-]+$/), []);

  const RulesSet = useMemo(
    () => ({
      lastName: [
        { required: true, message: t('validation.lastName.required') },
        { min: 2, message: t('validation.lastName.min') },
        { max: 50, message: t('validation.lastName.max') },
        {
          pattern: PatternName, message: t('validation.lastName.pattern'),
        },
      ],
      firstName: [
        { required: true, message: t('validation.firstName.required') },
        { min: 2, message: t('validation.firstName.min') },
        { max: 50, message: t('validation.firstName.max') },
        {
          pattern: PatternName, message: t('validation.firstName.pattern'),
        },
      ],
      middleName: [{ max: 50, message: t('validation.middleName.max') },
        {
          pattern: PatternName, message: t('validation.middleName.pattern'),
        },
      ],
      phone: [
        { required: true, message: t('validation.phone.required') },
        {
          pattern:
            /^(71[0-8]|72[1-9]|73622|70\d|747|75\d|76[0-4]|771|77[5-8])\d{7}$/,
          message: t('validation.phone.invalid'),
        },
      ],
      email: [
        { required: true, message: t('validation.email.required') },
        { type: 'email' as const, message: t('validation.email.invalid') },
      ],
    }),
    [PatternName, t],
  );

  return (
    <Flex vertical>
      {contextHolder}
      <Flex gap={5} vertical>
        <Form
          form={formUserInfo}
          layout='vertical'
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '10px',
          }}
        >
          <Form.Item
            label='Фамилия'
            name='lastName'
            rules={RulesSet.lastName}
            required
          >
            <Input placeholder='Гео' />
          </Form.Item>

          <Form.Item
            label='Имя'
            name='firstName'
            rules={RulesSet.firstName}
            required
          >
            <Input placeholder='Георгии' />
          </Form.Item>

          <Form.Item
            label='Отчество'
            name='middleName'
            rules={RulesSet.middleName}
          >
            <Input placeholder='Георгиевич' />
          </Form.Item>

          <Form.Item
            label='Номер телефона'
            name='phone'
            rules={RulesSet.phone}
            required
          >
            <Input placeholder='8 776 341 91 15' />
          </Form.Item>

          <Form.Item
            label='E-mail'
            name='email'
            rules={RulesSet.email}
            required
          >
            <Input placeholder='main@mail.kz' />
          </Form.Item>
        </Form>
        <Button type='primary' onClick={Submit}>
          {t('potverdet')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Recipient;
