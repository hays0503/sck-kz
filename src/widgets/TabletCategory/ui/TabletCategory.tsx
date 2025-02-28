"use client";

import React, { CSSProperties} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import { Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import style from "./TabletCategory.module.css";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
const { Text } = Typography;

const GRADIENTS = [
  {
    "key": "1",
    "name": "Модифицированный градиент с двумя сферами Роман/Сергей",
    "value": `radial-gradient(
              farthest-side at left bottom,
              rgba(102, 0, 153, 0.8) 0%,
              rgba(102, 0, 153, 0.35) 50%,
              rgba(102, 0, 153, 0.15) 70%,
              #fad35e 100%
            )
            left bottom / 50% 50% no-repeat,
            radial-gradient(
                farthest-side at right top,
                rgba(102, 0, 153, 0.8) 0%,
                rgba(102, 0, 153, 0.35) 50%,
                rgba(102, 0, 153, 0.15) 70%,
                #fad35e 100%
            )
            right top / 50% 50% no-repeat,
          #fad35e
          `,
    "textColor": "white"
  }
];

const CATEGORIES = [
  { id: 1, title: "Бытовая техника", image: "/tehnika.png", slug: "bytovaya-tehnika" },
  { id: 2, title: "ТВ, Аудио, Видео", image: "/tv.png", slug: "tv-audio-video" },
  { id: 3, title: "Мебель", image: "/mebel.png", slug: "mebel" },
  { id: 5, title: "Аксессуары", image: "/aksisuar.png", slug: "aksessuary" },
];


const SwiperSlideStyle = (gradient: string): CSSProperties => ({
  minWidth: 150,
  width: "fit-content",
  height: 100,
  borderRadius: 15,
  overflow: "hidden",
  border: "1px solid #e5e5e5",
  background: gradient,
});

const Row: React.FC<{ items: typeof CATEGORIES }> = ({ items }) => {

  const cityEn = useGetCityParams();

  return (
    <Flex className={style.container}>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        modules={[Grid]}
      >

        {items.map((category) => (
          <SwiperSlide
            key={category.id}
            style={SwiperSlideStyle(GRADIENTS[0].value)}  
          >
            <Link href={`/city/${cityEn}/catalog/menu/${category.slug}`}>
              <Flex vertical={true}
                style={{
                  padding: "10px",
                  width: "100%",
                  height: "100%"
                }}>
                <Text strong style={{ hyphens: "auto", width: "60%", color: "white" }}>
                  {category.title}
                </Text>
                <Flex justify="flex-end" className={style.imageContainer}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={80}
                    height={80}
                    className={style.blob}
                    priority
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

const TabletCategory: React.FC = () => (
  <Flex vertical className={style.wrapper}>
    <Row items={CATEGORIES} />
  </Flex>
);

export default TabletCategory;