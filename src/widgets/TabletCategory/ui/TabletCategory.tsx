"use client";

import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Button, Flex, Typography, Watermark } from "antd";
import Image from "next/image";
import "swiper/css";
import "swiper/css/grid";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Navigation } from "swiper/modules";

const { Text } = Typography;

// const MixGroups = [
//   {
//     NameGroups: "Однотонные",
//     Groups: [
//       { imageNames: ["1.png", "2.png", "3.png", "4.png"], name: "Цвет `Баклажановый`" },
//       { imageNames: ["5.png", "6.png", "7.png", "8.png"], name: "Цвет `Ярко-синий`" },
//       { imageNames: ["9.png", "10.png", "11.png", "12.png"], name: "Цвет `Сиена жженая`" },
//       { imageNames: ["13.png", "14.png", "15.png", "16.png"], name: "Цвет `Умеренный красный`" },
//       { imageNames: ["17.png", "18.png", "19.png", "20.png"], name: "Цвет `Темный пурпурно-фиолетовый`" }
//     ]
//   },
//   {
//     NameGroups: "Гребешок",
//     Groups: [
//       { imageNames: ["1.png", "6.png", "3.png", "8.png"], name: "Цвет `Баклажановый/Ярко-синий`" },
//       { imageNames: ["5.png", "2.png", "7.png", "4.png"], name: "Цвет `Ярко-синий/Баклажановый`" },
//       { imageNames: ["9.png", "14.png", "11.png", "16.png"], name: "Цвет `Сиена жженая/Умеренный красный`" },
//       { imageNames: ["13.png", "10.png", "15.png", "12.png"], name: "Цвет `Умеренный красный/Сиена жженая`" },
//       { imageNames: ["1.png", "14.png", "3.png", "16.png"], name: "Цвет `Баклажановый/Умеренный красный`" },
//       { imageNames: ["5.png", "10.png", "7.png", "12.png"], name: "Цвет `Ярко-синий/Сиена жженая`" },
//       { imageNames: ["9.png", "18.png", "11.png", "20.png"], name: "Цвет `Сиена жженая/Тёмный пурпурно-фиолетовый`" },
//       { imageNames: ["17.png", "2.png", "19.png", "4.png"], name: "Цвет `Тёмный пурпурно-фиолетовый/Баклажановый`" }
//     ]
//   },
//   {
//     NameGroups: "Градиентные переходы",
//     Groups: [
//       { imageNames: ["1.png", "6.png", "11.png", "16.png"], name: "`Закатный градиент (Баклажановый → Умеренный красный)`" },
//       { imageNames: ["5.png", "10.png", "15.png", "20.png"], name: "`Горячий песок (Ярко-синий → Тёмный пурпурно-фиолетовый)`" },
//       { imageNames: ["9.png", "14.png", "19.png", "4.png"], name: "`Осенний микс (Сиена жженая → Баклажановый)`" },
//       { imageNames: ["13.png", "18.png", "3.png", "8.png"], name: "`Ледяное сияние (Умеренный красный → Ярко-синий)`" },
//       { imageNames: ["17.png", "2.png", "7.png", "12.png"], name: "`Пурпурное сердце (Темный пурпурно-фиолетовый → Сиена жженая)`" }
//     ]
//   },
//   {
//     NameGroups: "Лесенка",
//     Groups: [
//       { imageNames: ["17.png", "6.png", "3.png", "16.png"], name: "`Лесенка (От тёплых цветов → К холодным)`" },
//       { imageNames: ["13.png", "2.png", "7.png", "20.png"], name: "`Лесенка (От холодных цветов → К тёплым)`" },
//     ]
//   }
// ];

const MixGroups = [
  {
    NameGroups: "Круглые иконки",
    Groups: [
      { imageNames: ["21.png|Акции", "22.png|ТВ, Аудио, Видео", "23.png|Мебель", "24.png|Бытовая техника"], name: "Минимализм" },
    ]
  },
  {
    NameGroups: "Однотонные",
    Groups: [
      { imageNames: ["1.png", "2.png", "3.png", "fire.svg"], name: "Цвет `Баклажановый`" },
      { imageNames: ["5.png", "6.png", "7.png", "fire.svg"], name: "Цвет `Ярко-синий`" },
      { imageNames: ["9.png", "10.png", "11.png", "fire.svg"], name: "Цвет `Сиена жженая`" },
      { imageNames: ["13.png", "14.png", "15.png", "fire.svg"], name: "Цвет `Умеренный красный`" },
      { imageNames: ["17.png", "18.png", "19.png", "fire.svg"], name: "Цвет `Темный пурпурно-фиолетовый`" }
    ]
  },
  {
    NameGroups: "Гребешок",
    Groups: [
      { imageNames: ["1.png", "6.png", "3.png", "fire.svg"], name: "Цвет `Баклажановый/Ярко-синий`" },
      { imageNames: ["5.png", "2.png", "7.png", "fire.svg"], name: "Цвет `Ярко-синий/Баклажановый`" },
      { imageNames: ["9.png", "14.png", "11.png", "fire.svg"], name: "Цвет `Сиена жженая/Умеренный красный`" },
      { imageNames: ["13.png", "10.png", "15.png", "fire.svg"], name: "Цвет `Умеренный красный/Сиена жженая`" },
      { imageNames: ["1.png", "14.png", "3.png", "fire.svg"], name: "Цвет `Баклажановый/Умеренный красный`" },
      { imageNames: ["5.png", "10.png", "7.png", "fire.svg"], name: "Цвет `Ярко-синий/Сиена жженая`" },
      { imageNames: ["9.png", "18.png", "11.png", "fire.svg"], name: "Цвет `Сиена жженая/Тёмный пурпурно-фиолетовый`" },
      { imageNames: ["17.png", "2.png", "19.png", "fire.svg"], name: "Цвет `Тёмный пурпурно-фиолетовый/Баклажановый`" }
    ]
  },
  {
    NameGroups: "Градиентные переходы",
    Groups: [
      { imageNames: ["1.png", "6.png", "11.png", "fire.svg"], name: "`Закатный градиент (Баклажановый → Умеренный красный)`" },
      { imageNames: ["5.png", "10.png", "15.png", "fire.svg"], name: "`Горячий песок (Ярко-синий → Тёмный пурпурно-фиолетовый)`" },
      { imageNames: ["9.png", "14.png", "19.png", "fire.svg"], name: "`Осенний микс (Сиена жженая → Баклажановый)`" },
      { imageNames: ["13.png", "18.png", "3.png", "fire.svg"], name: "`Ледяное сияние (Умеренный красный → Ярко-синий)`" },
      { imageNames: ["17.png", "2.png", "7.png", "fire.svg"], name: "`Пурпурное сердце (Темный пурпурно-фиолетовый → Сиена жженая)`" }
    ]
  },
  {
    NameGroups: "Лесенка",
    Groups: [
      { imageNames: ["17.png", "6.png", "3.png", "fire.svg"], name: "`Лесенка (От тёплых цветов → К холодным)`" },
      { imageNames: ["13.png", "2.png", "7.png", "fire.svg"], name: "`Лесенка (От холодных цветов → К тёплым)`" },
    ]
  }
];


