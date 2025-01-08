"use server";
import React from "react";
import Image from "next/image";
import style from "./InDevelopPlug.module.css";
import { getTranslations } from "next-intl/server";

const InDevelopPlug = async () => {
  const t = await getTranslations("InDevelopPlug");

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={`${style.logo} ${style.animateBounce}`}>
          <Image src="/logo.svg" alt="SCK Logo" width={150} height={150} />
        </div>
        <h1 className={`${style.title} ${style.animateFadeIn}`}>{t("stranica-v-razrabotke")}</h1>
        <p className={`${style.description} ${style.animateFadeIn}`}>{t("pozhaluista-vernites-pozdnee")}</p>
      </div>
    </div>
  );
};

export default InDevelopPlug;
