
import beautifulCost from "@/shared/tools/beautifulCost";
import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
const { Text } = Typography;

interface ILevel2Props {
  NameProduct: string | undefined | null;
  average_rating: number | undefined | null;
  reviews_count: number | undefined | null;
  price: number | undefined | null;
  discountPrice: number | undefined | null;
}

// Второй уровень карты (описание,рейтинг-кол отзывов,цена)
const Level2: React.FC<ILevel2Props> = (props) => {
  const t = useTranslations("Product");
  const { NameProduct, average_rating, reviews_count, price, discountPrice } = props;

  const ReturnRatingCount: React.FC = () => {
    if (!reviews_count) return null
    if (reviews_count < 0) return null
    return <meta itemProp="ratingCount" content={(reviews_count ?? 0).toString()} />
  }

  const ReturnRatingMeta: React.FC = () => {
    if (!average_rating) return null
    if (average_rating < 0) return null
    return <div itemScope itemProp="aggregateRating" itemType="http://schema.org/AggregateRating">
      <meta itemProp="bestRating" content="5" />
      <meta itemProp="worstRating" content="0" />
      <meta itemProp="ratingValue" content={(average_rating ?? 1).toString()} />
      <ReturnRatingCount />
    </div>
  }

  const ReturnPriceMeta: React.FC = () => {
    return (<>
      <meta itemProp="availability" content="http://schema.org/InStock" />
      <meta itemProp="price" content={(price ?? 0).toString()} />
      <meta itemProp="priceCurrency" content="KZT" />
      <meta itemProp="priceValidUntil" content="2030-12-31" />
    </>)
  }

  const RatingAndReviews: React.FC = () => {
    // if (!average_rating) return null
    // if (average_rating < 0) return null
    return <>
      <Flex align="center" gap={5}>
        <ReturnRatingMeta />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.32745 1.36274C6.60256 0.805304 7.39744 0.805305 7.67255 1.36274L9.17664 4.41035C9.28588 4.63171 9.49706 4.78514 9.74134 4.82063L13.1046 5.30934C13.7197 5.39873 13.9654 6.15471 13.5202 6.58861L11.0866 8.96084C10.9098 9.13315 10.8292 9.3814 10.8709 9.62469L11.4454 12.9743C11.5505 13.587 10.9074 14.0542 10.3572 13.765L7.349 12.1835C7.13051 12.0686 6.86949 12.0686 6.65099 12.1835L3.64282 13.765C3.0926 14.0542 2.44953 13.587 2.55461 12.9743L3.12912 9.62469C3.17085 9.3814 3.09019 9.13315 2.91342 8.96084L0.479759 6.58861C0.0346211 6.15471 0.280255 5.39873 0.89542 5.30934L4.25866 4.82063C4.50294 4.78514 4.71412 4.63171 4.82336 4.41035L6.32745 1.36274Z" fill="#FFA600" />
        </svg>
        <Text
            style={{
              fontFamily: "Inter",
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: "400",
              letterSpacing: "-0.6px",
              color: "#FFA600",
            }}
        >{`${average_rating ?? 0}`}</Text>

      </Flex>

      <Flex gap={5} align="center">
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
          <circle cx="1" cy="1" r="1" fill="#8C8C8C" />
        </svg>
        <Text
          style={{
            fontFamily: "Inter",
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: "400",
            letterSpacing: "-0.6px",
            color: "#8C8C8C",
            textDecoration: ""
          }}
        >{`${reviews_count ?? 0} ${t("otzyvov")} `}</Text>
      </Flex>
    </>
  }


  return (
    <Flex
      vertical={true}
      gap={"0.1em"}
      justify="flex-start"
      style={{
        width: "100%",
        minHeight: "120px",
      }}
    >

      <div
        itemProp="name"
        style={{
          fontFamily: "Inter",
          display: "-webkit-box",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "1em",
          letterSpacing: "0.001em",
          color: "#464646",
          textOverflow: "ellipsis",
          overflow: "hidden",
          WebkitLineClamp: 2, // Ограничивает количество строк до двух
          WebkitBoxOrient: "vertical", // Ориентация контейнера для использования ellipsis на нескольких строках
          wordBreak: "break-word", // Перенос длинных слов на новую строку
          overflowWrap: "break-word", // Дополнительная защита от переполнения
          height: "4em", // Высота для двух строк с учётом lineHeight
          width: "100%",
        }}
      >
        {NameProduct}
      </div>

      <Flex align="center" gap={5} style={{ height: 20 }}>
        <RatingAndReviews />
      </Flex>

      {!discountPrice ? (
        <Flex vertical={true} justify="flex-start" itemScope itemProp="offers" itemType="http://schema.org/Offer">
          <ReturnPriceMeta />
          <Text>{beautifulCost(price ?? 0)}</Text>
        </Flex>
      ) : (
        <Flex vertical={true} justify="flex-start" itemScope itemProp="offers" itemType="http://schema.org/Offer">
          <ReturnPriceMeta />
          <Flex>
            <Text strong style={{ color: "#FF3E4A" }}>{`${beautifulCost(
              price ?? 0
            )}`}</Text>
          </Flex>
          <Text delete disabled style={{ fontSize: "12px" }}>
            {beautifulCost(discountPrice)}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Level2;
