import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCube } from "swiper/modules";
import Image from "next/image";

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
  src: string;
}

interface IRenderSwiperProps {
  images: string[];
  paramsSwiper: SwiperProps;
  name: string | undefined | null;
  width: number;
  height: number;
}

const RenderImages: React.FC<IRenderImagesProps> = (props) => {
  const { name, width, height, src } = props;
  return (
    <>
      <link itemProp="image" href={src} />
      <Image
        placeholder="blur"
        blurDataURL={src}
        // loading="lazy"
        priority={true}
        // fetchPriority="low"
        src={src}
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
            placeholder="blur"
            blurDataURL={item}
            // loading="lazy"
            priority={true}
            // fetchPriority="low"
            src={item}
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

const ProductCartSwiper: React.FC<IProductCartSwiperProps> = (props) => {
  const { images, width, height, name } = props;

  const paramsSwiper: SwiperProps = {
    lazy: 'true',
    lazyPreloadPrevNext: 2,
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
  } as SwiperProps;

  return (
    <div style={{ width: width, height: height, overflow: "hidden" }}>
      {images?.length > 0 ? (
        images?.length > 1 ? (
          <RenderSwiper
            images={images}
            paramsSwiper={paramsSwiper}
            name={name}
            width={width}
            height={height}
          />
        ) : (
          <RenderImages
            width={width}
            height={height}
            name={name}
            src={images[0]}
          />
        )
      ) : (
        <RenderImages width={width} height={height} name={name} src={"/nofoto.jpg"} />
      )}
    </div>
  );
};

export default ProductCartSwiper;
