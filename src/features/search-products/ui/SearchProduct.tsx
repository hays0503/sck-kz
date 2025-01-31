"use client"
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

import beautifulCost from "@/shared/tools/beautifulCost";

import { AutoComplete, AutoCompleteProps,  Flex, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useDebounceCallback } from "@undefined/usehooks-ts";

const { Text } = Typography;
const { Search } = Input;


export default function SearchProduct() {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  // const city = useSelectedCity();
  const t = useTranslations();
  // const locale = useLocale();
  const router = useRouter();
  const cityEn = useGetCityParams();
  const search = useDebounceCallback(async (value: string) => {

    try {
      const response = await fetch(`/search/product/${value.toLocaleLowerCase()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      try {
        const productsRawIndex: { id: number }[] = await response.json();
        const productsId = productsRawIndex.map(product => product.id);
        try {
          const responseProducts = await fetch(`/api/v1/products/by_ids/${productsId.join(',')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          });

          try {
            const products = await responseProducts.json();
            const options = products.map((product: { slug: string; list_url_to_image: string[]; name_product: string; }) => ({
              value: product.slug,
              label: <>
                <Flex align="center" justify="space-between">
                  <Flex align="center" justify="start" gap={10} style={{
                      width: "70%"
                    }}>
                    <Image src={product.list_url_to_image[0] ?? '/nofoto.jpg'} alt={product.name_product} width={50} height={50} />
                    <Text ellipsis >Название</Text>
                  </Flex>
                  <Text>{beautifulCost(0)}</Text>
                </Flex>
              </>
            }))
            setOptions(options);
          } catch (error) {
            console.log("Произошла ошибка при поиске товара - при парсинге продуктов", error);
          }

        } catch (error) {
          console.log("Произошла ошибка при поиске товара - при запросе продуктов по id", error);
        }

      } catch (error) {
        console.log("Произошла ошибка при поиске товара - при парсинге", error);
      }
    } catch (error) {
      console.log("Произошла ошибка при поиске товара - при запросе индекса", error);
    }

  }, 500);


  return <>
  <AutoComplete
    // size="large"
    options={options}
    style={{ width: "100%" }}
    onSearch={search}
    onSelect={(value) => {
      router.push(`/city/${cityEn}/product/${value}`);
    }}
  >    
    <Search
      placeholder={t("placeholder-search")}
      role="search"
      name="search"
    />
  </AutoComplete>
  </>
}
