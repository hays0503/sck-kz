import React, { memo, useCallback } from 'react';
import { Button, ButtonProps, Flex, Skeleton } from 'antd';
import Image from 'next/image';
import useGetBrandByCategorySWR from '@/entities/Category/model/getBrandByCategorySWR';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';

interface BrandDataRaw {
  id: number;
  name_brand: string | null | undefined;
  additional_data: {
    EN: string | null | undefined;
    KZ: string | null | undefined;
  };
  logo: { image: string }[];
}

interface BrandListProps {
  slugCategory: string;
  selectBrand: string;
  setSelectBrand: React.Dispatch<React.SetStateAction<string>>;
}

const BrandList: React.FC<BrandListProps> = ({
  slugCategory,
  selectBrand,
  setSelectBrand,
}) => {
  const cityEn = useGetCityParams();
  const { data, isLoading, isValidating } = useGetBrandByCategorySWR(
    slugCategory,
    cityEn,
  );

  const getName = useCallback(
    (data: BrandDataRaw, lang: string): string | null | undefined => {
      switch (lang) {
        case 'EN':
          return data.additional_data.EN;
        case 'KZ':
          return data.additional_data.KZ;
        default:
          return data.name_brand;
      }
    },
    [],
  );

  if (isLoading || isValidating) {
    return (
      <Flex
        vertical
        justify='center'
        align='center'
        style={{ width: '100%', height: '100px' }}
      >
        <Skeleton active />
      </Flex>
    );
  }

  const brands = data?.results as BrandDataRaw[];

  if (!brands || brands.length <= 1) {
    return null;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gridGap: '10px',
        width: 'calc(100%)',
        // backgroundColor: 'red',
        padding: '5px',
      }}
    >
      {brands.map((brand, index) => {
        const haveImg = brand.logo.length > 0;
        const name = getName(brand, cityEn) ?? 'No name';

        const buttonProps: ButtonProps = {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '45px',
            padding: '5px',
            overflow: 'hidden',
            boxShadow: '1px 1px 50px 5px rgba(34, 60, 80, 0.1)',
            border:
              selectBrand === brand.id.toString()
                ? '2px solid #F00'
                : '2px solid transparent',
          },
          onClick: () => {
            if (selectBrand === brand.id.toString()) return setSelectBrand('');
            setSelectBrand(brand.id.toString());
          },
        };

        return (
          <Button key={index} {...buttonProps}>
            {haveImg ? (
              <Image
                src={brand.logo[0].image}
                fill
                alt={name}
                style={{
                  maxHeight: '40px',
                  maxWidth: '100px',
                  backgroundColor: '#fff',
                  objectFit: 'contain',
                  padding: '5px',
                }}
              />
            ) : (
              name
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default memo(BrandList);
