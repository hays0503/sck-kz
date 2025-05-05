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
    image: '/TestPic/fire.png',
    w: 44,
    h: 44,
    p: '-6px 0 0 0',
    th: 'unset',
    text: 'Акции',
    href: '/catalog/menu/main',
  },
  {
    image: '/TestPic/comp.png',
    w: 50,
    h: 30,
    p: '0 0 0 5px',
    th: 24,
    text: 'ТВ, Аудио, Видео',
    href: '/catalog/menu/tv-audio-video',
  },
  {
    image: '/TestPic/sofa.png',
    w: 51,
    h: 30,
    p: 'unset', //'5px 0 0 0',
    th: 24,
    text: 'Мебель',
    href: '/catalog/menu/mebel',
  },
  {
    image: '/iconKZ/kz.png',
    w: 50,
    h: 50,
    p: '0px 0px -5px 0px',
    th: 14,
    text: 'Made in KZ',
    href: '/filter',
    padding: '0',
  },
  {
    image: '/TestPic/frige.png',
    w: 30,
    h: 30,
    p: 'unset', //'5px 0 0 0',
    th: 24,
    text: 'Бытовая техника',
    href: '/catalog/menu/bytovaya-tehnika',
  },
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

const mix = [{ sets: [0, 3, 4, 6, 1], inner: true }];

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
  padding?: string;
};

const Row = () => {
  const cityEn = useGetCityParams();

  const Inner: React.FC<SlideProps> = (props) => {
    const { size, background, src, text, href, w, h, p, th,padding } = props;
    return (
      <>
        <Link href={`/city/${cityEn}${href}`}>
          <Flex vertical align='center' justify='space-around' gap={5}>
            <Flex
              vertical
              style={{
                width: size,
                height: size,
                background: background,
                borderRadius: 10,
                padding: padding??`10px 0 0 0`,
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
        <Link href={`/city/${cityEn}${href}`}>
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
                  width: '80%',
                  height: '80%',
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
        modules={[Navigation]}
        autoHeight
        centerInsufficientSlides
      >
        {mix.map(({ sets, inner }, groupIndex) =>
          categories.map(({ image, text, href, w, h, p, th, padding }, index) => {
            const PropsForSlide = {
              background: palettes[sets[index]] ?? '#000',
              src: `${image}`,
              text,
              href,
              w,
              h,
              p,
              th,
              padding
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
