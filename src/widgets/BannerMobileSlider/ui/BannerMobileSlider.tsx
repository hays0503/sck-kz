"use client";
import { Flex } from "antd";
import Image from "next/image";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import style from "./BannerMobileSlider.module.css";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type";

interface BannerMobileSliderProps {
    readonly category: MappedCategoryType[]|MappedCategoryWithoutChildrenType[];
}

const BannerMobileSlider: React.FC<BannerMobileSliderProps> = ({ category }) => {

    const router = useRouter();
    const city = useGetCityParams();

    const swiperParams: SwiperProps = {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween:10,
        // loop: true,
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },
        navigation: true,
        modules: [Autoplay, Navigation],
        lazy: "true"
    } as SwiperProps;

    return <Flex style={{ width: '100%', height: '120px' }} gap={20}>
        <Swiper {...swiperParams} className={style.swiper}>

            {category.map((item: MappedCategoryWithoutChildrenType|MappedCategoryType) => {
                return item.banner.map((bannerImg) => <SwiperSlide onClick={() => {
                    router.push(`/city/${city}/catalog/category-slug/${item.slug}`);
                }} key={bannerImg} className={style.swiperSlide}>
                    <Image
                        priority={false}
                        loading="lazy"
                        src={bannerImg}
                        alt="banner"
                        fill
                        style={{
                            objectFit: 'fill',
                        }}
                    />
                </SwiperSlide>
                )
            })}
        </Swiper>
    </Flex>
};


export default BannerMobileSlider;