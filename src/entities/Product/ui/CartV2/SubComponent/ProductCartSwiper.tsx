import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCube } from 'swiper/modules';
import Image from 'next/image';
import { memo } from 'react';

interface ProductCartSwiperProps {
  readonly name?: string | null;
  readonly images: string[];
  readonly width: number;
  readonly height: number;
  readonly oneImage: boolean;
}

interface RenderImageProps {
  readonly src: string;
  readonly alt: string;
  readonly style?: React.CSSProperties;
}

const RenderImage: React.FC<RenderImageProps> = memo(({ src, alt }) => (
  <>
    <link itemProp='image' href={src} />
    <Image
      placeholder='blur'
      blurDataURL={src}
      priority
      src={src}
      alt={alt}
      fill
      quality={50}
      style={{
        zIndex: 2,
        objectFit: 'contain',
      }}
    />
    {/* Blurred background image */}
    <Image
      placeholder='blur'
      blurDataURL={src}
      priority
      quality={50}
      src={src}
      alt={`${alt} ${src}`}
      fill
      style={{
        zIndex: 1,
        position: 'absolute',
        filter: 'blur(5px) brightness(90%)',
        objectFit: 'cover',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  </>
));
RenderImage.displayName = 'RenderImage';

const RenderSwiper: React.FC<{
  images: string[];
  name?: string | null;
}> = memo(({ images, name }) => (
  <Swiper
    modules={[Pagination, EffectCube]}
    loop
    grabCursor
    effect='cube'
    pagination
    lazyPreloadPrevNext={2}
    cubeEffect={{
      shadow: false,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }}
    style={{ width: '100%', height: '100%' }}
  >
    {images.map((src, index) => (
      <SwiperSlide key={index} style={{ position: 'relative' }}>
        {/* Foreground image */}
        <RenderImage
          src={src}
          alt={`${name}-slide-${index}`}
        />

        {/* Blurred background image */}
        <RenderImage
          src={src}
          alt={`${name}-background-${index}`}
        />
      </SwiperSlide>
    ))}
  </Swiper>
));
RenderSwiper.displayName = 'RenderSwiper';

const ProductCartSwiper: React.FC<ProductCartSwiperProps> = ({
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
    borderRadius: 12,
    position: 'relative',
  };

  const altName = name ?? 'product';

  const hasImages = images.length > 0;

  const isMultiple = Boolean(!oneImage) ?? images.length > 1;
  const mainSrc = hasImages ? images[0] : '/nofoto.jpg';

  return (
    <div style={containerStyle}>
      {isMultiple ? (
        <RenderSwiper images={images} name={altName} />
      ) : (
        <RenderImage
          src={mainSrc}
          alt={`${altName}-image`}
        />
      )}
    </div>
  );
};

export default memo(ProductCartSwiper);
