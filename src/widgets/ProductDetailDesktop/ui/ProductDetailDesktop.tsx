"use client";

import { Flex } from "antd";
import { ProductDetailBreadcrumb, ProductDetailConfiguration, ProductDetailDescription, ProductDetailItem, ProductDetailPrice, ProductDetailSpecification, ProductDetailSwiper, ProductDetailToOrder } from "./SubComponents";
import useGetProductBySlugSWR from "@/entities/Product/model/getProductBySlugSWR";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useLocale, useTranslations } from "next-intl";
import { MappedProductDetailType } from "api-mapping/product/_type/productDetail";
import ProductDetailRelatedProduct from "./SubComponents/ProductDetailRelatedProduct";
import { useEffect } from "react";
import { useReadLocalStorage } from "@undefined/usehooks-ts";

interface IProductDetailProps {
  slug: string;
}

const SendMessage: React.FC<{ id: number }> = ({ id }) => {
  const client_uuid = useReadLocalStorage<string>("uuid_id");

  useEffect(() => {
    fetch("/auth_api/v2/viewed/add_viewed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        client_uuid: client_uuid,
      })
    })
  }, [client_uuid, id]);
  return <></>
}

const ProductDetailDesktop: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;

  const locale = useLocale();
  const t = useTranslations("Status");
  const cityEn = useGetCityParams();
  const { data: ProductBySlug, isLoading, error } = useGetProductBySlugSWR(slug, cityEn);


  if (!ProductBySlug && isLoading) {
    return <div>{t('zagruzka')}</div>
  }

  if (error) {
    return <div>{t('oshibka')}</div>
  }

  const product: MappedProductDetailType = ProductBySlug as MappedProductDetailType;





  return (
    <>

      <SendMessage id={product.id} />

      <Flex
        style={{ backgroundColor: "#EEEFF1" }}
        vertical={true}
        gap={10}
        itemScope={true}
        itemType="http://schema.org/Product">

        <ProductDetailItem>
          {/* Крошки */}
          <ProductDetailBreadcrumb idCategoryProduct={product.categoryId} name={product?.name?.[locale]} />
        </ProductDetailItem>

        <ProductDetailItem>
          <Flex justify="space-between" gap={5} style={{ width: "100%" }}>
            {/* Слайдер */}
            <Flex justify="center" style={{ width: "50%" }}>
            <ProductDetailSwiper
              images={product.img}
              name={product?.name?.[locale]}
              width={350}
              height={400}
            />
            </Flex>
            <Flex vertical style={{ width: "50%" }}>
              {/* Информация о товаре - название - цена - артикул - отзывы - каспи виджет/форте виджет */}
              <ProductDetailPrice product={product}
                Buy={<ProductDetailToOrder product={product} />}// Кнопка купить
                Configurations={<>
                  {product?.configuration && <ProductDetailConfiguration //Название товара и Конфигурация
                    Configurations={product.configuration} />
                  }
                </>
                }
              />


            </Flex>
          </Flex>
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
        {product?.relatedProducts && product?.relatedProducts.length > 0 && (
          <ProductDetailItem>
            <ProductDetailRelatedProduct
              productsRelated={product?.relatedProducts}
            />
          </ProductDetailItem>
        )}

      </Flex>
    </>
  );
};
export default ProductDetailDesktop;
