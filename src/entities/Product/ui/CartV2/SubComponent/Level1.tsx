import { Flex, Tag } from "antd";
import { JSX } from "react";

interface ILevel1Props {
  readonly addToFavoriteSlot: JSX.Element;
  readonly Swiper: JSX.Element;
  readonly discount: number | string | null | undefined;
}

// Первый уровень карты (скидка и слайдер)
const Level1: React.FC<ILevel1Props> = (props) => {
  const { discount, Swiper, addToFavoriteSlot } = props;

  const AddFavorite = () => <Flex
    align="center"
    justify="space-between"
    wrap
    style={{ 
      width: "100%",
      height:0,
      flexDirection: "row-reverse",
      }}
  >
    <>{addToFavoriteSlot}</>
    {discount && <Tag color="#464646" style={{
      
    }}>{`-${Math.round(Number(discount))}%`}</Tag>}
  </Flex>

  return (
    <Flex
      vertical={true}
      gap={10}
      align="center"
      style={{ width: "100%", position: "relative" }}
    >
      <AddFavorite />
      {Swiper}
    </Flex>
  );
};

export default Level1;
