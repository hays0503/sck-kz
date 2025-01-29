import { Flex, Typography } from "antd";
import { MappedProductType } from "api-mapping/product/_type";
import { useTranslations } from "next-intl";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { ProductCart } from "@/entities/Product/ui/Cart";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import AddToFavoriteProduct from "@/features/add-to-favorite-product/ui/AddToFavoriteProduct";


interface IProductDetailRelatedProductProps {
    readonly productsRelated: MappedProductType[] | [];
}

const { Title } = Typography;

const ProductDetailRelatedProduct: React.FC<IProductDetailRelatedProductProps> = (props) => {
    const { productsRelated } = props;
    const t = useTranslations();

    const SwiperProps: SwiperProps = {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        width: 320,
        height: 500
    } as SwiperProps;

    return <Flex vertical={true} style={{ width: "100%", padding: "10px" }} justify="flex-start">
        <Title level={5}>{t("rekomenduemye-tovary")}</Title>
        <Swiper
            {...SwiperProps}
        >
            {productsRelated.map((product,index) => (
                <SwiperSlide key={index}>
                    <ProductCart
                        Product={product}
                        addToCartSlot={
                            <AddToBasketProduct prod_id={product.id} />
                        }
                        addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </Flex>
}

export default ProductDetailRelatedProduct
