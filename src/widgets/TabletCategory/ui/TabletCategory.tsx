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
  // { id: 4, title: "Строительство, ремонт", image: "/stroitelstvo.png",slug:"scenicheskoe-oborudovanie" },
  { id: 5, title: "Аксессуары", image: "/aksisuar.png", slug: "aksessuary" },
];

const { Text } = Typography

import style from "./TabletCategory.module.css"
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MenuProps } from "antd/lib";


const Row: React.FC<{ Items: { id: number, title: string, image: string, slug: string }[] }> = ({ Items }) => {
  const cityEn = useGetCityParams();
  const gradient0: string = `linear-gradient(128deg, rgba(70,55,146,1) 0%, rgba(144,53,148,1) 43%, rgba(188,37,68,1) 100%)`
  const gradient1: string = `linear-gradient(90deg,rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)`
  const gradient2: string = `linear-gradient(90deg,rgba(71,114,202,1) 2%, rgba(114,46,209,0.8210456057422969) 24%, rgba(235,47,150,0.9246870623249299) 49%, rgba(231,235,47,0.7762276785714286) 88%)`
  const gradient3: string = `linear-gradient(90deg,#FFC600, #A83695)`
  const gradient4: string = `linear-gradient(90deg,#A83695, #FEFEFE)`
  const gradient5: string = `linear-gradient(90deg,#FFC600, #FEFEFE)`
  const gradient6: string = `linear-gradient(90deg,#FFC600, #A83695, #FEFEFE)`

  const [gradient, setGradient] = useState<string>(gradient0);

  const styleSwiperSlide = {
    minWidth: "150px",
    width: "fit-content",
    height: "100px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    background: gradient
  } as React.CSSProperties
  const LabelStyle: CSSProperties = {
    width: "100%",
    height: "20px",
  }

  const style0 = { ...LabelStyle, background: gradient0}
  const style1 = { ...LabelStyle, background: gradient1}
  const style2 = { ...LabelStyle, background: gradient2}
  const style3 = { ...LabelStyle, background: gradient3} 
  const style4 = { ...LabelStyle, background: gradient4} 
  const style5 = { ...LabelStyle, background: gradient5} 
  const style6 = { ...LabelStyle, background: gradient6} 


  const items: MenuProps['items'] = [
    {
      key: '0',
      label: <div style={style0} onClick={() => setGradient(gradient0)}>По умолчанию</div>,
    },
    {
      key: '1',
      label: <div style={style1} onClick={() => setGradient(gradient1)}>Градиент 1</div>,
    },
    {
      key: '2',
      label: <div style={style2} onClick={() => setGradient(gradient2)}>Градиент 2</div>,
    },
    {
      key: '3',
      label: <div style={style3} onClick={() => setGradient(gradient3)}>Градиент 3</div>,
    },
    {
      key: '4',
      label: <div style={style4} onClick={() => setGradient(gradient4)}>Градиент 4</div>,
    },
    {
      key: '5',
      label: <div style={style5} onClick={() => setGradient(gradient5)}>Градиент 5</div>,
    },
    {
      key: '6',
      label: <div style={style6} onClick={() => setGradient(gradient6)}>Градиент 6</div>,
    }

  ]

  return (
    <Flex vertical style={{ position: "relative", width: "100%", height: "130px", backgroundColor: "transparent", transform: "translateX(20px)" }}>

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
                  padding: "8px",
                  width: "100%",
                  height: "100%"
                }}>
                <Text strong style={{ hyphens: "auto", width: "60%", color: "#ffff  " }}>
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
        <SwiperSlide style={styleSwiperSlide}>
          <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
            <Dropdown menu={{ items }}><Text strong style={{ hyphens: "auto",color: "#ffff" }}>Выбор Градиента</Text></Dropdown>
          </Flex>
        </SwiperSlide>
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