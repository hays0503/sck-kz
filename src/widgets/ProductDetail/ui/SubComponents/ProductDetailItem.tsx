import { Flex } from "antd";

const ProductDetailItem: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      style={{
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      {props.children}
    </Flex>
  );
};

export default ProductDetailItem;
