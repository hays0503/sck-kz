'use client';
import { Link, useRouter } from '@/i18n/routing';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';

import beautifulCost from '@/shared/tools/beautifulCost';

import {
  AutoComplete,
  AutoCompleteProps,
  Flex,
  Image as ImageAntd,
  Input,
  Spin,
  Typography,
} from 'antd';

import { useState } from 'react';
import { useDebounceCallback } from '@undefined/usehooks-ts';
import { SearchOutlined } from '@ant-design/icons';
import { useLocale, useTranslations } from 'next-intl';
import { MappedPopularProductType } from 'api-mapping/product/by_populates';
import Image from 'next/image';
const { Text, Paragraph } = Typography;

export default function SearchProduct() {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const router = useRouter();
  const cityEn = useGetCityParams();
  const locale = useLocale();
  const [text, setText] = useState('');
  const search = useDebounceCallback(async (value: string) => {
    try {
      const response = await fetch(
        `/api/v2/search/${value.toLocaleLowerCase()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      try {
        const productsRawIndex: { results: { id: number }[] } =
          await response.json();
        const productsId = productsRawIndex?.results?.map(
          (product) => product.id,
        );
        console.log('productsId', productsId);
        try {
          const responseProducts = await fetch(
            `/api-mapping/product/by_ids/?order=none_sort&city=${cityEn}&page=1&ids=${productsId.join(',')}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              cache: 'force-cache',
            },
          );

          try {
            const products = await responseProducts.json();
            const options = products?.results.map(
              (product: MappedPopularProductType) => {
                const img =
                  product?.img?.[0].replace(
                    'http://185.100.67.246:8888',
                    'https://sck.kz',
                  ) ?? '/nofoto.jpg';
                return {
                  value: product.slug,
                  label: (
                    <>
                      <Flex align='center' justify='space-between'>
                        <Flex
                          align='center'
                          justify='start'
                          gap={10}
                          style={{
                            width: '70%',
                          }}
                        >
                          <ImageAntd
                            preview={false}
                            src={img}
                            alt={product?.name?.[locale] ?? img}
                            width={100}
                            height={100}
                            loading='lazy'
                            style={{
                              objectFit: 'scale-down',
                              aspectRatio: '1/1',
                            }}
                            placeholder={
                              <Spin size={'small'}>
                                <Image
                                  quality={5}
                                  width={100}
                                  height={100}
                                  src={img}
                                  alt={product?.name?.[locale] ?? img}
                                />
                              </Spin>
                            }
                          />
                          <Paragraph ellipsis={{ rows: 1 }}>
                            <Text>{product?.name?.[locale]}</Text>
                          </Paragraph>
                        </Flex>
                        <Text>{beautifulCost(product?.price)}</Text>
                      </Flex>
                    </>
                  ),
                };
              },
            );
            setOptions(options);
          } catch (error) {
            console.log(
              'Произошла ошибка при поиске товара - при парсинге продуктов',
              error,
            );
          }
        } catch (error) {
          console.log(
            'Произошла ошибка при поиске товара - при запросе продуктов по id',
            error,
          );
        }
      } catch (error) {
        console.log('Произошла ошибка при поиске товара - при парсинге', error);
      }
    } catch (error) {
      console.log(
        'Произошла ошибка при поиске товара - при запросе индекса',
        error,
      );
    }
  }, 500);

  const t = useTranslations();

  return (
    <AutoComplete
      value={text}
      autoClearSearchValue
      listHeight={600}
      options={options}
      style={{ width: '100%', height: '100%' }}
      onSearch={search}
      onChange={(value) => setText(value)}
      onSelect={(value) => {
        setText('');
        router.push(`/city/${cityEn}/product/${value}`);
      }}
      dropdownStyle={{
        width: '100%',
        position: 'absolute',
        left: 0,
      }}
      notFoundContent={
        <>{text !== '' && <Text>{t('nichego-ne-nai-deno')}</Text>}</>
      }
      dropdownRender={(menu) => (
        <Flex vertical style={{ width: '100%' }}>
          {menu}
          {options && options?.length > 0 && (
            <Link
              href={`/city/${cityEn}/search/${text}`}
              style={{
                background: ' #4954f0',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
                display:"flex",
                gap:"5px",
                justifyContent:"center",
                alignContent:"center",
              }}
            >
              <SearchOutlined style={{ color: '#ffffff',fontSize:"16px" }}/>
              <Text style={{ color: '#ffffff' }}>{t('smotret-vse')}</Text>
            </Link>
          )}
        </Flex>
      )}
    >
      <Input
        placeholder={'Поиск'}
        style={{
          height: '40px',
          backgroundColor: 'transparent',
          border: '1px solid rgb(142, 142, 142)',
        }}
        prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
        role='search'
        name='search'
      />
    </AutoComplete>
  );
}
