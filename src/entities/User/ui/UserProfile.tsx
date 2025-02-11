"use client";
import { useUser } from "../model";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { ResponseUserInfo } from "../api/getUserInfo";
import React from "react";


type UserProfileReturnValue = [
  React.ReactNode,
  ResponseUserInfo | null
]

export default function UserProfile():UserProfileReturnValue {
  const {isAnonymous,info} = useUser();
  return [
    <>
      <Avatar
        size={32}
        icon={<UserOutlined />}
        alt={isAnonymous ? "Аноним" : info?.username ?? ""}
      />
    </>,
    info,
  ];
}
