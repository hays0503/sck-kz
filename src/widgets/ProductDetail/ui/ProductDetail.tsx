"use client";

import { Flex } from "antd";
import { ProductDetailBreadcrumb, ProductDetailConfiguration, ProductDetailDescription, ProductDetailItem, ProductDetailPrice, ProductDetailSpecification, ProductDetailSwiper, ProductDetailToOrder } from "./SubComponents";
import useGetProductBySlugSWR from "@/entities/Product/model/getProductBySlugSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useLocale, useTranslations } from "next-intl";
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";
import ProductDetailRelatedProduct from "./SubComponents/ProductDetailRelatedProduct";

interface IProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;

  const locale = useLocale();
  const t = useTranslations("Status");
  const cityEn = useGetCityParams();
  const {data,isLoading,error} = useGetProductBySlugSWR(slug,cityEn);

  if(!data && isLoading){
    return <div>{t('zagruzka')}</div>
  }

  if(error){
    return <div>{t('oshibka')}</div>
  }

  const product:MappedProductDetailType = data as MappedProductDetailType;

  return (
    <Flex 
      style={{backgroundColor:"#EEEFF1"}}
      vertical={true}
      gap={10}
      itemScope={true}
      itemType="http://schema.org/Product">

      <ProductDetailItem>
        {/* Крошки */}
        <ProductDetailBreadcrumb idCategoryProduct={product.categoryId} />
      </ProductDetailItem>

      <ProductDetailItem>
        {/* Слайдер */}
        <ProductDetailSwiper
          images={product.img}
          name={product.name[locale]}
          width={300}
          height={300}
        />
      </ProductDetailItem>
 
      {product?.configuration && (
        <ProductDetailItem>
          {/* Название товара и Конфигурация */}
          <ProductDetailConfiguration nameProduct={product.name[locale]??product.slug} Configurations={product.configuration} />
        </ProductDetailItem>
      )}

      <ProductDetailItem>
        {/* Остатки и Кнопка купить */}
        <ProductDetailToOrder product={product} />
      </ProductDetailItem>

      <ProductDetailItem>
        {/* Информация о товаре - название - цена - артикул - отзывы - каспи виджет/форте виджет */}
        <ProductDetailPrice product={product} />
      </ProductDetailItem>

      <ProductDetailItem>
        {/* Характеристики */}
        <ProductDetailSpecification product={product} />
      </ProductDetailItem>

      {product?.desc && (
        <ProductDetailItem>
          <ProductDetailDescription product={product} />
        </ProductDetailItem>
      )}
{/*
      <ProductDetailItem>
        <ReviewsList productId={fetchProduct.id} />
      </ProductDetailItem>
*/}
      {product?.relatedProducts.length > 0 && (
        <ProductDetailItem>
          <ProductDetailRelatedProduct
            productsRelated={product?.relatedProducts}
          />
        </ProductDetailItem>
      )}
       
    </Flex>
  );
};
export default ProductDetail;
