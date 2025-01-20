import { Link } from "@/i18n/routing"
import { useGetCityParams } from "@/shared/hooks/useGetCityParams"
import type { MappedCategoryType } from "api-mapping/category/all/type"
import type { MappedCategoryWithoutChildrenType } from "api-mapping/category/root/type"
import { useLocale } from "next-intl"

interface ICategoryLinkProps {
    readonly Category: MappedCategoryType | MappedCategoryWithoutChildrenType
}

const CategoryLink: React.FC<ICategoryLinkProps> = ({ Category }) => {
    const locale = useLocale();
    const name = Category.name?.[locale];
    const cityEn = useGetCityParams();
    return <Link 
    href={`/city/${cityEn}/catalog/category-slug/${Category.slug}`}
    style={{ 
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        backgroundColor: "#F5F5F5BF",
        padding: "8px 16px",
        borderRadius: "4px"
        }}>
        {name}
    </Link>
}


export default CategoryLink