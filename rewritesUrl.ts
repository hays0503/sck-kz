import { UrlApiV1, UrlApiV2, UrlApiWithDomainV1, UrlApiWithDomainV2 } from "@/shared/constant/url";


export default async function rewritesUrl() {
  // Перечень всех роутов из api первой версии (Django)
  const ShopApiV1Url = [
    // Запрос городов
    {
      source: `${UrlApiV1.getCity}:patch*`,
      destination: `${UrlApiWithDomainV1.getCity}:patch*`,
    },

    // Запрос категории
    {
      source: `${UrlApiV1.getCategory}:patch*`,
      destination: `${UrlApiWithDomainV1.getCategory}:patch*`,
    },

    //Список всех популярных продуктов
    {
      source: `${UrlApiV1.getPopulates}:patch*`,
      destination: `${UrlApiWithDomainV1.getPopulates}:patch*`,
    },

    // Список всех продуктов
    {
      source: `${UrlApiV1.getProducts}:patch*`,
      destination: `${UrlApiWithDomainV1.getProducts}:patch*`,
    },

    // ревью (обзоры)
    {
      source: `${UrlApiV1.getProductReviews}`,
      destination: `${UrlApiWithDomainV1.getProductReviews}`,
    },

    //Спецификации на товар
    {
      source: `${UrlApiV1.getProductSpecifications}:patch*`,
      destination: `${UrlApiWithDomainV1.getProductSpecifications}:patch*`,
    },

    //Описание на товар
    {
      source: `${UrlApiV1.getDescription}:patch*`,
      destination: `${UrlApiWithDomainV1.getProductDescription}:patch*`,
    },
  ];

  const ShopApiV2Url = [
    // Список всех продуктов
    {
      source: `${UrlApiV2.getProducts}:patch*`,
      destination: `${UrlApiWithDomainV2.getProducts}:patch*`,
    },
    {
      source: `/api/v2/search/:search`,
      destination: `${UrlApiWithDomainV2.getProducts}/?search=:search`,
    }
  ]

  // Доступ к картинкам
  const mediaUrl = [
    // Обработка картинок (проксирование)
    {
      source: `/media/product_images/:patch*`,
      destination: `${process.env.API_URL}:${process.env.API_PORT_V1}/media/product_images/:patch*/`,
    },
  ];

  const BasketApiV1Url = [
    // api корзины
    {
      source: `${UrlApiV1.getBasket}:patch*`,
      destination: `${UrlApiWithDomainV1.getBasket}:patch*`,
    },
    // api заказа
    {
      source: `${UrlApiV1.getOrder}:patch*`,
      destination: `${UrlApiWithDomainV1.getOrder}:patch*`,
    },
  ];

  const BasketApiV2Url = [
    // api корзины
    {
      source: `${UrlApiV2.getBasket}:patch*`,
      destination: `${UrlApiWithDomainV2.getBasket}:patch*`,
    },
    // api заказа
    {
      source: `${UrlApiV2.getOrder}:patch*`,
      destination: `${UrlApiWithDomainV2.getOrder}:patch*/`,
    },
  ]

  const AuthApiV1Url = [
    {
      source: `${UrlApiV1.getUser}:patch*`,
      destination: `${UrlApiWithDomainV1.getUser}:patch*`,
    },
  ];

  const AuthApiV2Url = [
    {
      source: `${UrlApiV2.getUser}:patch*`,
      destination: `${UrlApiWithDomainV2.getUser}:patch*`,
    },
  ];

  const allUrl = [
    ...ShopApiV1Url,
    ...ShopApiV2Url,
    ...mediaUrl,
    ...BasketApiV1Url,
    ...BasketApiV2Url,
    ...AuthApiV1Url,
    ...AuthApiV2Url
  ];

  console.log("ShopApiV2Url", ShopApiV2Url);

  return allUrl;
}
