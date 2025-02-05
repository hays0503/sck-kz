import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCube } from "swiper/modules";
import { Image } from "antd";
import type { ImagePreviewType } from "rc-image";

interface IProductCartSwiperProps {
  name: string | undefined | null;
  images: string[];
  width: number;
  height: number;
}

interface IRenderImagesProps {
  width: number;
  height: number;
  name: string | undefined | null;
}

interface IRenderSwiperProps {
  images: string[];
  paramsSwiper: SwiperProps;
  name: string | undefined | null;
  width: number;
  height: number;

}

const RenderImages: React.FC<IRenderImagesProps> = (props) => {
  const { name, width, height } = props
  return (
    <>
      <link itemProp="image" href={"/nofoto.jpg"} />
      <Image
        src="/nofoto.jpg"
        alt={`${name}-no-image`}
        width={width}
        height={height}
        style={{
          objectFit: "scale-down",
          width: width,
          height: height,
        }}
      /></>
  );
};

const RenderSwiper: React.FC<IRenderSwiperProps> = (props) => {
  const { images, paramsSwiper, name, width, height } = props;
  return (
    <Swiper {...paramsSwiper} modules={[Pagination, Navigation, EffectCube]}>
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <link itemProp="image" href={item} />
          <Image
            preview={{
              mask: null
            } as ImagePreviewType}
            src={item.replace("http://185.100.67.246:8888", "https://sck.kz")}
            alt={`${name}-slide-${index}`}
            width={width}
            height={height}
            style={{
              objectFit: "scale-down",
              objectPosition: "center",
              width: "100%",
              height: "inherit",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ProductDetailSwiper: React.FC<IProductCartSwiperProps> = (props) => {
  const { images, width, height, name } = props;

  const paramsSwiper: SwiperProps = {
    loop: true,
    pagination: true,
    navigation: true,
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    style: { width: width, height: height },
  };

  return (
    <div style={{ width: width, height: height, overflow: "hidden" }}>
      {images?.length > 0 ? (
        <RenderSwiper images={images} paramsSwiper={paramsSwiper} name={name} width={width} height={height} />
      ) : (
        <RenderImages width={width} height={height} name={name} />
      )}
    </div>
  );
};

export default ProductDetailSwiper;
