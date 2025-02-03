import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getProductBySlug from "@/entities/Product/api/getProductBySlug";
import { Link } from "@/i18n/routing";
import { STATUS_CODE } from "@/shared/constant/statusCode";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProductDetail } from "@/widgets/ProductDetail";
import { Flex } from "antd";
import { getTranslations } from "next-intl/server";

import React, { JSX } from "react";

interface IProductPageProps {
  params: {
    locale: string;
    city: string;
    slug: string;
  };
}

type ProductPageComponent = (props: IProductPageProps) => Promise<JSX.Element>;


const ProductPage: ProductPageComponent = async (props) => {
  const { locale, slug, city } = await props.params;
  const t = await getTranslations("NotFound");

  const productData = await getProductBySlug({ slug, city });
  if (productData.statusCode !== STATUS_CODE.OK) return <ErrorPage
    fallback={{}}
    content={<h4>{t('tovar-udalen-ili-polnostyu-rasprodan-v-etom-gorode-no-v-nashem-magazine-vas-zhdet-tysyacha-drugikh-tovarov')}</h4>}
    city={city}
  />;

  const categoryAllData = await getCategoryAll();

  const categoryName = findCategory(categoryAllData?.results, (category) => category.id === productData.data?.categoryId)?.name[locale] ?? "";

  const fallback = {
    [`/api-mapping/product/by_slug/?slug=${slug}&city=${city}`]: productData
  }



  return <DefaultPage fallback={fallback} categoryName={categoryName} slug={slug} />
};


const DefaultPage: React.FC<{ fallback: object, categoryName: string, slug: string }> = ({ fallback, categoryName, slug }) => <ProvidersServer>
  <ProvidersClient fallback={fallback}>
    <LayoutCustom
      h="px"
      hightHeader={70}
      hightFooter={80}
      headerContent={
        <HeaderText text={categoryName} />
      }
      content={<ProductDetail slug={slug} />}
      footerContent={<FooterMobile defaultKey="1" />}
    />
  </ProvidersClient>
</ProvidersServer>

const ErrorPage: React.FC<{ fallback: object, content: JSX.Element, city: string }> = async ({ fallback, city, content }) => {
  const t = await getTranslations("NotFound");
  return <ProvidersServer>
    <ProvidersClient fallback={fallback}>
      <LayoutCustom
        h="px"
        hightHeader={70}
        hightFooter={80}
        headerContent={
          <HeaderText text={"Увы товара нет"} />
        }
        content={<Flex align="center" justify="center" style={{ width: "100%" }} gap={10} vertical>
          {content}
          <Link href={`/city/${city}/main`}>{t('vernutsya-na-glavnuyu')}</Link>
        </Flex>}
        footerContent={<FooterMobile defaultKey="1" />}
      />
    </ProvidersClient>
  </ProvidersServer>
}

export default ProductPage;
