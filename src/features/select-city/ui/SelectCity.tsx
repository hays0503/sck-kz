'use client';

import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Tour,
  TourProps,
  Typography,
  Popconfirm,
  Flex,
} from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import {
  ChangeEvent,
  CSSProperties,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DownOutlined } from '@ant-design/icons';
import ComponentSelectCityList from './ComponentSelectCityList';
import { useGetCityParams } from '@/shared/hooks/useGetCityParams';
import { MappedCityType } from 'api-mapping/city';
import { useGetCitySWR } from '@/entities/City';
import { useLocalStorage } from 'usehooks-ts';
import searchCity from '@/shared/tools/searchCity';

const { Text } = Typography;
const { Search } = Input;

const SelectCity = () => {
  const t = useTranslations('SelectCity');
  const tStatus = useTranslations('Status');
  const { data: cities, isLoading, error } = useGetCitySWR();

  const [isOpen, setIsOpen] = useState(false);
  const [citiesSearch, setCitiesSearch] = useState<
    MappedCityType[] | undefined
  >(cities?.results);
  const [openToor, setOpenToor] = useState(false);
  const refButton = useRef(null);

  const [selectCityLocal, setSelectCityLocal] = useLocalStorage<
    { locale: string; city: string } | null | undefined
  >('params', undefined);

  const locale = useLocale();
  const cityEn = useGetCityParams();

  const style: CSSProperties = {
    height: 32,
  };

  useLayoutEffect(() => {
    if (!selectCityLocal?.city) {
      setOpenToor(true);
    }
  }, [selectCityLocal]);

  if (!cities && isLoading) {
    return (
      <Flex justify='center' align='center' style={style}>
        {tStatus('zagruzka')}
      </Flex>
    );
  }
  if (error) {
    return (
      <Flex justify='center' align='center' style={style}>
        {tStatus('oshibka')}
        {error.message}
      </Flex>
    );
  }

  if (!cities) {
    return (
      <Flex justify='center' align='center' style={style}>
        {tStatus('net-dannykh')}
      </Flex>
    );
  }

  const steps: TourProps['steps'] = [
    {
      target: () => refButton.current,
      title: t('vybor-goroda'),
      description: t('vyberite-gorod-v-kotorom-vy-khotite-sovershit-pokupku'),
      placement: 'bottom',
      type: 'primary',
      nextButtonProps: {
        children: t('pereiti-k-vyboru-goroda'),
        onClick: () => {
          setOpenToor(false);
          setIsOpen(true);
        },
      },
    },
  ];

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredCities: MappedCityType[] = searchCity(
      e.target.value,
      cities.results,
      locale,
    );
    if (filteredCities.length) {
      setCitiesSearch(filteredCities);
    } else {
      setCitiesSearch(cities.results);
    }
  };

  const key = locale === 'en' ? 'en' : locale === 'kk' ? 'kk' : 'ru';

  const CurrentCity: string =
    cities.results?.find((city: MappedCityType) => city['en'] === cityEn)?.[
      key
    ] ?? 'Город не найден';

  return (
    <Flex style={style}>
      <Button
        ref={refButton}
        type={'text'}
        onClick={() => setIsOpen(true)}
        style={{ padding: 0, border: '1px solid #f4f4f42e' }}
      >
        <Text strong={true} data-testid='select-city'>
          {CurrentCity}
        </Text>
        <DownOutlined />
      </Button>
      <Tour open={openToor} onClose={() => setOpenToor(false)} steps={steps} />
      <Modal
        open={isOpen}
        closeIcon={
          <Popconfirm
            title={`${t('vybrannyi-vami-gorod')} ${CurrentCity}?`}
            onConfirm={() => {
              setIsOpen(false);
              setSelectCityLocal({ locale: locale, city: cityEn });
            }}
            okText='Да'
            cancelText='Нет'
          >
            <a>X</a>
          </Popconfirm>
        }
        footer={[]}
      >
        <Space direction='vertical' size={[16, 16]}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Text>{t('selectCity')}</Text>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Search
                data-testid='search-city'
                onChange={onSearch}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <ComponentSelectCityList
                cities={citiesSearch ?? cities.results}
                setCityLocale={setSelectCityLocal}
              />
            </Col>
          </Row>
        </Space>
      </Modal>
    </Flex>
  );
};
export default SelectCity;
