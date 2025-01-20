import { Flex } from "antd";
import { JSX } from "react";

 
 interface ILevel3Props {
    readonly addToCartSlot: JSX.Element;
  }
 
 // Третий уровень карты (В корзину и добавить в избранное)
  const Level3: React.FC<ILevel3Props> = (props) => {
    const {addToCartSlot} = props
    return (
      <Flex
        style={{ width: "100%" }}
        align="center"
        justify="center"
      >
        <>{addToCartSlot}</>
      </Flex>
    );
  };

export default Level3;