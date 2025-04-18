import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCube } from 'swiper/modules';
import { Image } from 'antd';
import type { ImagePreviewType } from 'rc-image';
import {
  TransformAction,
  TransformType,
} from 'rc-image/lib/hooks/useImageTransform';
import { useRef, useState } from 'react';

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
  const { name, width, height } = props;
  return (
    <>
      <link itemProp='image' href={'/nofoto.jpg'} />
      <Image
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        src='/nofoto.jpg'
        alt={`${name}-no-image`}
        width={width}
        height={height}
        style={{
          objectFit: 'scale-down',
          width: width,
          height: height,
        }}
      />
    </>
  );
};

const RenderSwiper: React.FC<IRenderSwiperProps> = (props) => {
  const { images, paramsSwiper, name, width, height } = props;
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const isSwiping = useRef(false);
  const swiperRef = useRef<SwiperClass>(null);

  const handleTransform = (info: {
    transform: TransformType;
    action: TransformAction;
  }) => {
    if (info.action === 'move' && !isSwiping.current && swiperRef.current) {
      const x = info.transform.x ?? 0;
      if (x <= -50) {
        isSwiping.current = true;
        setTimeout(() => swiperRef.current?.slideNext(), 0);
        setTimeout(() => {
          setPreviewSrc(images[swiperRef.current!.realIndex]);
        }, 100); // debounce
        setTimeout(() => (isSwiping.current = false), 500); // debounce
      }
      if (x >= 50) {
        isSwiping.current = true;
        setTimeout(() => swiperRef.current?.slidePrev(), 0);
        setTimeout(() => {
          setPreviewSrc(images[swiperRef.current!.realIndex]);
        }, 100); // debounce
        setTimeout(() => (isSwiping.current = false), 500); // debounce
      }
    }
  };

  return (
    <Swiper
      {...paramsSwiper}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <link itemProp='image' href={item} />
            <Image
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              preview={
                {
                  afterClose: () => setPreviewSrc(null),
                  mask: null,
                  maskClosable: true,
                  styles:{
                    mask:{
                      backgroundColor: 'rgba(0, 0, 0, 0.92)',
                    }
                  },
                  onTransform: handleTransform,
                } as ImagePreviewType
              }
              src={previewSrc ?? item}
              alt={`${name}-slide-${index}`}
              width={width}
              height={height}
              
              style={{
                objectFit: 'scale-down',
                objectPosition: 'center',
                width: '100%',
                height: 'inherit',
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
    navigation: false,
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    modules: [Pagination, Navigation, EffectCube],
    style: { width: width, height: height },
  };

  const imagesReplaceUrl = images.map((item) =>
    item.replace('http://185.100.67.246:8888', 'https://sck.kz'),
  );

  return (
    <div style={{ width: width, height: height, overflow: 'hidden' }}>
      {images?.length > 0 ? (
        // <CustomProductDetailSwiper
        //   images={images}
        //   name={name}
        //   width={width}
        //   height={height}
        // />
        <RenderSwiper
          images={imagesReplaceUrl}
          paramsSwiper={paramsSwiper}
          name={name}
          width={width}
          height={height}
        />
      ) : (
        <RenderImages width={width} height={height} name={name} />
      )}
    </div>
  );
};

export default ProductDetailSwiper;
