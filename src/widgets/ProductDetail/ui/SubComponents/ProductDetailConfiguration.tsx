import { Flex, Typography } from "antd"
import { useLocale } from "next-intl"
import { useGetCityParams } from "@/shared/hooks/useGetCityParams"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { MappedProductType } from "api-mapping/product/_type"


const {Title} = Typography

interface IProductDetailConfiguration {
    readonly nameProduct: string
    readonly Configurations: MappedProductType[] 
}

const ProductDetailConfiguration: React.FC<IProductDetailConfiguration> = (props) => {
    const { nameProduct,Configurations } = props

    const localeActive = useLocale();
    const currentCity = useGetCityParams();

    return <Flex vertical={true} gap={10} style={{ width: "100%",padding:"10px" }}

    >
        <Title level={5} itemProp="name">{nameProduct}</Title>
          <Flex gap={10}>
            {Configurations.map((item:MappedProductType) => {
              return (
                <Link
                  prefetch={true}
                  key={item.id}
                  href={`/city/${currentCity}/product/${item.slug}`}
                >
                  <Flex
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      border: "1px solid #d7d7d7",
                    }}
                  >
                    <Image
                      src={item.img[0]}
                      alt={item.name[localeActive]??item.slug}
                      width={30}
                      height={30}
                    />
                  </Flex>
                </Link>
              );
            })}
          </Flex>
    </Flex>
}

export default ProductDetailConfiguration