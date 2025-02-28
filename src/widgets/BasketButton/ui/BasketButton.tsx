"use client";
import useGetBasketProductsSWR from "@/entities/Basket/model/getBasketProductsSWR";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import beautifulCost from "@/shared/tools/beautifulCost";
import { useLocalStorage } from "@undefined/usehooks-ts";
import { Badge, Button, Divider, Flex, Typography } from "antd";
import { useLayoutEffect } from "react";
import {  v4 as uuidv4 } from "uuid";
const { Text } = Typography;

export default function BasketButton() {
  const route = useRouter();
  const cityEn = useGetCityParams();
  const [uuid,setUuid] = useLocalStorage<string>('uuid_id',"")
  const { data, isLoading, error } = useGetBasketProductsSWR();

  useLayoutEffect(()=>{
    if(!uuid){
      setUuid(uuidv4())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка</div>;
  }

  const BasketItems = data?.items;

  const total = BasketItems?.reduce((acc, item) => acc + (item.count * item.prod.price), 0);
  const badge = BasketItems?.reduce((acc, item) => acc + item.count, 0);

  const onClick = () => {
    route.push(`/city/${cityEn}/basket/${uuid}`)
  }

  return (
    <Button
      size="large"
      style={{ backgroundColor: "#3E54CF", border: "4px" }}
      onClick={onClick}
    >
      <Flex justify="center" align="center">
        <Badge count={badge} offset={[-45, 5]}>
          <Flex
            justify="center"
            align="center"
            style={{
              width: "30px",
              height: "44px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.41711 14.1667H14.4415C15.2331 14.1667 15.6289 14.1667 15.9515 14.0237C16.2359 13.8977 16.4794 13.6945 16.6543 13.4372C16.8527 13.1454 16.9235 12.756 17.0651 11.9771L18.1908 5.78601C18.2398 5.51606 18.2644 5.38109 18.2265 5.2757C18.1932 5.18324 18.1283 5.10551 18.0433 5.05624C17.9464 5.00008 17.8092 5.00008 17.5349 5.00008H4.16711M1.66699 1.66675H2.764C2.96624 1.66675 3.06736 1.66675 3.14914 1.70369C3.22122 1.73625 3.28255 1.78865 3.32595 1.85477C3.37519 1.92979 3.39096 2.02967 3.42251 2.22944L5.74481 16.9374C5.77636 17.1372 5.79213 17.237 5.84137 17.3121C5.88477 17.3782 5.9461 17.4306 6.01818 17.4631C6.09996 17.5001 6.20108 17.5001 6.40332 17.5001H15.8337"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Flex>
        </Badge>
        <Divider
          type="vertical"
          dashed={true}
          plain={true}
          style={{ borderColor: "white", height: "36px" }}
        />
        <Flex
          justify="center"
          align="center"
          style={{
            width: "70px",
            height: "44px",
          }}
        >
          <Text style={{ color: "white" }}>
            {beautifulCost(total ?? 0)}
          </Text>
        </Flex>
      </Flex>
    </Button>
  )
}