// Разворачиваем MixGroups в удобный массив с вложенными группами
const flattenGroups = MixGroups.flatMap((category, categoryIndex) =>
  category.Groups.map((group, groupIndex) => ({
    ...group,
    categoryName: category.NameGroups,
    categoryIndex: categoryIndex + 1, // Номер категории (1-based)
    groupIndex: groupIndex + 1, // Номер группы внутри категории (1-based)
    totalGroupsInCategory: category.Groups.length // Количество групп в данной категории
  }))
);

const Row: React.FC<{
  setCurrentGroup: (groupIndex: number) => void
}> = ({ setCurrentGroup }) => {
  const cityEn = useGetCityParams();

  const handleSlideChange = (swiper: SwiperClass) => {
    const newGroupIndex = Math.floor(swiper.activeIndex / 4);
    setCurrentGroup(newGroupIndex);
  };

  return (
    <Flex>
      <Swiper
        autoHeight={true}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        loop={false}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
      >
        {flattenGroups.flatMap((group, groupIndex) =>
          group.imageNames.map((image, index) => (
            <SwiperSlide key={`${groupIndex}-${index}`} style={{ width: 80}}>
              <Link href={`/city/${cityEn}/catalog/menu/mebel`}>
                <Flex vertical align="center" justify="center" gap={5}>
                  <Image
                    src={`/TestPic/${image.split("|")[0]}`}
                    alt={image}
                    width={80}
                    height={80}
                    priority
                  />
                  {image.split("|")[1] && <Text style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: " 100%",
                    letterSpacing: 0,
                    textAlign: "center",
                    verticalAlign: "middle"
                  }}>
                    {image.split("|")[1]}
                  </Text>}
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
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [display, setDisplay] = useState(true);
  const currentGroup = flattenGroups[currentGroupIndex] || {};
  const categoryName = currentGroup.categoryName || "Неизвестная категория";
  const currentGroupName = currentGroup.name || "Неизвестно";

  // Подсчет категорий
  const totalCategories = MixGroups.length;
  const categoryIndex = currentGroup.categoryIndex || 1;

  // Подсчет групп внутри текущей категории
  const totalGroupsInCategory = currentGroup.totalGroupsInCategory || 1;
  const groupIndex = currentGroup.groupIndex || 1;



  return (
    <Flex vertical gap={10}>
      <Row setCurrentGroup={setCurrentGroupIndex} />
      {display && <Watermark content={"Для разработки"} gap={[10, 10]} rotate={-8}>
        <Flex justify="space-around" align="center" style={{ width: "100%", height: "165px" }} >
          <Button className="swiper-button-prev"><Text >{"<-"}</Text></Button>
          <Flex justify="space-between" align="center" gap={5} vertical style={{ width: "50%", height: "100%" }}>
            <Text strong style={{ textAlign: "center" }}>Категория: {categoryName} ({categoryIndex} / {totalCategories})</Text>
            <Text strong style={{ textAlign: "center" }}>Группа: {currentGroupName}</Text>
            <Text strong style={{ textAlign: "center" }}>Порядковый номер в группе <br /> ({groupIndex} / {totalGroupsInCategory}) </Text>
          </Flex>
          <Button className="swiper-button-next"><Text >{"->"}</Text></Button>
        </Flex>
        <Flex align="center" justify="center" vertical>
          <Button danger style={{ width: "100%", textAlign: "center" }} onClick={() => setDisplay(!display)}>
            {`Удалить меню - для просмотра \"полной картины\"`}
          </Button>
          <Text type="danger" style={{ textAlign: "center" }}>Меню появиться после перезагрузки страницы</Text>
        </Flex>
      </Watermark>}
    </Flex>
  );
};

export default TabletCategory;
