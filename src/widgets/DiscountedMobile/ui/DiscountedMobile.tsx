'use client'
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { CSSProperties } from "styled-components";
import { ProductCart } from "@/entities/Product/ui/CartV2";;
import { Flex, Pagination, Skeleton, Typography,PaginationProps } from "antd";
import useGetProductByDiscountedSWR from "@/entities/Product/model/useGetProductByDiscountedSWR";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import AddToFavoriteProduct from "@/features/add-to-favorite-product/ui/AddToFavoriteProduct";
import { SortingProducts } from "@/features/sorting-products";
import { Spin } from "antd";
import { parseAsInteger, useQueryState } from "nuqs";
import { PRODUCT } from "@/shared/constant/product";
import { Link } from "@/i18n/routing";

const { Text } = Typography

interface IDiscountedMobileProps {
    order: "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price" | "none_sort";
    page: number;
}


const DiscountedMobile: React.FC<IDiscountedMobileProps> = ({order,page}) => {
  const cityEn = useGetCityParams();
  const [sortOrder] = useQueryState("order", { defaultValue: order ?? "stocks__price" });
  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(page!=1?page:1));
  const { data,isLoading,isValidating } = useGetProductByDiscountedSWR({
    city: cityEn,
    orderBy: sortOrder as "avg_rating" | "-avg_rating" | "stocks__price" | "-stocks__price" | "none_sort",
    page: currentPage,
  });

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  };

  const products = data?.results;
  const ProductsLen = data?.len || 0;

  if(isLoading || isValidating){
    return (
      <Flex vertical>
        <Spin fullscreen size="large"/>
        <SortingProducts url={`/city/${cityEn}/catalog/discounted`} />
        <div style={gridStyle}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Flex vertical gap={10} key={index}>
              <Skeleton.Node
                active
                style={{ width: '47.60dvw', height: '64.21dvw' }}
              />
              <Skeleton
                active
                style={{
                  width: '47.60dvw',
                  height: '32,105dvw',
                }}
              />
            </Flex>
          ))}
        </div>
      </Flex>
    );
  }

    const ItemRender: PaginationProps["itemRender"] = (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: React.ReactNode) => {
      if (type === 'page') {
        return <Link href={`/city/${cityEn}/discounted/?page=${page}`} style={{margin: "0 10px"}}>
                  <Text style={{ cursor: "pointer",fontSize: "14px" }}>
                      {page}
                  </Text>
                </Link>;
      } else {
        return element;
      }
    };
  

  return (
    <Flex vertical>
      <SortingProducts url={`/city/${cityEn}/discounted`} />
      <div style={gridStyle}>
        {products?.map((product) => (
          <ProductCart
            key={product.id}
            Product={product}
            addToCartSlot={<AddToBasketProduct prod_id={product.id} />}
            addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id} />}
          />
        ))}
      </div>

      {ProductsLen > PRODUCT.PRODUCT_PER_PAGE && (
        <Pagination
          align='center'
          pageSize={PRODUCT.PRODUCT_PER_PAGE}
          total={ProductsLen}
          current={currentPage}
          defaultPageSize={PRODUCT.PRODUCT_PER_PAGE}
          defaultCurrent={1}
          responsive={true}
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
          itemRender={ItemRender}
          size="default"
        />
      )}
    </Flex>
  );
};

export default DiscountedMobile