"use client";

import React, { CSSProperties, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import { Button, Dropdown, Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import style from "./TabletCategory.module.css";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MenuProps } from "antd/lib";

const { Text, Paragraph } = Typography;

const GRADIENTS = [
  {
    "key": "31",
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
  },
  {
    "key": "0",
    "name": "v1",
    "value": "radial-gradient(ellipse at left bottom, #B53075 11%, transparent 50%), radial-gradient(ellipse at right top, #B53075 11%, transparent 50%), linear-gradient(45deg, rgba(254, 194, 16, 0.8) 0%, rgba(254, 194, 16, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "1",
    "name": "v2",
    "value": "radial-gradient(ellipse at left bottom, rgba(254, 194, 16, 0.8) 15%, transparent 50%), radial-gradient(ellipse at right top, rgba(254, 194, 16, 0.8) 20%, transparent 50%), linear-gradient(300deg, rgba(63, 54, 149, 0.8) 10%, rgba(100, 54, 149, 0.8) 20%, rgba(131, 51, 148, 0.8) 30%, rgba(161, 51, 147, 0.8) 45%, rgba(181, 48, 117, 0.8) 60%, rgba(196, 42, 86, 0.8) 70%, rgba(212, 36, 53, 0.8) 80%, rgba(217, 34, 44, 0.8) 90%)",
    "textColor": "white"
  },
  {
    "key": "2",
    "name": "v3",
    "value": "radial-gradient(ellipse at left bottom, rgba(102, 0, 153, 0.9) -15%, rgba(160, 90, 200, 0.7) 10%, rgba(250, 210, 90, 0.7) 50%, rgba(255, 220, 120, 0.6) 50%, rgba(250, 210, 90, 0.7) 50%, transparent 50%), radial-gradient(ellipse at right top, rgba(102, 0, 153, 0.9) -15%, rgba(160, 90, 200, 0.7) 10%, rgba(250, 210, 90, 0.7) 50%, rgba(255, 220, 120, 0.6) 50%, rgba(250, 210, 90, 0.7) 50%, transparent 50%), linear-gradient(45deg, rgba(255, 204, 0, 0.8) 0%, rgba(255, 204, 0, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "3",
    "name": "v4",
    "value": "radial-gradient(ellipse at left bottom, #B53075 3%, transparent 47%), radial-gradient(ellipse at right top, #B53075 3%, transparent 47%), linear-gradient(45deg, rgba(254, 194, 16, 0.8) 0%, rgba(254, 194, 16, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "5",
    "name": "v6",
    "value": "radial-gradient(ellipse at left bottom, rgba(102, 0, 153, 0.9) -15%, rgba(160, 90, 200, 0.7) 10%, rgba(250, 210, 90, 0.7) 50%, rgba(255, 220, 120, 0.6) 50%, rgba(250, 210, 90, 0.7) 50%, transparent 50%),  radial-gradient(ellipse at right top, rgba(102, 0, 153, 0.9) -15%, rgba(160, 90, 200, 0.7) 10%, rgba(250, 210, 90, 0.7) 50%, rgba(255, 220, 120, 0.6) 50%, rgba(250, 210, 90, 0.7) 50%, transparent 50%),  linear-gradient(45deg, rgba(255, 204, 0, 0.8) 0%, rgba(255, 204, 0, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "6",
    "name": "v7",
    "value": "radial-gradient(ellipse at left bottom, rgba(254, 194, 16, 0.8) 15%, transparent 50%),  radial-gradient(ellipse at right top, rgba(254, 194, 16, 0.8) 20%, transparent 50%),  linear-gradient(300deg, rgba(63, 54, 149, 0.8) 10%, rgba(100, 54, 149, 0.8) 20%, rgba(131, 51, 148, 0.8) 30%, rgba(161, 51, 147, 0.8) 45%, rgba(181, 48, 117, 0.8) 60%, rgba(196, 42, 86, 0.8) 70%, rgba(212, 36, 53, 0.8) 80%, rgba(217, 34, 44, 0.8) 90%)",
    "textColor": "white"
  },
  {
    "key": "8",
    "name": "v9",
    "value": "radial-gradient(ellipse at left bottom, #B53075 3%, rgba(254, 194, 16, 0.8) 0%, transparent 33%),  radial-gradient(ellipse at right top, #B53075 3%, rgba(254, 194, 16, 0.8) 100%, transparent 33%),  linear-gradient(325deg, rgba(254, 194, 16, 0.8) 0%, rgba(254, 194, 16, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "11",
    "name": "v12",
    "value": "radial-gradient(ellipse at left bottom, #B53075 3%, transparent 55%),  radial-gradient(ellipse at right top, #B53075 3%, transparent 55%),  linear-gradient(325deg, rgba(254, 194, 16, 0.8) 0%, rgba(254, 194, 16, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "14",
    "name": "v15",
    "value": "radial-gradient(ellipse at left bottom, rgba(181, 48, 117, 0.9) 3%, transparent 55%),  radial-gradient(ellipse at right top, rgba(181, 48, 117, 0.9) 3%, transparent 55%),  linear-gradient(325deg, rgba(254, 194, 16, 0.6) 0%, rgba(254, 194, 16, 0.6) 100%)",
    "textColor": "white"
  },
  {
    "key": "17",
    "name": "v18",
    "value": "radial-gradient(ellipse at left bottom, rgba(181, 48, 117, 0.9) 3%, transparent 55%),  radial-gradient(ellipse at right top, rgba(181, 48, 117, 0.9) 3%, transparent 55%),  radial-gradient(circle, rgba(254, 194, 16, 0.6) 100%, rgba(254, 194, 16, 0.949) 30%)",
    "textColor": "white"
  },
  {
    "key": "20",
    "name": "v21",
    "value": "radial-gradient(ellipse at left bottom, rgba(181, 48, 117, 0.95) 1%, transparent 55%),  radial-gradient(ellipse at right top, rgba(181, 48, 117, 0.95) 1%, transparent 55%),  radial-gradient(circle, rgba(254, 194, 16, 0.7) 100%, rgba(254, 194, 16, 0.949) 30%)",
    "textColor": "white"
  },
  {
    "key": "21",
    "name": "v22",
    "value": "radial-gradient(ellipse at left top, #3F3695 11%, #643695 18%, #833394 24%, #A13393 31%, rgba(181, 48, 117) 38%, #C42A56 45%, #F24547 57%, #FB8931 63%, #FFD823 68%, #FEFB4A 78%, #FEFB4A 85%, #FEFB4A 98%, transparent 1%)",
    "textColor": "white"
  },
  {
    "key": "22",
    "name": "v23",
    "value": "radial-gradient(ellipse at left bottom, rgba(102, 0, 153, 0.9) 10%, rgba(160, 90, 200, 0.7) 20%, rgba(250, 210, 90, 0.6) 50%, rgba(255, 220, 120, 0.5) 70%, rgba(102, 0, 153, 0.9) 100%),  radial-gradient(ellipse at right top, rgba(102, 0, 153, 0.9) 10%, rgba(160, 90, 200, 0.7) 20%, rgba(250, 210, 90, 0.6) 50%, rgba(255, 220, 120, 0.5) 70%, rgba(102, 0, 153, 0.9) 100%)",
    "textColor": "white"
  },
  {
    "key": "23",
    "name": "v24",
    "value": "radial-gradient(ellipse at left top, #3F3695 11%, #643695 18%, #833394 24%, #A13393 31%, rgba(181, 48, 117, 0.8) 38%, #C42A56 45%, #F24547 57%, #FB8931 63%, #FFD823 70%, rgba(254, 251, 74, 0.8) 85%, rgba(254, 251, 74, 0.6) 98%, transparent 100%)",
    "textColor": "white"
  },
  {
    "key": "24",
    "name": "v25",
    "value": "linear-gradient(90deg, rgba(0, 153, 255, 0.8) 0%, rgba(255, 102, 0, 0.8) 100%)",
    "textColor": "white"
  },
  {
    "key": "28",
    "name": "v29",
    "value": "radial-gradient(ellipse, rgba(255, 255, 255, 0.304) 98%, rgba(254, 251, 74, 0.6) 98%),  radial-gradient(ellipse at left top, #3F3695 11%, #643695 18%, #833394 24%, #A13393 31%, rgba(181, 48, 117) 38%, #C42A56 45%, #F24547 57%, #FB8931 63%, #FFD823 70%, rgba(254, 251, 74, 0.8) 85%, rgba(254, 251, 74, 0.6) 98%, transparent 10%)",
    "textColor": "white"
  },
  {
    "key": "30",
    "name": "v31",
    "value": "radial-gradient(ellipse, rgba(255, 255, 255, 0.189) 98%, rgba(254, 251, 74, 0.6) 98%),  radial-gradient(ellipse at left top, #3F3695 11%, #643695 18%, #833394 24%, #A13393 31%, rgba(181, 48, 117) 38%, #C42A56 45%, #F24547 57%, #FB8931 63%, #FFD823 70%, rgba(254, 251, 74, 0.8) 85%, rgba(254, 251, 74, 0.6) 98%, transparent 10%)",
    "textColor": "white"
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

  const getNextGradient = (currentKey: string) => {
    const currentIndex = GRADIENTS.findIndex(g => g.key === currentKey);
    return GRADIENTS[(currentIndex + 1) % GRADIENTS.length];
  };

  const getPreviousGradient = (currentKey: string) => {
    const currentIndex = GRADIENTS.findIndex(g => g.key === currentKey);
    return GRADIENTS[(currentIndex - 1 + GRADIENTS.length) % GRADIENTS.length];
  };


  const styleButton = { height: '45%', width: '95%', backgroundColor: "transparent", color: selectedGradient.textColor }

  return (
    <Flex className={style.container}>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        modules={[Grid]}
      >
        <SwiperSlide style={SwiperSlideStyle(selectedGradient.value)}>
          <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }} vertical gap={5}>
            <Button
              onClick={() => setSelectedGradient(getNextGradient(selectedGradient.key))}
              style={styleButton}
            >
              Следующий градиент
            </Button>
            <Button
              onClick={() => setSelectedGradient(getPreviousGradient(selectedGradient.key))}
              style={styleButton}
            >
              Предыдущий градиент
            </Button>

          </Flex>
        </SwiperSlide>
        <SwiperSlide style={SwiperSlideStyle(selectedGradient.value)}>
          <Flex justify="center" align="center" style={{ width: "150px", height: "100%" }}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Paragraph ellipsis={{ rows: 2, expandable: true }} strong style={{ color: selectedGradient.textColor, textAlign: "center", fontSize: "12px" }}>
                Градиент: <br />{selectedGradient.name}
              </Paragraph>
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