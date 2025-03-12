"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Typography, Flex } from "antd";
import Image from "next/image";
import "swiper/css";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Navigation } from "swiper/modules";

const { Text } = Typography;

const categories = [
  { image: "fire.png", text: "Акции",href:'main' },
  { image: "TV.png", text: "ТВ, Аудио, Видео",href:'tv-audio-video' },
  { image: "sofa.png", text: "Мебель",href:'mebel' },
  { image: "friger.png", text: "Бытовая техника",href:'bytovaya-tehnika' },
  { image: "accessories.png", text: "Аксессуары",href:'main' }
];

const backgrounds = [
  "#0163E1", "#FF4B4B", "#9737FF", "#E101A1", "#1CB0F6", "#EE8B0B",
  "linear-gradient(90deg, #0163E1 0%, #3C91FF 100%)",
  "linear-gradient(180deg, #FF4B4B 0%, #FF8585 100%)",
  "linear-gradient(90deg, #9737FF 0%, #AF64FF 100%)",
  "linear-gradient(180deg, #E101A1 0%, #FF45CA 100%)",
  "linear-gradient(180deg, #17ACF2 0%, #47C4FF 100%)",
  "linear-gradient(180deg, #E18001 0%, #FFAC40 100%)"
];

const Row = () => {
  const cityEn = useGetCityParams();


  return (
    <Flex>
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        slidesPerGroup={5}
        navigation
        modules={[Navigation]}
      >
        {backgrounds.map((background, groupIndex) =>
          categories.map(({ image, text,href }, index) => (
            <SwiperSlide key={`${groupIndex}-${index}`} style={{ width: 65 }}>
              <Link href={`/city/${cityEn}/catalog/menu/${href}`}>
                <Flex vertical align="center" gap={5}>
                  <Flex
                    justify="center"
                    align="center"
                    style={{ background, width: 65, height: 65, borderRadius: 10,position:"relative" }}
                  >
                    <Image src={`/TestPic/${image}`} alt={text} fill priority />
                  </Flex>
                  <Text style={{ fontSize: 12, textAlign: "center" }}>{text}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Flex>
  );
};

const TabletCategory = () => {

  return (
    <Flex vertical gap={10}>
      <Row/>
    </Flex>
  );
};

export default TabletCategory;
