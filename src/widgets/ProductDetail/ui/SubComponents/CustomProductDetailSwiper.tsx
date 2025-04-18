import React, { useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCube } from 'swiper/modules';
import { Image, Modal } from 'antd';
import type { ImagePreviewType } from 'rc-image';
import {
  TransformAction,
  TransformType,
} from 'rc-image/lib/hooks/useImageTransform';

interface IProductCartSwiperProps {
  name?: string | null;
  images: string[];
  width: number;
  height: number;
}

const CustomProductDetailSwiper: React.FC<IProductCartSwiperProps> = ({
  images,
  name,
  width,
  height,
}) => {
  const swiperRef = useRef<SwiperClass>(null);
  const isSwiping = useRef(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const openPreview = (src: string) => {
    setPreviewSrc(src);
    setPreviewVisible(true);
  };

  const handleTransform = (info: {
    transform: TransformType;
    action: TransformAction;
  }) => {
    if (info.action !== 'move' || !swiperRef.current || isSwiping.current)
      return;
    const x = info.transform.x ?? 0;
    if (x <= -200) {
      isSwiping.current = true;
      requestAnimationFrame(() => {
        swiperRef.current?.slideNext();
        setPreviewSrc(images[swiperRef.current!.realIndex]);
        setTimeout(() => (isSwiping.current = false), 500);
      });
    } else if (x >= 200) {
      isSwiping.current = true;
      requestAnimationFrame(() => {
        swiperRef.current?.slidePrev();
        setPreviewSrc(images[swiperRef.current!.realIndex]);
        setTimeout(() => (isSwiping.current = false), 500);
      });
    }
  };

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
    modules: [Pagination, EffectCube],
    style: { width, height },
    onSwiper: (swiper) => (swiperRef.current = swiper),
  };

  return (
    <>
      <Swiper {...paramsSwiper}>
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              alt={`${name}-slide-${idx}`}
              width={width}
              height={height}
              style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}
              preview={false} // отключаем встроенный preview
              onClick={() => openPreview(src)} // открываем своё Modal’ное превью
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={width}
        styles={{
          header: { padding: 0 },
          footer: { padding: 0 },
          mask: { padding: 0 },
          wrapper: { padding: 0 },
          content: { padding: 0 },
          body: { padding: 0, textAlign: 'center' },
        }}
      >
        {previewSrc && (
          <Image
            src={previewSrc}
            alt='preview'
            style={{ objectFit: 'contain' }}
            preview={
              {
                mask: null,
                onTransform: handleTransform,
              } as ImagePreviewType
            }
          />
        )}
      </Modal>
    </>
  );
};

export default CustomProductDetailSwiper;
