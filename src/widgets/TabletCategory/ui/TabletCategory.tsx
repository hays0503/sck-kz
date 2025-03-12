"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Navigation } from "swiper/modules";

const { Text } = Typography;

const MixGroups = [
  {
    background: "#0163E1",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "#FF4B4B",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "#9737FF",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "#E101A1",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "#1CB0F6",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "#EE8B0B",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  
  
  {
    background: "linear-gradient(90deg, #0163E1 0%, #3C91FF 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "linear-gradient(180deg, #FF4B4B 0%, #FF8585 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "linear-gradient(90deg, #9737FF 0%, #AF64FF 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "linear-gradient(180deg, #E101A1 0%, #FF45CA 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "linear-gradient(180deg, #17ACF2 0%, #47C4FF 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  },
  {
    background: "linear-gradient(180deg, #E18001 0%, #FFAC40 100%)",
    Groups: [
      { imageNames: "fire.png", text: "Акции" },
      { imageNames: "TV.png", text: "ТВ, Аудио, Видео" },
      { imageNames: "sofa.png", text: "Мебель" },
      { imageNames: "friger.png", text: "Бытовая техника" },
      { imageNames: "accessories.png", text: "Аксессуары" }
    ]
  }

];

const Row: React.FC<{ setCurrentGroup: (groupIndex: number) => void }> = ({ setCurrentGroup }) => {
  const cityEn = useGetCityParams();

  const handleSlideChange = (swiper) => {
    const newGroupIndex = Math.floor(swiper.activeIndex / 5);
    setCurrentGroup(newGroupIndex);
  };

  return (
    <Flex>
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        slidesPerGroup={5}
        loop={false}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        navigation
        modules={[Navigation]}
      >
        {MixGroups.map(({ background, Groups }, groupIndex) =>
          Groups.map(({ imageNames, text }, index) => (
            <SwiperSlide key={`${groupIndex}-${index}`} style={{ width:65 }}>
              <Link href={`/city/${cityEn}/catalog/menu/mebel`}>
                <Flex vertical align="center" justify="center" gap={5}>
                  <Flex justify="center" align="center"
                    style={{ background, position: "relative", width: 65, height: 65, borderRadius: "10px" }}
                  >
                    <Image
                      src={`/TestPic/${imageNames}`}
                      alt={imageNames}
                      fill
                      priority
                    />
                  </Flex>
                  <Text style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "100%",
                    textAlign: "center"
                  }}>
                    {text}
                  </Text>
                </Flex>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Flex>
  );
};

const TabletCategory: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState(0);

  return (
    <Flex vertical gap={10}>
      <Row setCurrentGroup={setCurrentGroup} />
    </Flex>
  );
};

export default TabletCategory;