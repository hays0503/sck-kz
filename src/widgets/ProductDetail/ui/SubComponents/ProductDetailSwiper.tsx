import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/effect-fade';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom, EffectFade } from 'swiper/modules';
import { Flex, Image } from 'antd';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ZoomInOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './ProductDetailSwiper.module.css';

interface IProductCartSwiperProps {
  name: string | undefined | null;
  images: string[];
  width: number;
  height: number | string;
}

interface IRenderImagesProps {
  width: number;
  height: number | string;
  name: string | undefined | null;
}

interface IRenderSwiperProps {
  images: string[];
  paramsSwiper: SwiperProps;
  name: string | undefined | null;
  width: number;
  height: number | string;
}

const RenderImages: React.FC<IRenderImagesProps> = (props) => {
  const { name } = props;

  // Фиксированная высота 60dvh
  const minHeight = '60dvh';

  return (
    <>
      <link itemProp='image' href={'/nofoto.jpg'} />
      <div className={styles.productImageContainer} style={{ minHeight }}>
        <Image
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src='/nofoto.jpg'
          alt={`${name}-no-image`}
          width='100%'
          height='auto'
          style={{
            objectFit: 'contain',
            aspectRatio: '3/4'
          }}
          preview={false}
        />
      </div>
    </>
  );
};

const RenderSwiper: React.FC<IRenderSwiperProps> = (props) => {
  const { images, paramsSwiper, name } = props;
  const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const fullscreenSwiperRef = useRef<SwiperClass | null>(null);

  // Используем useRef для предотвращения бесконечного цикла обновлений
  const isUpdatingFromMain = useRef(false);
  const isUpdatingFromFullscreen = useRef(false);

  // Синхронизация слайдеров только при открытии полноэкранного режима
  useEffect(() => {
    // Синхронизируем только при открытии режима
    if (
      fullscreenMode &&
      fullscreenSwiperRef.current &&
      activeIndex !== undefined
    ) {
      fullscreenSwiperRef.current.slideTo(activeIndex, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreenMode]); // Намеренно исключаем activeIndex для предотвращения зацикливания

  // Обработчик изменения слайдов в основном свайпере
  const handleSlideChange = (swiper: SwiperClass) => {
    if (isUpdatingFromFullscreen.current) {
      isUpdatingFromFullscreen.current = false;
      return;
    }

    isUpdatingFromMain.current = true;
    setActiveIndex(swiper.realIndex);

    // Если открыт полноэкранный режим, синхронизируем его
    if (fullscreenMode && fullscreenSwiperRef.current) {
      fullscreenSwiperRef.current.slideTo(swiper.realIndex, 0);
    }

    // Сбрасываем флаг через небольшую задержку
    setTimeout(() => {
      isUpdatingFromMain.current = false;
    }, 50);
  };

  // Обработчик изменения слайдов в полноэкранном свайпере
  const handleFullscreenSlideChange = (swiper: SwiperClass) => {
    if (isUpdatingFromMain.current) {
      isUpdatingFromMain.current = false;
      return;
    }

    isUpdatingFromFullscreen.current = true;
    setActiveIndex(swiper.realIndex);

    // Синхронизируем основной слайдер
    if (swiperRef.current) {
      swiperRef.current.slideTo(swiper.realIndex, 0);
    }

    // Сбрасываем флаг через небольшую задержку
    setTimeout(() => {
      isUpdatingFromFullscreen.current = false;
    }, 50);
  };

  // Открытие полноэкранного режима
  const openFullscreen = () => {
    setFullscreenMode(true);
  };

  // Закрытие полноэкранного режима
  const closeFullscreen = () => {
    setFullscreenMode(false);
  };

  // Вариант анимации для модального окна
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <Flex style={{ height: 'auto' }}>
      {/* Основной слайдер */}
      <Swiper
        {...paramsSwiper}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <link itemProp='image' href={item} />
            <div onClick={openFullscreen}>
              <Image
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                src={item}
                alt={`${name}-slide-${index}`}
                width='100%'
                height='auto'
                style={{
                  objectFit: 'contain',
                  aspectRatio: '3/4',
                }}
                preview={false}
              />
              <div className={styles.fullscreenIndicator}>
                <ZoomInOutlined />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Полноэкранный слайдер */}
      <AnimatePresence>
        {fullscreenMode && (
          <motion.div
            className={styles.fullscreenSwiperModal}
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={closeFullscreen} // Закрываем при клике по всей модальной области
          >
            <div
              className={styles.fullscreenClose}
              onClick={(e) => {
                e.stopPropagation(); // Предотвращаем всплытие, чтобы кнопка всегда работала
                closeFullscreen();
              }}
            >
              <CloseOutlined />
            </div>
            {/* Свайпер с обработкой событий */}
            <div
              className={styles.swiperWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper
                modules={[Pagination, Zoom, Navigation]}
                onSwiper={(swiper) => {
                  fullscreenSwiperRef.current = swiper;
                }}
                onSlideChange={handleFullscreenSlideChange}
                initialSlide={activeIndex}
                pagination={{ clickable: true }}
                zoom={true}
                navigation={true}
                loop={true}
                className={styles.fullscreenSwiper}
              >
                {images.map((item, index) => (
                  <SwiperSlide key={index} className={styles.fullscreenSlide}>
                    <div
                      className={`swiper-zoom-container ${styles.swipeZoomContainer}`}
                      onClick={(e) => {
                        // Предотвращаем всплытие клика на контейнер без зума
                        e.stopPropagation();
                      }}
                    >
                      <NextImage
                        src={item}
                        alt={`${name}-fullscreen-${index}`}
                        width={1200}
                        height={1200}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          aspectRatio: '3/4',
                        }}
                        priority={index === activeIndex}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

const ProductDetailSwiper: React.FC<IProductCartSwiperProps> = (props) => {
  const { images, width, name } = props;

  // Новые параметры свайпера
  const paramsSwiper: SwiperProps = {
    loop: true,
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 1,
    // effect: 'fade',
    grabCursor: true,
    modules: [Pagination, Navigation, EffectFade],
    style: { width: '100%' },
    autoHeight: true,
  };

  // Замена URL для изображений
  const imagesReplaceUrl = images.map((item) =>
    item.replace('http://185.100.67.246:8888', 'https://sck.kz'),
  );

  return (
    <div
      className={`${styles.productDetailSwiperContainer} ${styles.swiperGlobal}`}
    >
      {images?.length > 0 ? (
        <RenderSwiper
          images={imagesReplaceUrl}
          paramsSwiper={paramsSwiper}
          name={name}
          width={width}
          height={'60dvh'} // Минимальная высота равна 60dvh
        />
      ) : (
        <RenderImages width={width} height={width} name={name} />
      )}
    </div>
  );
};

export default ProductDetailSwiper;
