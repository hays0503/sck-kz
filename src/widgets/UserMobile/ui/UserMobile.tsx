"use client";

import { useUser } from "@/entities/User";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { Avatar, Button, Flex, Form, FormProps, Input, Typography, Upload } from "antd";
import { useTranslations } from "next-intl";
// import Image from "next/image";
import ImgCrop from 'antd-img-crop';
import { useState } from "react";

const { Title, Text } = Typography;

const changeData = async (NewData: {
  "username": string,
  "email": string
}, token: string) => {
  const data = await fetch("/auth_api/v1/user/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(NewData)
  })
  console.log("Patch data", data);
};
import type { ProgressProps, UploadFile, UploadProps } from 'antd';


export default function UserMobile() {
  const cityEn = useGetCityParams();
  const t = useTranslations("UserMobile");
  const { isAnonymous, info } = useUser();
  const accessToken = useReadLocalStorage<{ token: string } | null>("accessToken");
  const isGuest = isAnonymous;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const enterGuest = () => {
    return <Flex vertical={true} gap={5} align="center" style={{ width: "100%" }}>
      <Flex gap={5} vertical align="center" justify="center" style={{ width: "100%" }}>
        <Title level={4} >{t('gost')}</Title> <Link href={`/city/${cityEn}/login`}>{t('authorization')}</Link>
      </Flex>
    </Flex>
  }

  if (isGuest) {
    return enterGuest();
  }

  const formProps: FormProps = {
    name: t('profile'),
    autoComplete: "on",
    layout: "vertical",
    style: { width: "100%" },
    onFinish: async (values) => {
      if (accessToken) {
        await changeData(values, accessToken.token);
      }
    }

  };



  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, event }) => {
    setFileList(newFileList);
    if (event?.percent === 100) {
      console.log(newFileList)
      if (window) {
        window.location.reload();
      }
    }
  };



  return <Flex vertical={true} gap={10} align="center" justify="center" style={{ width: "100%", padding: "5px" }}>
    {
      info?.avatar_path && <ImgCrop rotationSlider cropShape="round">
        <Upload
          name="file"
          maxCount={1}
          action="/auth_api/v1/user/avatar"
          headers={{
            "accept": "application/json",
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken?.token}`
          }}
          onChange={onChange}
          listType="picture-circle"
          fileList={fileList}
          progress={{
            type: "circle",
          } as ProgressProps}
          showUploadList={false}
        >
          <Flex justify="center" align="center" style={{ width: "100%" }}>
            <Avatar size={100} alt="avatar" src={`${info.avatar_path === "avatar_default.png" ? "/sck-user.svg" : info.avatar_path}`} />
          </Flex>

        </Upload>
      </ImgCrop>
    }

    {info && <Form {...formProps} >
      <Form.Item name="username" label={t('name')} initialValue={info?.username}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label={t('email')} initialValue={info?.email}>
        <Input />
      </Form.Item>
      {/* <Form.Item name="phone_number" label={t('phone')}>
        <Input />
      </Form.Item> */}
      <Button type="primary" htmlType="submit" style={{ width: "100%", height: "40px" }}>
        <Text style={{ color: "#ffff" }}>{t('save')}</Text>
      </Button>
    </Form>}
  </Flex>;
}
