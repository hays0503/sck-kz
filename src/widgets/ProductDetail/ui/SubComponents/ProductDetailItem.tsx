import { useIntersectionObserver } from '@undefined/usehooks-ts';
import { Flex } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ProductDetailItemProps {
  callbackIntersecting?: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ProductDetailItem: React.FC<ProductDetailItemProps> = (props) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  useEffect(() => {
    if (props.callbackIntersecting) {
      props.callbackIntersecting(!isIntersecting);
    }
  }, [isIntersecting, props]);

  return (
    <Flex
      ref={ref}
      vertical={true}
      align='center'
      justify='center'
      style={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      {props.children}
    </Flex>
  );
};

export default ProductDetailItem;
