import styles from "./CatalogSubMenu.module.scss";
import Link from "next/link";
import { Space, Typography } from "antd";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { MappedCategoryType } from "api-mapping/category/all/type";

const { Text } = Typography;
export const CatalogSubMenu = ({ Categories }: { Categories: MappedCategoryType[] }) => {
  const localActive = useLocale();
  const currentCity = useGetCityParams();
  
  return (
    <>
      <div className={styles.CatalogSubMenuRoot}>
        <div className={styles.CatalogSubMenuMain}>
          {Categories.map((Category: MappedCategoryType) => (
            <div className={styles.CatalogSubMenuContainer} key={Category.id}>
              <Space>
                {Category.img[0] && (
                  <Image
                    alt="image icon"
                    priority={true}
                    width={32}
                    height={32}
                    src={Category.img[0]}
                  />
                )}
                <div className={styles.listElementHover}>
                  <Link
                    href={`/${localActive}/${currentCity}/catalog/${Category.slug}`}
                    style={{ color: "inherit" }}
                  >
                    <Text underline style={{ color: "inherit" }}>
                      {Category?.name?.[localActive] ?? ""}
                    </Text>
                  </Link>
                </div>
              </Space>
              <ul role="navigation-list">
                {Category.children.map((SubCategory: MappedCategoryType) => (
                  <li
                    key={SubCategory.id}
                    className={styles.listElementHover}
                  >
                    <Link 
                    style={{ color: "inherit" }}
                    href={`/${localActive}/${currentCity}/catalog/${SubCategory.slug}`}>
                      {SubCategory?.name?.[localActive] ?? ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
