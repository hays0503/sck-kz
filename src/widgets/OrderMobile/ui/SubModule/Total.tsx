import { Flex, Typography } from "antd"
import { useTranslations } from "next-intl";

const { Text, Title } = Typography

const Total: React.FC<{total: number,totalPrice: string|number|undefined}> = ({total,totalPrice}) => {
    const t = useTranslations("Total");
    return <Flex justify="space-between">
        <Flex align="сenter">
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0833 6.06331L9.99997 9.9985M9.99997 9.9985L2.91664 6.06331M9.99997 9.9985L10 17.9152M10.6475 2.02493L16.8142 5.45085C17.0638 5.58952 17.1886 5.65885 17.2795 5.75747C17.3599 5.84471 17.4207 5.94811 17.4579 6.06076C17.5 6.18809 17.5 6.33086 17.5 6.6164V9.99852V13.2891C17.5 13.6349 17.5 13.8078 17.4487 13.9616C17.4034 14.0978 17.3293 14.2226 17.2314 14.3275C17.1208 14.4461 16.969 14.5288 16.6653 14.6942L10.6475 17.9721C10.4112 18.1034 10.293 18.1691 10.1679 18.1948C10.0571 18.2176 9.94288 18.2176 9.83213 18.1948C9.70698 18.1691 9.58881 18.1034 9.35248 17.9721L3.18581 14.5462C2.93621 14.4075 2.8114 14.3382 2.72053 14.2396C2.64013 14.1523 2.57929 14.0489 2.54207 13.9363C2.5 13.809 2.5 13.6662 2.5 13.3807V6.6164C2.5 6.33086 2.5 6.18809 2.54207 6.06076C2.57929 5.94811 2.64013 5.84471 2.72053 5.75747C2.8114 5.65886 2.93621 5.58952 3.18581 5.45085L9.35248 2.02493C9.58881 1.89363 9.70698 1.82798 9.83213 1.80224C9.94288 1.77946 10.0571 1.77946 10.1679 1.80224C10.293 1.82798 10.4112 1.89363 10.6475 2.02493Z" stroke="#715EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            <Title level={5} style={{
                color: "#715EFF",
            }}>{` ${total??0} ${t('tovarov-na-summu')}`}</Title>
        </Flex>
        <Text>{totalPrice}</Text>
    </Flex>
}

export default Total