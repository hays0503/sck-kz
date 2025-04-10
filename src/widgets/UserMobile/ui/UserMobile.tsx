'use client';

import { useUser } from '@/entities/User';
import { Link, useRouter } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { useReadLocalStorage } from '@undefined/usehooks-ts';
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Space,
  Typography,
  Upload,
} from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CircleStencil,
  //  Cropper, CropperRef
   } from 'react-mobile-cropper';
import { FixedCropper, FixedCropperRef,
  //  ImageRestriction 
  } from 'react-advanced-cropper';


import 'react-mobile-cropper/dist/style.css';

const { Title, Text } = Typography;
const changeData = async (
  NewData: {
    username: string;
    email: string;
  },
  token: string,
) => {
  const data = await fetch('/auth_api/v2/user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(NewData),
  });
  console.log('Patch data', data);
};


const ImageUpload: React.FC<{
  avatar_path: string;
  accessToken: string;
  refetch: () => void;
  user_id: string;
}> = memo(({ avatar_path, accessToken, refetch, user_id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const cropperRef = useRef<FixedCropperRef>(null);
  const [image, setImage] = useState<string | null>(avatar_path);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('ImageUpload');
  const route = useRouter();
  const cityEn = useGetCityParams();

  const handleUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setIsModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    return false;
  }, []);

  const uploadCroppedImage = useCallback(
    async (dataUrl: string) => {
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('file', blob, 'avatar.png');

      try {
        const response = await fetch('/auth_api/v2/user/avatar', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          response.text().then((text) =>
            messageApi.open({
              type: 'error',
              content: `Произошла ошибка при загрузке изображения ${response.status} ${text}`,
            }),
          );
        } else {
          messageApi.open({
            type: 'success',
            content: 'Изображение успешно загружено',
          });
          setIsModalOpen(false);
          route.push(`/city/${cityEn}/profile/${user_id}`);
        }

        if (response.ok) {
          refetch();
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    },
    [route, cityEn, accessToken, refetch, messageApi, user_id],
  );

  const handleCrop = useCallback(() => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();

      if (canvas) {
        const maxSize = 256;
        let { width, height } = canvas;
        if (width > maxSize || height > maxSize) {
          const scale = Math.min(maxSize / width, maxSize / height);
          width = Math.floor(width * scale);
          height = Math.floor(height * scale);
        }
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = width;
        resizedCanvas.height = height;
        const ctx = resizedCanvas.getContext('2d');
        ctx?.drawImage(canvas, 0, 0, width, height);
        const croppedDataUrl = resizedCanvas.toDataURL('image/jpeg', 0.8);

        uploadCroppedImage(croppedDataUrl);
      }
    }
  }, [uploadCroppedImage]);

  return (
    <>
      {contextHolder}
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Image
          width={160}
          height={160}
          alt='avatar'
          src={avatar_path}
          style={{ borderRadius: '50%' }}
        />
      </Upload>
      <Modal
        style={{
          width: '95dvw',
          height: '95dvh',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        title={t('redaktirovat-izobrazhenie')}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <FixedCropper
          stencilSize={{
            width:256,
            height:256
          }}        
          stencilProps={{
            handlers: false,
            lines: false,
            rotate: false,
          }}
          stencilComponent={CircleStencil}
          ref={cropperRef}
          // ref={cropperRef}
          src={image}
          className='cropper'
          style={{
            width: '100%',
            height: 300,
          } as React.CSSProperties}
        />
        <Space style={{ marginTop: 10 }}>
          <Button onClick={handleCrop} type='primary'>
            {t('obrezat-i-zagruzit')}
          </Button>
          <Button onClick={() => setIsModalOpen(false)} danger>
            {t('zakryt')}
          </Button>
        </Space>
      </Modal>
    </>
  );
});
ImageUpload.displayName = 'ImageUpload';

export default function UserMobile() {
  const cityEn = useGetCityParams();
  const t = useTranslations('UserMobile');
  const { isAnonymous, info, reFetchUserInfo } = useUser();
  const accessToken = useReadLocalStorage<{ token: string,user_id: string } | null>(
    'accessToken',
  );
  const isGuest = isAnonymous;
  const [img, setImg] = useState<string>('/sck-user.svg');

  useEffect(() => {
    const isDefault: boolean = Boolean(
      String(info?.avatar_path ?? 'avatar_default.png') == 'avatar_default.png',
    );
    if (isDefault) setImg('/sck-user.svg');
    if (!isDefault) setImg(`${info?.avatar_path}/?time=${Date.now()}`);
  }, [info]);

  const EnterGuest = useMemo(() => {
    return (
      <Flex vertical={true} gap={5} align='center' style={{ width: '100%' }}>
        <Flex
          gap={5}
          vertical
          align='center'
          justify='center'
          style={{ width: '100%' }}
        >
          <Title level={4}>{t('gost')}</Title>{' '}
          <Link href={`/city/${cityEn}/login`}>{t('authorization')}</Link>
        </Flex>
      </Flex>
    );
  }, [t, cityEn]);

  const formProps = useMemo<FormProps>(
    () => ({
      name: t('profile'),
      autoComplete: 'on',
      layout: 'vertical',
      style: { width: '100%' },
      onFinish: async (values) => {
        if (accessToken) {
          await changeData(values, accessToken.token);
        }
      },
    }),
    [t, accessToken],
  );

  if (isGuest) {
    return EnterGuest;
  }

  return (
    <Flex
      vertical={true}
      gap={10}
      align='center'
      justify='center'
      style={{ width: '100%', padding: '5px' }}
    >
      <ImageUpload
        avatar_path={img}
        accessToken={accessToken?.token ?? ''}
        refetch={reFetchUserInfo}
        user_id={accessToken?.user_id ?? ''}
      />

      {info && (
        <Form {...formProps}>
          <Form.Item
            name='username'
            label={t('name')}
            initialValue={info?.username}
          >
            <Input placeholder='Укажите логин' />
          </Form.Item>
          <Form.Item name='email' label={t('email')} initialValue={info?.email}>
            <Input placeholder={t('ukazhite-svoi-email')} />
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '100%', height: '40px' }}
          >
            <Text style={{ color: '#ffff' }}>{t('save')}</Text>
          </Button>
        </Form>
      )}
    </Flex>
  );
}
