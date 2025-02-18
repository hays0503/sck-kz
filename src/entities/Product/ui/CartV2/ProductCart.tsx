"use client";
import { Flex, Spin } from "antd";
import { JSX, lazy, Suspense, useLayoutEffect, useRef, useState } from "react";
import { Level1, Level2, Level3 } from "./SubComponent";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MappedPopularProductType } from "api-mapping/product/populates";
import { useResizeObserver } from "@undefined/usehooks-ts";

interface IProductCartProps {
  readonly Product: MappedPopularProductType;
  readonly addToCartSlot: JSX.Element;
  readonly addToFavoriteSlot: JSX.Element;
}

const ProductCart: React.FC<IProductCartProps> = (props) => {
  const { Product, addToCartSlot, addToFavoriteSlot } = props;
  const currentCity = useGetCityParams();
  const locale = useLocale();
  const refContainer = useRef<HTMLDivElement>(null);
  
  const { width: CartWidth = 160 } = useResizeObserver({
    ref: refContainer,
    box: "border-box",
  });

  const ProductName = Product.name?.[locale] ? Product?.name?.[locale] : Product.name?.['ru'];

  const ProductCartSwiper = lazy(() => import("./SubComponent").then((module) => ({ default: module.ProductCartSwiper })));

  return (
    <Flex
      ref={refContainer}
      wrap
      vertical={true}
      align="center"
      justify="space-between"
      itemScope
      itemType="http://schema.org/Product"
      gap={10}
      style={{
        backgroundColor: "",
        width: "calc(100dvw / 2 - 20px)",
        borderRadius: "15px",
      }}
    >
      <Level1
        discount={Product.discount}
        addToFavoriteSlot={addToFavoriteSlot}
        Swiper={
          <Link
            href={`/city/${currentCity}/product/${props.Product.slug}`}
            prefetch={true}
            style={{
              width: CartWidth,
              height: CartWidth,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Suspense
              fallback={
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    width: CartWidth - 30,
                    height: CartWidth - 30,
                  }}
                >
                  <Spin />
                </Flex>
              }
            >
              <ProductCartSwiper
                name={ProductName}
                images={Product.img}
                width={CartWidth - 30}
                height={CartWidth - 30} 
              />
            </Suspense>
          </Link>
        }
      />
      <Link href={`/city/${currentCity}/product/${props.Product.slug}`} style={{ width: "100%" }} prefetch={true}>
        <Level2
          NameProduct={ProductName}
          average_rating={Product?.rating}
          reviews_count={Product?.reviews}
          price={Product?.price}
          discountPrice={Product?.oldPrice}
        />
      </Link>
      <Level3 addToCartSlot={addToCartSlot} />
    </Flex>
  );
};

export default ProductCart;
