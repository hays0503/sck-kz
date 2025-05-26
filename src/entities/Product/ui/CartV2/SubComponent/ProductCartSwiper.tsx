import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCube } from 'swiper/modules';
import Image from 'next/image';
import { CSSProperties, memo, useRef, useState } from 'react';
import { Flex } from 'antd';
import VideoSlider from './VideoSlider';

interface ProductCartSwiperProps {
  readonly id: number;
  readonly name?: string | null;
  readonly images: string[];
  readonly width: number | string;
  readonly height: number | string;
  readonly oneImage: boolean;
}

interface RenderImageProps {
  readonly src: string;
  readonly alt: string;
  readonly style?: React.CSSProperties;
}

const RenderImage: React.FC<RenderImageProps> = memo(({ src, alt }) => (
  <Flex
    justify='center'
    align='center'
    style={
      {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
      } as CSSProperties
    }
  >
    <link itemProp='image' href={src} />
    <Image
      priority
      src={src}
      alt={alt}
      fill
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      quality={50}
      style={{
        zIndex: 2,
        objectFit: 'contain',
        aspectRatio: '3/4',
      }}
    />
  </Flex>
));
RenderImage.displayName = 'RenderImage';

const RenderSwiper: React.FC<{
  images: string[];
  name?: string | null;
  hlsSrc?: string;
}> = memo(({ images, name, hlsSrc }) => {
  const swiperRef = useRef<SwiperClass>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const videoSlideIndex = hlsSrc ? 0 : -1;

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
      modules={[Pagination, EffectCube]}
      loop={images.length > 1}
      grabCursor
      pagination
      lazyPreloadPrevNext={1}
      style={{ width: '100%', height: '100%' }}
    >
      {hlsSrc && (
        <SwiperSlide key={hlsSrc} style={{ position: 'relative' }}>
          <VideoSlider
            hlsSrc={hlsSrc}
            poster={images[0] ?? undefined}
            storageKey={`video-pos-${hlsSrc}`}
            isActive={activeIndex === videoSlideIndex}
            onVideoEnd={() => {
              swiperRef.current?.slideNext();
            }}
          />
        </SwiperSlide>
      )}

      {images.map((src, index) => (
        <SwiperSlide key={src + index} style={{ position: 'relative' }}>
          <RenderImage src={src} alt={`${name}-slide-${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
RenderSwiper.displayName = 'RenderSwiper';

const ProductCartSwiper: React.FC<ProductCartSwiperProps> = ({
  id,
  images,
  width,
  height,
  name,
  oneImage,
}) => {
  const containerStyle: React.CSSProperties = {
    width,
    height,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    '--swiper-pagination-bullet-size': '5px',
    '--swiper-pagination-bullet-horizontal-gap': '2px',
    '--swiper-theme-color': '#ffcd1e',
    '--swiper-pagination-bottom': '0px',
    // border: '1px solid rgb(255, 255, 255)',
    borderRadius: '12px',
  } as CSSProperties;

  const altName = name ?? 'product';

  const hasImages = images.length > 0;

  const isMultiple = Boolean(!oneImage) ?? images.length > 1;
  const mainSrc = hasImages ? images[0] : '/nofoto.jpg';

  const VideoSrc: Record<string, { hlsSrc: string }> = {
    '1151': {
      hlsSrc: '/video/1151/index.m3u8',
    },
    '1154':{
      hlsSrc: '/video/1154/index.m3u8',
    },
    "1157":{
      hlsSrc: '/video/1157/index.m3u8',
    },
    "1287":{
      hlsSrc: '/video/1287/index.m3u8',
    }
  };

  const hlsSrc: string | undefined = VideoSrc?.[id]?.hlsSrc;

  return (
    <div style={containerStyle}>
      {isMultiple ? (
        <RenderSwiper images={images} name={altName} hlsSrc={hlsSrc} />
      ) : (
        <RenderImage src={mainSrc} alt={`${altName}-image`} />
      )}
    </div>
  );
};

export default memo(ProductCartSwiper);
