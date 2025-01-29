import getCategoryAll from "@/entities/Category/api/getCategoryAll";
import getProductBySlug from "@/entities/Product/api/getProductBySlug";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findCategory from "@/shared/tools/findCategory";
import { HeaderText } from "@/shared/ui";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProductDetail } from "@/widgets/ProductDetail";
import { JSX } from "react";

interface IProductPageProps {
  params: {
    locale: string;
    city: string;
    slug: string;
  };
}

type ProductPageComponent = (props: IProductPageProps) => Promise<JSX.Element>;

const ProductPage: ProductPageComponent = async (props) => {
  const { locale, slug, city} = await props.params;

  const productData = await getProductBySlug({ slug, city });
  const categoryAllData = await getCategoryAll();

  const categoryName = findCategory(categoryAllData?.results,(category)=>category.id === productData?.categoryId)?.name[locale] ?? "";

  const fallback = {
    [`/api-mapping/product/by_slug/?slug=${slug}&city=${city}`]:productData
  }

  return (
    <ProvidersServer>
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
  );
};

export default ProductPage;
