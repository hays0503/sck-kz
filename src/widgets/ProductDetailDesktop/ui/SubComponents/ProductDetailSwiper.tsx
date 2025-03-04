import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Flex, Image } from "antd";
import type { ImagePreviewType } from "rc-image";
import { CSSProperties, useState } from "react";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface IProductCartSwiperProps {
  name?: string | null;
  images: string[];
  width: number;
  height: number;
}

interface IRenderImagesProps {
  width: number;
  height: number;
  name?: string | null;
}

interface IRenderSwiperProps extends IProductCartSwiperProps {
  paramsSwiper: SwiperProps;
  setThumbsSwiper: (swiper: SwiperClass) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const defaultImage = "/nofoto.jpg";

const RenderImages: React.FC<IRenderImagesProps> = ({ name, width, height }) => (
  <>
    <link itemProp="image" href={defaultImage} />
    <Image
      src={defaultImage}
      alt={`${name || "product"}-no-image`}
      width={width}
      height={height}
      style={{ objectFit: "scale-down", width, height }}
    />
  </>
);

const RenderSwiper: React.FC<IRenderSwiperProps> = ({ images, paramsSwiper, name, width, height, setThumbsSwiper, activeIndex, setActiveIndex }) => (
  <Flex justify="center" align="center" gap={10} style={{ width: "100%", height: "100%" }}>
    <Flex justify="center" align="center">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        direction="vertical"
        style={{ width: 80, height }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} onClick={() => setActiveIndex(index)} style={{
            border: `2px solid ${index === activeIndex ? "#4954F0" : "#C6C6C8"}`,
            borderRadius: "6.15px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Image              
              preview={false}
              src={item.replace("http://185.100.67.246:8888", "https://sck.kz")}
              alt={`${name || "product"}-thumb-${index}`}
              width={60}
              height={60}
              style={{ objectFit: "scale-down", objectPosition: "center", width: "100%", height: "inherit"}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
    <Flex style={{border: `2px solid #C6C6C8`,borderRadius: "6.15px"}}>
      <Swiper {...paramsSwiper} modules={[Navigation, Thumbs]} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <link itemProp="image" href={item} />
            <Image
              preview={{ mask: null } as ImagePreviewType}
              src={item.replace("http://185.100.67.246:8888", "https://sck.kz")}
              alt={`${name || "product"}-slide-${index}`}
              width={width}
              height={height}
              style={{ objectFit: "scale-down", objectPosition: "center", width: "100%", height: "inherit" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  </Flex>
);

const ProductDetailSwiper: React.FC<IProductCartSwiperProps> = ({ images, width, height, name }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const paramsSwiper: SwiperProps = {
    loop: true,
    pagination: { clickable: false },
    navigation: false,
    grabCursor: false,    
    thumbs: { swiper: thumbsSwiper },
    style: { 
      width, height,
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    } as CSSProperties,
  };

  return (
    <Flex>
      {images.length > 0 ? (
        <RenderSwiper images={images} paramsSwiper={paramsSwiper} name={name} width={width} height={height} setThumbsSwiper={setThumbsSwiper} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      ) : (
        <RenderImages width={width} height={height} name={name} />
      )}
    </Flex>
  );
};

export default ProductDetailSwiper;