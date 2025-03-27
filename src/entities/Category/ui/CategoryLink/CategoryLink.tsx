import { Link } from "@/i18n/routing"
import { useGetCityParams } from "@/shared/hooks/useGetCityParams"
import type { MappedCategoryType } from "api-mapping/category/all/type"
import type { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type"
import { useLocale } from "next-intl"
import Image from "next/image"
import { Flex, Typography } from "antd"
import { CSSProperties } from "react"
interface ICategoryLinkProps {
    readonly Category: MappedCategoryType | MappedCategoryWithoutChildrenType
}

const { Text } = Typography

const CategoryLink: React.FC<ICategoryLinkProps> = ({ Category }) => {
    const locale = useLocale();
    const name = Category.name?.[locale];
    const cityEn = useGetCityParams();

    const styleText: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        backgroundColor: "rgba(245, 245, 245, 0.8)",
        padding:"5px",
        borderRadius:"4px",
        width:"100%",
        height:"100%"
    }

    return <Flex justify="center" align="center" style={{ width: "100%",height:"40px" }}>
        <Link
            href={`/city/${cityEn}/catalog/category-slug/${Category.slug}`}
            style={styleText}
        >
            <Image src={Category.img[0]} width={32} height={32} alt={name} />
            <Text>{name}</Text>
        </Link>
    </Flex>
}


export default CategoryLink