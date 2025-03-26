'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typography, Flex } from 'antd';
import Image from 'next/image';
import 'swiper/css';
import { Link } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Navigation } from 'swiper/modules';

const { Text } = Typography;

const categories = [
  {
    image: 'fire.png',
    w: 44,
    h: 44,
    p: '-6px 0 0 0',
    th: 'unset',
    text: 'Акции',
    href: 'main',
  },
  {
    image: 'comp.png',
    w: 50,
    h: 30,
    p: '0 0 0 5px',
    th: 24,
    text: 'ТВ, Аудио, Видео',
    href: 'tv-audio-video',
  },
  {
    image: 'sofa.png',
    w: 51,
    h: 30,
    p: 'unset', //'5px 0 0 0',
    th: 24,
    text: 'Мебель',
    href: 'mebel',
  },
  {
    image: 'frige.png',
    w: 30,
    h: 30,
    p: 'unset', //'5px 0 0 0',
    th: 24,
    text: 'Бытовая техника',
    href: 'bytovaya-tehnika',
  },
  // { image: "accessories.png", text: "Аксессуары",href:'main' }
];

const palettes = [
  '#0163E1', // 0
  '#FF4B4B', // 1
  '#9737FF', // 2
  '#E101A1', // 3
  '#1CB0F6', // 4
  '#EE8B0B', // 5
  'linear-gradient(90deg, #0163E1 0%, #3C91FF 100%)', // 6
  'linear-gradient(180deg, #FF4B4B 0%, #FF8585 100%)', // 7
  'linear-gradient(90deg, #9737FF 0%, #AF64FF 100%)', // 8
  'linear-gradient(180deg, #E101A1 0%, #FF45CA 100%)', // 9
  'linear-gradient(180deg, #17ACF2 0%, #47C4FF 100%)', // 10
  'linear-gradient(180deg, #E18001 0%, #FFAC40 100%)', // 11
];

const mix = [
  { sets: [0, 3, 4, 1], inner: true },
  // { sets: [0, 3, 4, 1], inner: false },

  { sets: [6, 9, 10, 7], inner: true },
  // { sets: [6, 9, 10, 7], inner: false },

  { sets: [0, 1, 2, 3], inner: true },
  // { sets: [0, 1, 2, 3], inner: false },

  { sets: [2, 3, 4, 5], inner: true },
  // { sets: [2, 3, 4, 5], inner: false },

  { sets: [6, 7, 8, 9], inner: true },
  // { sets: [6, 7, 8, 9], inner: false },

  { sets: [9, 10, 11, 8], inner: true },
  // { sets: [9, 10, 11, 8], inner: false },

  // { sets: [0, 0, 0, 0], inner: false },
  // { sets: [0, 0, 0, 0], inner: true },
  // { sets: [1, 1, 1, 1], inner: false },
  // { sets: [1, 1, 1, 1], inner: true },
  // { sets: [2, 2, 2, 2], inner: false },
  // { sets: [2, 2, 2, 2], inner: true },
  // { sets: [3, 3, 3, 3], inner: false },
  // { sets: [3, 3, 3, 3], inner: true },
  // { sets: [4, 4, 4, 4], inner: false },
  // { sets: [4, 4, 4, 4], inner: true },
  // { sets: [5, 5, 5, 5], inner: false },
  // { sets: [5, 5, 5, 5], inner: true },

  // { sets: [6, 6, 6, 6], inner: false },
  // { sets: [6, 6, 6, 6], inner: true },
  // { sets: [7, 7, 7, 7], inner: false },
  // { sets: [7, 7, 7, 7], inner: true },
  // { sets: [8, 8, 8, 8], inner: false },
  // { sets: [8, 8, 8, 8], inner: true },
  // { sets: [9, 9, 9, 9], inner: false },
  // { sets: [9, 9, 9, 9], inner: true },
  // { sets: [10, 10, 10, 10], inner: false },
  // { sets: [10, 10, 10, 10], inner: true },
  // { sets: [11, 11, 11, 11], inner: false },
  // { sets: [11, 11, 11, 11], inner: true },
];

type SlideProps = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  size: number;
  background: string;
  src: string;
  text: string;
  href: string;
  w: number;
  h: number;
  p: string;
  th: number | string;
};

const Row = () => {
  const cityEn = useGetCityParams();

  const Inner: React.FC<SlideProps> = (props) => {
    const { size, background, src, text, href, w, h, p, th } = props;
    return (
      <>
        <Link href={`/city/${cityEn}/catalog/menu/${href}`}>
          <Flex vertical align='center' justify='space-around' gap={5}>
            <Flex
              vertical
              style={{
                width: size,
                height: size,
                background: background,
                borderRadius: 10,
                paddingTop: 10,
              }}
              gap={4}
              justify='flex-start'
              align='center'
            >
              <Image
                src={src}
                alt={text}
                priority
                width={w}
                height={h}
                style={{ margin: p }}
              />
              <Flex style={{ height: th }} align='center' justify='center'>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: '#fff',
                    fontWeight: 400,
                    lineHeight: '12px',
                    letterSpacing: '0px',
                    verticalAlign: 'middle',
                  }}
                >
                  {text}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </>
    );
  };

  const Outer: React.FC<SlideProps> = (props) => {
    const { size, background, src, text, href, p } = props;
    return (
      <>
        <Link href={`/city/${cityEn}/catalog/menu/${href}`}>
          <Flex vertical align='center' gap={5}>
            <Flex
              justify='center'
              align='center'
              style={{
                background: background,
                width: size,
                height: size,
                borderRadius: 10,
              }}
            >
              <Flex
                style={{
                  width:"80%",
                  height:"80%",
                  position: 'relative',
                }}
              >
                <Image
                  src={src}
                  alt={text}
                  priority
                  fill
                  style={{ padding: p, objectFit: 'contain' }}
                />
              </Flex>
            </Flex>
            <Flex style={{ height: 12 }} align='center' justify='center'>
              <Text
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 400,
                  lineHeight: '12px',
                  letterSpacing: '0px',
                  verticalAlign: 'middle',
                }}
              >
                {text}
              </Text>
            </Flex>
          </Flex>
        </Link>
      </>
    );
  };

  return (
    <Flex style={{ width: '100%' }} justify='center'>
      <Swiper
        spaceBetween={'1%'}
        slidesPerView={4}
        slidesPerGroup={4}
        // navigation
        modules={[Navigation]}
        autoHeight
        centerInsufficientSlides
        // slidesOffsetBefore={5}
        // slidesOffsetAfter={5}
      >
        {mix.map(({ sets, inner }, groupIndex) =>
          categories.map(({ image, text, href, w, h, p, th }, index) => {
            const PropsForSlide = {
              background: palettes[sets[index]] ?? '#000',
              src: `/TestPic/${image}`,
              text,
              href,
              w,
              h,
              p,
              th,
            };

            const key = `${groupIndex}-${index}`;

            return (
              <SwiperSlide key={key} style={{ width: '80px', margin: '0px' }}>
                {inner ? (
                  <Inner {...PropsForSlide} size={72} />
                ) : (
                  <Outer {...PropsForSlide} size={72} />
                )}
              </SwiperSlide>
            );
          }),
        )}
      </Swiper>
    </Flex>
  );
};

const TabletCategory = () => {
  return (
    <Flex vertical gap={10}>
      <Row />
    </Flex>
  );
};

export default TabletCategory;
