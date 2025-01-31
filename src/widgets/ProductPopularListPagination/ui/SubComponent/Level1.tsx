import { ProductCart } from "@/entities/Product/ui/Cart";
import AddToFavoriteProduct from "@/features/add-to-favorite-product/ui/AddToFavoriteProduct";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { Col, ColProps, Row } from "antd";
import { MappedPopularProductType } from "api-mapping/product/populates";



interface Level1Props {
  readonly Products: MappedPopularProductType[]
}

// Первый уровень карты (карточки товаров)
const Level1: React.FC<Level1Props> = (props) => {
  const { Products } = props;

  const ColResponsive: ColProps = {
    xs: { offset: 1 }
  }

  return (
    <Row gutter={[1, 1]} justify="center" align="stretch">
      {Products?.map((item, index) => (
        <Col {...ColResponsive} key={index}>
          <ProductCart
            Product={item}
            addToCartSlot={
              <AddToBasketProduct prod_id={item.id}/>
            }
            addToFavoriteSlot={<AddToFavoriteProduct prod_id={item.id}/>}
          />
        </Col>
      ))}
    </Row>
  );
};


export default Level1