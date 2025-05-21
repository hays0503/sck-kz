import { Link } from "@/i18n/routing";
import beautifulCost from "@/shared/tools/beautifulCost";
import { Divider, Flex, Typography } from "antd";
import { MappedBasketItemType } from "api-mapping/basket/v2/get-products/type/MappedBasketType";
import Image from "next/image";
import { memo } from "react";
const { Text} = Typography;
const RenderListProduct = 
  ({
    items,
    locale,
    cityEn,
  }: {
    items: MappedBasketItemType[];
    locale: string;
    cityEn: string;
  }) => (
    <>
      {items.map((item, index) => (
        <Flex key={`${item.prod.name[locale]}-${index}`} vertical>
          {index !== 0 && <Divider />}
          <Link href={`/city/${cityEn}/product/${item.prod.slug}`}>
            <Flex gap={10}>
              <Image
                src={item.prod.img[0]}
                alt={
                  item.prod?.name?.[locale] ?? item?.prod?.name?.['ru'] ?? ''
                }
                width={50}
                height={50}
                style={{ objectFit: 'scale-down' }}
              />
              <Flex justify='space-between' vertical>
                <Text>{item.prod.name[locale]}</Text>
                <Text strong>{beautifulCost(item.prod.price)}</Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      ))}
    </>
  );

export default memo(RenderListProduct)