"use client";

import React, { CSSProperties, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import { Dropdown, Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import style from "./TabletCategory.module.css";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MenuProps } from "antd/lib";

const { Text } = Typography;

const GRADIENTS = [
  {
    key: '0',
    name: "По умолчанию",
    value: "linear-gradient(128deg, rgba(70,55,146,1) 0%, rgba(144,53,148,1) 43%, rgba(188,37,68,1) 100%)",
    textColor: "white"
  },
  {
    key: '1',
    name: "Как у FreedomBank",
    value: "linear-gradient(45deg, rgb(8 185 187 / 85%) 0%, rgb(202 216 217) 35%, rgb(210 218 220) 70%, rgb(75 198 196 / 83%) 100%)",
    textColor: "#161e20"
  },
  {
    key: '2',
    name: "Как у FreedomBank но цвет SCK",
    value: "linear-gradient(45deg,rgba(255, 200, 0, 0.63) 0%, #FEFEFE 35%, #FEFEFE 70%,rgba(255, 200, 0, 0.63) 100%)",
    textColor: "#161e20"
  },
  {
    key: '3',
    name: "Фиолетово-красный",
    value: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    textColor: "white"
  },
  {
    key: '4',
    name: "Оранжево-желтый",
    value: "linear-gradient(45deg, rgba(255,193,12,1) 0%, rgba(170,49,135,1) 50%, rgba(255,193,12,1) 100%)",
    textColor: "white"
  },
  {
    key: '5',
    name: "Сине-фиолетовый",
    value: "linear-gradient(135deg, rgba(51,51,255,1) 0%, rgba(153,102,255,1) 100%)",
    textColor: "white"
  },
  {
    key: '6',
    name: "Зеленый-оранжевый",
    value: "linear-gradient(90deg, rgba(0,204,102,1) 0%, rgba(255,102,0,1) 100%)",
    textColor: "white"
  },
  {
    key: '7',
    name: "Голубой-малиновый",
    value: "linear-gradient(45deg, rgba(0,153,255,1) 0%, rgba(204,0,102,1) 100%)",
    textColor: "white"
  },
  {
    key: '8',
    name: "Желтый-синий",
    value: "linear-gradient(225deg, rgba(255,255,102,1) 0%, rgba(51,51,153,1) 100%)",
    textColor: "white"
  },
  {
    key: '9',
    name: "Градиент под углом 45°",
    value: "linear-gradient(45deg, rgba(102,0,153,1) 0%, rgba(255,204,0,1) 100%)",
    textColor: "white"
  },
  {
    key: '10',
    name: "Градиент под углом 135°",
    value: "linear-gradient(135deg, rgba(255,102,102,1) 0%, rgba(0,204,102,1) 100%)",
    textColor: "white"
  },
  {
    key: '11',
    name: "Градиент под углом 225°",
    value: "linear-gradient(225deg, rgba(51,51,255,1) 0%, rgba(255,193,12,1) 100%)",
    textColor: "white"
  }
];

//123
const CATEGORIES = [
  { id: 1, title: "Бытовая техника", image: "/tehnika.png", slug: "bytovaya-tehnika" },
  { id: 2, title: "ТВ, Аудио, Видео", image: "/tv.png", slug: "tv-audio-video" },
  { id: 3, title: "Мебель", image: "/mebel.png", slug: "mebel" },
  { id: 5, title: "Аксессуары", image: "/aksisuar.png", slug: "aksessuary" },
];

const FLEX_LABEL_STYLE: CSSProperties = {
  border: "2px solid #e5e5e5",
  width: 250,
  height: 10,
  padding: 3
};

const TEXT_STYLE: CSSProperties = {
  hyphens: "auto",
  color: "black",
  width: "60%",
  fontSize: 9
};

const LABEL_STYLE_BASE: CSSProperties = {
  width: "40%",
};

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
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0]);

  const menuItems = useMemo<MenuProps['items']>(() =>
    GRADIENTS.map((gradient) => ({
      key: gradient.key,
      label: (
        <Flex
          style={FLEX_LABEL_STYLE}
          onClick={() => setSelectedGradient(gradient)}
        >
          <Text strong style={TEXT_STYLE}>{gradient.name}</Text>
          <div style={{ ...LABEL_STYLE_BASE, background: gradient.value }} />
        </Flex>
      )
    }))
    , []);

  return (
    <Flex className={style.container}>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        modules={[Grid]}
      >
        <SwiperSlide style={SwiperSlideStyle(selectedGradient.value)}>
          <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Text strong style={{ color: selectedGradient.textColor, textAlign: "center", fontSize: "12px" }}>
                Градиент: <br />{selectedGradient.name}
              </Text>
            </Dropdown>
          </Flex>
        </SwiperSlide>

        {items.map((category) => (
          <SwiperSlide
            key={category.id}
            style={SwiperSlideStyle(selectedGradient.value)}
          >
            <Link href={`/city/${cityEn}/catalog/category-slug/${category.slug}`}>
              <Flex vertical={true}
                style={{
                  padding: "10px",
                  width: "100%",
                  height: "100%"
                }}>
                <Text strong style={{ hyphens: "auto", width: "60%", color: selectedGradient.textColor }}>
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