"use client";
import { Link, useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Divider, Flex, Typography } from "antd";
import { MappedCategoryType } from "api-mapping/category/all/type";
import { useLocale } from "next-intl";
import Image from "next/image";

const { Title } = Typography;

const RowCategory: React.FC<{ item: MappedCategoryType }> = ({ item }) => {
  const selectCity = useGetCityParams();
  const localActive = useLocale();
  const RowStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  };

  const url = `/city/${selectCity}/catalog/category-slug/${item.slug}`;
  const name = item.name[localActive] ?? item.name.ru;
  const router = useRouter();
  return (
    <>
      <li style={RowStyle}>
        <Link href={url} prefetch={true}>
          <Flex align="normal" gap={5} style={{ height: "24px" }}>
            {item.img[0] ? <Image
              src={item.img[0]}
              alt={name ?? ""}
              width={24}
              height={24}
            />: <div style={{width: 24, height: 24}}></div>}
            <Title level={5}>{name}</Title>
          </Flex>
        </Link>
        {item.children.length > 0 && (
          <Button
            type="text"
            shape="circle"
            onClick={() =>
              router.push(`/city/${selectCity}/catalog/menu/${item.slug}`)
            }
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.263993 0.263605C-0.0874782 0.615078 -0.0874767 1.18493 0.263996 1.5364L4.7276 5.99998L0.263993 10.4636C-0.0874782 10.8151 -0.0874767 11.3849 0.263996 11.7364C0.615469 12.0879 1.18532 12.0879 1.53679 11.7364L6.63679 6.63637C6.98826 6.2849 6.98826 5.71505 6.63679 5.36358L1.53679 0.263602C1.18531 -0.0878686 0.615464 -0.0878673 0.263993 0.263605Z"
                fill="#A6A2A2"
              />
            </svg>
          </Button>
        )}
      </li>
      <Divider />
    </>
  );
};

export default RowCategory;
