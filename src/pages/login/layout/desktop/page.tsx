'use server';
import { MappedCategoryWithoutChildrenType } from 'api-mapping/category/root/type';
import { getCategoryRoot } from '@/entities/Category';
import getCity from '@/entities/City/api/getCity';
import { MappedCityType } from 'api-mapping/city';
import { ProvidersServer } from '@/shared/providers/providersServer';
import { ProvidersClient } from '@/shared/providers/providersClient';
import { LayoutMainDesktop } from '@/widgets/LayoutMainDesktop';
import { SelectCity } from '@/features/select-city';
import { ChangeLanguage } from '@/features/change-language';
import { SearchProduct } from '@/features/search-products';
import { HeaderDesktop } from '@/widgets/HeaderDesktop';
import { CatalogDesktop } from '@/widgets/CatalogDesktop';
import { UserCabinet } from '@/widgets/UserCabinet';
import { BasketButton } from '@/widgets/BasketButton';
import { FooterSCK } from '@/widgets/FooterSCK';
import { LoginMobile } from '@/widgets/LoginMobile';
import { Flex } from 'antd';

type LoginPageProps = {
  params: { locale: string; city: string; link: string[] | undefined };
};

// type LoginPageType = ({params}: LoginPageProps) => Promise<JSX.Element>

const LoginPage = async ({ params }: LoginPageProps) => {
  const { city, link } = await params;


  const urlCallback = link && `/${link?.join('/')}`;

  const cities: MappedCityType[] = await getCity();

  const categoryRoot:
    | { results: MappedCategoryWithoutChildrenType[] }
    | undefined = await getCategoryRoot(city);

  const urlCity = `/api-mapping/city`;
  const urlCategoryRoot = `/api-mapping/category/root/?city=${city}`;
  const fallback = {
    [urlCity]: cities,
    [urlCategoryRoot]: categoryRoot,
  };

  return (
    <ProvidersServer>
      <ProvidersClient fallback={fallback}>
        <LayoutMainDesktop
          headerContent={
            <HeaderDesktop
              SelectCity={SelectCity}
              ChangeLanguage={ChangeLanguage}
              SearchProduct={SearchProduct}
              CatalogDesktop={CatalogDesktop}
              UserCabinet={UserCabinet}
              BasketButton={BasketButton}
            />
          }
          content={
            <Flex justify='center' align='center'>
              <LoginMobile urlCallback={urlCallback} style={{ width: '50%' }} />
            </Flex>
          }
          footerContent={<FooterSCK />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default LoginPage;
