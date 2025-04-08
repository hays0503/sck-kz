import { Flex, Tag, Typography } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { MappedProductType } from 'api-mapping/product/_type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const { Title } = Typography;

interface IProductDetailConfiguration {
  readonly nameProduct: string;
  readonly Configurations: MappedProductType[]|[]|null;
  readonly img: string[];
  readonly discount: string | null;
}

const ProductDetailConfiguration: React.FC<IProductDetailConfiguration> = (
  props,
) => {
  const { nameProduct, Configurations, img, discount } = props;
  const t = useTranslations('ProductDetailConfiguration');
  const localeActive = useLocale();
  const currentCity = useGetCityParams();

  return (
    <Flex vertical={true} gap={10} style={{ width: '100%', padding: '10px' }}>
      <Title level={3} itemProp='name'>
        {nameProduct}
      </Title>
      {Configurations && Configurations?.length > 0 && (
        <Flex vertical>
          <Title
            level={5}
            style={{ color: 'gray', fontWeight: '250' }}
          >
            {t('varianty-ispolneniya')}
          </Title>
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            centeredSlides={false}
            navigation={false}
            style={{ padding: '10px', width: '100%' }}
          >
            <SwiperSlide style={{ width: '100px', height: '120px' }}>
              <Flex
                style={{
                  width: '100px',
                  height: '120px',
                  border: '3px solid #4954f0',
                  position: 'relative',
                }}
              >
                {discount && (
                  <Tag
                    style={{
                      zIndex: 999,
                      fontSize: '10px',
                      position: 'absolute',
                      bottom: '-10px',
                      right: '-15px',
                      color: 'white',
                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                    }}
                  >{`-${Math.round(Number(discount))}%`}</Tag>
                )}
                <Image
                  src={img[0]}
                  alt={nameProduct}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Flex>
            </SwiperSlide>
            {Configurations.map((item) => (
              <SwiperSlide key={item.id} style={{ width: '100px' }}>
                <Link
                  prefetch={true}
                  href={`/city/${currentCity}/product/${item.slug}`}
                >
                  <Flex
                    style={{
                      width: '100px',
                      height: '120px',
                      border: '1px solid #d7d7d7',
                      position: 'relative',
                    }}
                  >
                    {item.discount && (
                      <Tag
                        style={{
                          zIndex: 999,
                          fontSize: '10px',
                          position: 'absolute',
                          bottom: '-10px',
                          right: '-15px',
                          color: 'white',
                          backgroundColor: 'rgba(255, 0, 0, 0.7)',
                        }}
                      >{`-${Math.round(Number(item.discount))}%`}</Tag>
                    )}
                    <Image
                      src={item.img[0]}
                      alt={item.name[localeActive] ?? item.slug}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Flex>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      )}
    </Flex>
  );
};

export default ProductDetailConfiguration;