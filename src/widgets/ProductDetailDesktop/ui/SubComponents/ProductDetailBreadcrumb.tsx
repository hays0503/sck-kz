import React, { memo, useMemo } from "react";
import useGetCategoryAllSWR from "@/entities/Category/model/getCategoryAllSWR";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import findCategory from "@/shared/tools/findCategory";
import { Flex } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Breadcrumb } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale, useTranslations } from "next-intl";

interface IProductBreadcrumbProps {
  idCategoryProduct: number;
  name: string|null
}

const ProductDetailBreadcrumb: React.FC<IProductBreadcrumbProps> = ({ idCategoryProduct,name }) => {
  const localeActive = useLocale();
  const city = useGetCityParams();
  const t = useTranslations("Status");
  const tt = useTranslations("Catalog");
  const ttt = useTranslations("ProductDetailBreadcrumb");
  const { data, isLoading, error } = useGetCategoryAllSWR(city);

  const breadcrumbsItems: ItemType[] = useMemo(() => {
    if (!data || isLoading || error) {
      return [];
    }

    const categories: MappedCategoryType[] = data.results as MappedCategoryType[];

    const startCategory = findCategory(categories, (category) => category.id === idCategoryProduct);
    const rawBreadcrumbsItems: MappedCategoryType[] = [];

    let currentCategory: MappedCategoryType | undefined = startCategory;

    while (currentCategory) {
      rawBreadcrumbsItems.push(currentCategory);
      const parentId = currentCategory.parent;
      currentCategory = parentId ? findCategory(categories, (category) => category.id === parentId) : undefined;
    }

    return [
      {
        title: <Link prefetch={true} href={`/city/${city}/main`}>{ttt('glavnaya')}</Link>,
      },
      {
        title: <Link prefetch={true} href={`/city/${city}/catalog`}>{tt('katalog')}</Link>,
      },
      ...rawBreadcrumbsItems.reverse().map((category) => ({
        title: <Link prefetch={true} href={`/city/${city}/catalog/${category?.slug}`}>{category?.name[localeActive]}</Link>,
      })),
      {
        title: name
      }
    ];
  }, [data, isLoading, error, city, ttt, tt, name, idCategoryProduct, localeActive]);

  if (!data || isLoading) {
    return <div>{t("zagruzka")}</div>;
  }

  if (error) {
    return <div>{t("oshibka")}</div>;
  }

  return (
    <Flex style={{ width: "100%" }}>
      <Breadcrumb items={breadcrumbsItems} />
    </Flex>
  );
};



export default memo(ProductDetailBreadcrumb);
