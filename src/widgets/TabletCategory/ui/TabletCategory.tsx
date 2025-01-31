"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import { Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
const categories = [
  { id: 1, title: "Бытовая техника", image: "/tehnika.png",slug:"bytovaya-tehnika" },
  { id: 2, title: "ТВ, Аудио, Видео", image: "/tv.png",slug:"tv-audio-video" },
  { id: 3, title: "Мебель", image: "/mebel.png",slug:"mebel" },
  // { id: 4, title: "Строительство, ремонт", image: "/stroitelstvo.png",slug:"scenicheskoe-oborudovanie" },
  { id: 5, title: "Аксессуары", image: "/aksisuar.png",slug:"aksessuary" },
];

const { Text } = Typography

import style from "./TabletCategory.module.css"
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";


const Row: React.FC<{ Items: { id: number, title: string, image: string,slug:string }[] }> = ({ Items }) => {
  const cityEn = useGetCityParams(); 
  const styleSwiperSlide = {
    minWidth: "150px",
    width: "fit-content",
    height: "100px",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    background: "linear-gradient(128deg, rgba(70,55,146,1) 0%, rgba(144,53,148,1) 43%, rgba(188,37,68,1) 100%)"
  } as React.CSSProperties

  return (
    <Flex style={{ width: "100%", height: "110px", backgroundColor: "transparent" }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        modules={[Grid]}
      >
        {Items.map((category) => (
          <SwiperSlide key={category.id} style={styleSwiperSlide}>
            <Link href={`/city/${cityEn}/catalog/category-slug/${category.slug}`}>
            <Flex vertical={true}
              style={{
                padding: "10px",
                width: "100%",
                height: "100%"
              }}>
              <Text strong style={{ hyphens: "auto", width: "60%", color: "#fff" }}>
                {category.title}
              </Text>
              <Flex justify="flex-end" style={{width:"100%"}}>
                <Image
                  src={category.image}
                  alt={category.title}
                  width={80}
                  height={80}
                  className={style.blob}               
                />
              </Flex>

            </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};


const TabletCategory: React.FC = () => {

  // const count = categories.length;
  // const half = Math.ceil(count / 2);
  // const Line1 = categories.slice(0, half);
  // const Line2 = categories.slice(half);

  return (
    <Flex align="start" justify="flex-end" vertical style={{ width: "100%", height: "110px" }}>
      <Row Items={categories} />
      {/* <Row Items={Line2} />/ */}
    </Flex>
  );
};


export default TabletCategory;