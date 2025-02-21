"use client";

import React, { CSSProperties, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules';
import { Dropdown, Flex, Typography } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
const categories = [
  { id: 1, title: "Бытовая техника", image: "/tehnika.png", slug: "bytovaya-tehnika" },
  { id: 2, title: "ТВ, Аудио, Видео", image: "/tv.png", slug: "tv-audio-video" },
  { id: 3, title: "Мебель", image: "/mebel.png", slug: "mebel" },
  { id: 5, title: "Аксессуары", image: "/aksisuar.png", slug: "aksessuary" },
];

const { Text } = Typography

import style from "./TabletCategory.module.css"
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MenuProps } from "antd/lib";

const gradient0: string = `linear-gradient(128deg, rgba(70,55,146,1) 0%, rgba(144,53,148,1) 43%, rgba(188,37,68,1) 100%)`
const gradient1: string = `linear-gradient(90deg,rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)`
const gradient2: string = `linear-gradient(90deg,rgba(71,114,202,1) 2%, rgba(114,46,209,0.8210456057422969) 24%, rgba(235,47,150,0.9246870623249299) 49%, rgba(231,235,47,0.7762276785714286) 88%)`
const gradient3: string = `linear-gradient(90deg,#FFC600, #A83695)`
const gradient4: string = `linear-gradient(90deg,#A83695, #FEFEFE)`
const gradient5: string = `linear-gradient(90deg,#FFC600, #FEFEFE)`
const gradient6: string = `linear-gradient(90deg,#FFC600, #A83695, #FEFEFE)`
const gradient7: string = `linear-gradient(45deg, rgb(8 185 187 / 85%) 0%, rgb(202 216 217) 35%, rgb(210 218 220) 70%, rgb(75 198 196 / 83%) 100%)`
const gradient8: string = `linear-gradient(45deg,rgba(255, 200, 0, 0.63) 0%, #FEFEFE 35%, #FEFEFE 70%,rgba(255, 200, 0, 0.63) 100%)`

const Row: React.FC<{ Items: { id: number, title: string, image: string, slug: string }[] }> = ({ Items }) => {
  const cityEn = useGetCityParams();

  const [selectedGradientText, setSelectedGradientText] = useState<string>("По умолчанию");
  const [gradient, setGradient] = useState<string>(gradient0);
  const [colorText, setColorText] = useState<string>("white");

  const styleSwiperSlide = {
    minWidth: "150px",
    width: "fit-content",
    height: "100px",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    background: gradient,

  } as React.CSSProperties

  const FlexLabel: CSSProperties = { border: "2px solid #e5e5e5", width: "250px", height: "10px", padding: "3px" }
  const TextStyle: CSSProperties = {  hyphens: "auto", color: "black", width: "60%",fontSize:"9px" }

  const LabelStyle: CSSProperties = {
    width: "40%",
  }

  const style0 = { ...LabelStyle, background: gradient0 }
  const style1 = { ...LabelStyle, background: gradient1 }
  const style2 = { ...LabelStyle, background: gradient2 }
  const style3 = { ...LabelStyle, background: gradient3 }
  const style4 = { ...LabelStyle, background: gradient4 }
  const style5 = { ...LabelStyle, background: gradient5 }
  const style6 = { ...LabelStyle, background: gradient6 }
  const style7 = { ...LabelStyle, background: gradient7 }
  const style8 = { ...LabelStyle, background: gradient8 }


  const items: MenuProps['items'] = [
    {
      key: '0',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient0);setColorText("white");setSelectedGradientText("По умолчанию")}}>
        <Text strong style={TextStyle}>По умолчанию</Text>
        <div style={style0} />
      </Flex>,
    },
    {
      key: '7',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient7);setColorText("#161e20");setSelectedGradientText("Как у FreedomBank")}}>
        <Text strong style={TextStyle}>Как у FreedomBank</Text>
        <div style={style7} />
      </Flex>,
    },
    {
      key: '8',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient8);setColorText("#161e20");setSelectedGradientText("Как у FreedomBank но цвет SCK")}}>
        <Text strong style={TextStyle}>Как у FreedomBank но цвет SCK</Text>
        <div style={style8} />
      </Flex>,
    },
    {
      key: '1',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient1);setColorText("white");setSelectedGradientText("Градиент 1")}}>
        <Text strong style={TextStyle}>Градиент 1</Text>
        <div style={style1} />
      </Flex>,
    },
    {
      key: '2',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient2);setColorText("white");setSelectedGradientText("Градиент 2")}}>
        <Text strong style={TextStyle}>Градиент 2</Text>
        <div style={style2} />
      </Flex>,
    },
    {
      key: '3',
      label: <Flex style={FlexLabel} onClick={() =>{setGradient(gradient3);setColorText("white");setSelectedGradientText("Градиент 3")}}>
        <Text strong style={TextStyle}>Градиент 3</Text>
        <div style={style3} />
      </Flex>,
    },
    {
      key: '4',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient4);setColorText("white");setSelectedGradientText("Градиент 4")}}>
        <Text strong style={TextStyle}>Градиент 4</Text>
        <div style={style4} />
      </Flex>,
    },
    {
      key: '5',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient5);setColorText("white");setSelectedGradientText("Градиент 5")}}>
        <Text strong style={TextStyle}>Градиент 5</Text>
        <div style={style5} />
      </Flex>,
    },
    {
      key: '6',
      label: <Flex style={FlexLabel} onClick={() => {setGradient(gradient6);setColorText("white");setSelectedGradientText("Градиент 6")}}>
        <Text strong style={TextStyle}>Градиент 6</Text>
        <div style={style6} />
      </Flex>,
    },

  ]

  return (
    <Flex style={{ width: "100%", height: "110px", backgroundColor: "transparent", transform: "translateX(20px)" }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        modules={[Grid]}

      >
        <SwiperSlide style={styleSwiperSlide}>
          <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Text strong style={{ hyphens: "auto", color: colorText,textAlign:"center",fontSize:"12px" }}>
                Градиент: <br/> {selectedGradientText}
              </Text>
            </Dropdown>
          </Flex>
        </SwiperSlide>
        {Items.map((category) => (
          <SwiperSlide key={category.id} style={styleSwiperSlide}>
            <Link href={`/city/${cityEn}/catalog/category-slug/${category.slug}`}>
              <Flex vertical={true}
                style={{
                  padding: "10px",
                  width: "100%",
                  height: "100%"
                }}>
                <Text strong style={{ hyphens: "auto", width: "60%", color: colorText }}>
                  {category.title}
                </Text>
                <Flex justify="flex-end" style={{ width: "100%" }}>
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

  return (
    <Flex align="start" justify="flex-end" vertical style={{ width: "100%", height: "110px" }}>
      <Row Items={categories} />
    </Flex>
  );
};


export default TabletCategory;