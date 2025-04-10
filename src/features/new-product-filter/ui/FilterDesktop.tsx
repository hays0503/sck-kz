'use client';
import { Dispatch, useEffect, useState } from 'react';
import { FilterType } from './SubModule/FilterValueCheckBox';
import { Flex, notification, Typography, Button } from 'antd';
import FilterGroupDesktop from './SubModuleDesktop/FilterGroupDesktop';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

interface FilterProps {
  dropFilter: () => void;
  dataSpecifications: FilterType[];
  filterActive: number[];
  setFilterActive: Dispatch<React.SetStateAction<number[]>>;
  height: number | string;
  SetCurrentPage: Dispatch<React.SetStateAction<number>>;
}

const FilterDesktop: React.FC<FilterProps> = ({
  dropFilter,
  dataSpecifications,
  filterActive,
  setFilterActive,
  height,
  SetCurrentPage,
}) => {
  const t = useTranslations('Filter');
  const [api, contextHolder] = notification.useNotification();
  const [tempFilterStorage, setTempFilterStorage] = useState<number[]>([]);
  // useLayoutEffect(() => {
  //   const GetFilterData = async () => {
  //     const data = await fetch(`/api-mapping/filter/?category=${category}`);
  //     const { result } = await data.json();
  //     setDataSpecifications(result);
  //   };
  //   GetFilterData();
  // }, [category]);

  useEffect(() => {
    if (tempFilterStorage.length !== 0) {
      api.destroy();
      api.info({
        actions: (
          <Button
            style={{
              width: '100%',
              height: '30px',
              backgroundColor: '#4954F0',
              borderRadius: '10px',
            }}
            onClick={() => {
              setFilterActive(tempFilterStorage);
              SetCurrentPage(1);
            }}
          >
            <Text style={{ color: '#fff' }}>
              {t('pokazat-vybrannye-tovary')}
            </Text>
          </Button>
        ),
        message: `Найдено ${tempFilterStorage.length} товаров `,
        placement: 'top',
        duration: 6000,
      });
    }
  }, [SetCurrentPage, api, filterActive.length, setFilterActive, t, tempFilterStorage, tempFilterStorage.length]);

  // if (!dataSpecifications)
  //   return (
  //     <Flex
  //       style={{
  //         height: `${height}px`,
  //         overflowY: 'scroll',
  //         width: '25%',
  //       }}
  //     >
  //       <Text>{t('zagruzka-filtrov')}</Text>
  //     </Flex>
  //   );

  return (
    <Flex
      vertical
      style={{
        height: `${height}px`,
        overflowY: 'scroll',
        minWidth: '300px',
        width: '25%',
      }}
    >
      <FilterGroupDesktop
        dropFilter={dropFilter}
        specificationDefault={dataSpecifications}
        filterActive={tempFilterStorage}
        setFilterActive={setTempFilterStorage}
      />
      {contextHolder}
    </Flex>
  );
};

export default FilterDesktop;
