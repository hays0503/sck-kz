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
    "key": "0",
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
  ...Array.from({ length: 200 }, (_, i) => {
    return {
      key: (20 + i).toString(),
      name: `Модифицированный градиент #${i + 1}`,
      value: `radial-gradient(
                farthest-side at left bottom,
                rgba(${80 + (i % 50)}, 0, ${130 + (i % 70)}, 0.9) 0%,
                rgba(${140 + (i % 60)}, ${60 + (i % 50)}, ${180 + (i % 40)}, 0.7) 10%,
                rgba(250, ${180 + (i % 40)}, 90, 0.7) 50%,
                rgba(255, ${200 + (i % 30)}, 120, 0.6) 70%,
                 100%
              )
              left bottom / 50% 50% no-repeat,
              radial-gradient(
                farthest-side at right top,
                rgba(${80 + (i % 50)}, 0, ${130 + (i % 70)}, 0.9) 0%,
                rgba(${140 + (i % 60)}, ${60 + (i % 50)}, ${180 + (i % 40)}, 0.7) 10%,
                rgba(250, ${180 + (i % 40)}, 90, 0.7) 50%,
                rgba(255, ${200 + (i % 30)}, 120, 0.6) 70%,
                #fad35e 100%
              )
              right top / 50% 50% no-repeat
              #fad35e`,
      textColor: "white"
    };
  })  
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