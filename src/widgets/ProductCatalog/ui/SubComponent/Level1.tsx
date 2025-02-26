import useGetBasketProductsSWR from "@/entities/Basket/model/getBasketProductsSWR";
import { ProductCart } from "@/entities/Product/ui/CartV2";
import AddToFavoriteProduct from "@/features/add-to-favorite-product/ui/AddToFavoriteProduct";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { Col, ColProps, Flex, Row, Spin } from "antd";
import { MappedPopularProductType } from "api-mapping/product/populates";
import { CSSProperties, Suspense } from "react";



interface Level1Props {
  readonly Products: MappedPopularProductType[]
}

// Первый уровень карты (карточки товаров)
const Level1: React.FC<Level1Props> = (props) => {
  const { Products } = props;

  const ColResponsive: ColProps = {
    // xs: { offset: 1 }
  }

  const { data } = useGetBasketProductsSWR();

  const ButtonStyle: CSSProperties = {
    width: "100%",
    height: "40px",
    background: "#2f369c",
    padding: "8px 16px",
    borderRadius: "4px"
  }

  return (
    <Row gutter={[5, 5]} justify="center" align="stretch">
      {Products?.map((item, index) => (
        <Col {...ColResponsive} key={index}>
          <ProductCart
            Product={item}
            addToCartSlot={
              <Suspense fallback={<Flex style={ButtonStyle} align="center" justify="center">
                <Spin spinning />
              </Flex>
              }
              >
                <AddToBasketProduct prod_id={item.id} data={data} />
              </Suspense>
            }
            addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id} />}
          />
        </Col>
      ))}
    </Row>
  );
};


export default Level1