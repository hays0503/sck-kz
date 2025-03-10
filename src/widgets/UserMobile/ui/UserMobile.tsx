"use client";

import { useUser } from "@/entities/User";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useReadLocalStorage } from "@undefined/usehooks-ts";
import { Button, Flex, Form, FormProps, Input, Typography, Upload } from "antd";
import { useTranslations } from "next-intl";
// import Image from "next/image";
import ImgCrop from 'antd-img-crop';

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
import type { ProgressProps } from 'antd';

const ImageUpload: React.FC<{ avatar_path: string, accessToken: string }> = ({ avatar_path, accessToken }) => {
  //   const [fileList, setFileList] = useState<UploadFile[]>([]);
    
  //   const onChange: UploadProps['onChange'] = ({ fileList: newFileList, event }) => {
  //   if (event?.percent === 100) {
  //     setFileList(newFileList);
  //     console.log(newFileList)
  //     if (window) {
  //       window.location.reload();
  //     }
  //   }
  // };



  return <ImgCrop cropShape="round" rotationSlider={false}>
    <Upload
      name="file"
      maxCount={1}
      action="/auth_api/v1/user/avatar"
      headers={{
        "accept": "application/json",
        Authorization: `Bearer ${accessToken}`
      }}
      // onChange={onChange}
      listType="picture-circle"
      // fileList={fileList}
      progress={{
        type: "circle",
      } as ProgressProps}
      showUploadList={false}
    >
      <Flex justify="center" align="center" style={{ width: "100%" }}>
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img style={{ width: 80, height: 80, borderRadius: "50%" }} alt="avatar" src={`${avatar_path === "avatar_default.png" ? "/sck-user.svg" : avatar_path}`} />
      </Flex>
    </Upload>
  </ImgCrop>
}


export default function UserMobile() {
  const cityEn = useGetCityParams();
  const t = useTranslations("UserMobile");
  const { isAnonymous, info } = useUser();
  const accessToken = useReadLocalStorage<{ token: string } | null>("accessToken");
  const isGuest = isAnonymous;


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



  return <Flex vertical={true} gap={10} align="center" justify="center" style={{ width: "100%", padding: "5px" }}>

    {
      info?.avatar_path
      && <ImageUpload avatar_path={info.avatar_path} accessToken={accessToken?.token ?? ""} />
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
