import { ProductCart } from "@/entities/Product/ui/CartV2";
import AddToFavoriteProduct from "@/features/add-to-favorite-product/ui/AddToFavoriteProduct";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { Flex, Spin } from "antd";
import { MappedPopularProductType } from "api-mapping/product/by_populates";
import { CSSProperties, memo, Suspense, useCallback, useMemo } from "react";

interface Level1Props {
  readonly Products: MappedPopularProductType[];
}

// eslint-disable-next-line react/display-name
const Level1: React.FC<Level1Props> = memo(({ Products }) => {
  // const { data } = useGetBasketProductsSWR();

  const fallback = useMemo(
    () => (
      <Flex
        style={{
          width: "100%",
          height: "40px",
          background: "#2f369c",
          padding: "8px 16px",
          borderRadius: "4px",
        }}
        align="center"
        justify="center"
      >
        <Spin spinning />
      </Flex>
    ),
    []
  );


  const renderAddToCart = useCallback(
    (prod_id: number) => (
      <Suspense fallback={fallback}>
        <AddToBasketProduct prod_id={prod_id} />
      </Suspense>
    ),
    [fallback]
  );

  const gridStyle: CSSProperties = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(var(--sck-columns-on-page), 1fr)",
    gridGap: "10px"
  }

  return (
    <div style={gridStyle}>
      {Products?.map((item, index) => <ProductCart
        key={index}
        Product={item}
        addToCartSlot={renderAddToCart(item.id)}
        addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id} />}
      />
      )}</div>
  );
});

export default Level1;
